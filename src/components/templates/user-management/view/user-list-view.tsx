'use client'

import { useAuthContext } from '@/auth/hooks/use-auth-context'
import Iconify from '@/components/atoms/icons/iconify'
import {
    TableEmptyRows,
    TableHeadCustom,
    TableNoData,
    TablePaginationCustom,
    emptyRows,
    getComparator,
    useTable,
} from '@/components/molecules/table'
import { useSnackbar } from '@/components/organisms/root/snackbar'
import {
    ApplyFilterInterface,
    UserInterface,
    UserTableFiltersInterface,
    UserTableFiltersValue,
} from '@/lib/interfaces/user-management-interface'
import { paths } from '@/routes/paths'
import { DeleteUserApi, GetAllUsersApi } from '@/utils/apis/user-api'
import {
    Box,
    Card,
    Table,
    TableBody,
    TableContainer,
    Typography,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import UserTableRow from '../user-table-row'
import UserTableSearchbar from '../user-table-searchbar'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'roleName', label: 'Account Type' },
    { id: 'fullName', label: 'Full Name' },
    { id: 'userName', label: 'User Name' },
    { id: 'email', label: 'Email' },
    { id: 'mobileNumber', label: 'Mobile' },
    { id: 'action', label: 'Action', width: 88 },
]

const defaultFilters: UserTableFiltersInterface = {
    searchValue: '',
}

// ----------------------------------------------------------------------

export default function UserListView() {
    const { data: session } = useSession()
    const { permissions } = useAuthContext()
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const table = useTable()
    const rowsPerPage = 10

    // STATES
    const [filters, setFilters] = useState(defaultFilters)
    const [users, setUsers] = useState<UserInterface[]>([])

    // USE QUERY
    const { refetch: refetchUsersData } = useQuery({
        queryKey: 'get-users',
        queryFn: async () => await GetAllUsersApi(session?.token),
        onSuccess: response => {
            setUsers(response.data)
        },
    })

    // FUNCTIONS
    const pagePermissions =
        permissions &&
        permissions.find(
            (perm: { [key: string]: any }) => perm.title === 'user management',
        )
    const dataFiltered = applyFilter({
        inputData: users,
        comparator: getComparator(table.order, table.orderBy, table.child),
        filters,
    })
    const handleFilters = useCallback(
        (name: string, value: UserTableFiltersValue) => {
            table.onResetPage()
            setFilters(prevState => ({
                ...prevState,
                [name]: value,
            }))
        },
        [table],
    )
    const notFound = !dataFiltered.length || !dataFiltered.length
    const handleEditRow = useCallback(
        (id: string) => {
            router.push(paths.dashboard.userManagement.edit(id))
        },
        [router],
    )
    const handleDeleteRow = useCallback(
        async (id: string) => {
            if (pagePermissions && !pagePermissions['delete']) {
                enqueueSnackbar('You are not authorized for this action', {
                    variant: 'error',
                })
            } else {
                const deleteData = await DeleteUserApi(session?.token, id)
                if (deleteData.statusCode === 200) {
                    enqueueSnackbar(deleteData.message, {
                        variant: 'success',
                    })
                    refetchUsersData()
                    router.push(paths.dashboard.userManagement.root)
                }
            }
        },
        [enqueueSnackbar, pagePermissions, router, session?.token],
    )

    return (
        <>
            <Card className=''>
                <Box className='flex items-center justify-between p-7'>
                    <Typography variant='h4'>User</Typography>

                    <Box className='flex items-center flex-none space-x-4'>
                        <UserTableSearchbar
                            filters={filters}
                            onFilters={handleFilters}
                        />
                        {pagePermissions && pagePermissions['create'] && (
                            <Link href={paths.dashboard.userManagement.new}>
                                <Box className='flex items-center flex-auto px-6 py-2 space-x-2 rounded-md bg-PRIMARY-600'>
                                    <Iconify icon={'akar-icons:circle-plus'} />
                                    <Typography
                                        variant='body1'
                                        className='capitalize '
                                    >
                                        create User
                                    </Typography>
                                </Box>
                            </Link>
                        )}
                    </Box>
                </Box>
                <Box>
                    <TableContainer
                        sx={{ position: 'relative', overflow: 'unset' }}
                    >
                        <Table size='medium' sx={{ minWidth: 960 }}>
                            <TableHeadCustom
                                order={table.order}
                                orderBy={table.orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={users.length}
                                numSelected={table.selected.length}
                                onSort={table.onSort}
                                onSelectAllRows={checked =>
                                    table.onSelectAllRows(
                                        checked,
                                        users.map(row => row.id),
                                    )
                                }
                            />

                            <TableBody>
                                {dataFiltered
                                    .slice(
                                        table.page * rowsPerPage,
                                        table.page * rowsPerPage + rowsPerPage,
                                    )
                                    .map(row => (
                                        <UserTableRow
                                            key={row.id}
                                            row={row}
                                            selected={table.selected.includes(
                                                row.id,
                                            )}
                                            onSelectRow={() =>
                                                table.onSelectRow(row.id)
                                            }
                                            onDeleteRow={() =>
                                                handleDeleteRow(row.id)
                                            }
                                            isDeleteable={
                                                pagePermissions &&
                                                pagePermissions['delete']
                                            }
                                            onEditRow={() =>
                                                handleEditRow(row.id)
                                            }
                                        />
                                    ))}

                                <TableEmptyRows
                                    emptyRows={emptyRows(
                                        table.page,
                                        rowsPerPage,
                                        users.length,
                                    )}
                                />
                                <TableNoData notFound={notFound} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Card>
            <TablePaginationCustom
                count={dataFiltered.length}
                page={table.page}
                rowsPerPage={rowsPerPage}
                onPageChange={table.onChangePage}
                onRowsPerPageChange={table.onChangeRowsPerPage}
            />
        </>
    )
}

// ----------------------------------------------------------------------

export function applyFilter(value: ApplyFilterInterface) {
    let inputData = value.inputData
    const { searchValue } = value.filters
    const stabilizedThis = inputData.map((el, index) => [el, index] as const)

    stabilizedThis.sort((a, b) => {
        const order = value.comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })

    inputData = stabilizedThis.map(el => el[0])

    if (searchValue) {
        inputData = inputData.filter(
            user =>
                (user.roleName &&
                    user.roleName
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())) ||
                (user.fullName &&
                    user.fullName
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1) ||
                (user.email &&
                    user.email
                        .toLocaleLowerCase()
                        .indexOf(searchValue.toLocaleLowerCase()) !== -1) ||
                (user.userName &&
                    user.userName
                        .toLocaleLowerCase()
                        .indexOf(searchValue.toLocaleLowerCase()) !== -1) ||
                (user.mobileNumber &&
                    user.mobileNumber
                        .toLocaleLowerCase()
                        .indexOf(searchValue.toLocaleLowerCase()) !== -1),
        )
    }
    return inputData
}
