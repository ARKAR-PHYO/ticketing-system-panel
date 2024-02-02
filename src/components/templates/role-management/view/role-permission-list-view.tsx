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
import { useBoolean } from '@/hooks/use-boolean'
import {
    ApplyFilterInterface,
    RoleInterface,
    RolePermissionTableFiltersInterface,
    RolePermissionTableFiltersValue,
} from '@/lib/interfaces/Role-interface'
import { paths } from '@/routes/paths'
import { DeleteRoleApi, GetAllRolesApi } from '@/utils/apis/role-api'
import {
    Box,
    Button,
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
import RolePermissionTableRow from '../role-permission-table-row'
import { ConfirmDialog } from '@/components/molecules/custom-dialog'
import RolePermissioinSearcbar from '../role-permission-searchbar'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Name' },
    { id: 'description', label: 'Description' },
    { id: 'action', label: 'Action', width: 88 },
]

const defaultFilters: RolePermissionTableFiltersInterface = {
    searchValue: '',
}

// ----------------------------------------------------------------------

export default function RolePermissionListView() {
    const { data: session } = useSession()
    const { permissions } = useAuthContext()
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const table = useTable()
    const rowsPerPage = 10

    // STATES
    const [filters, setFilters] = useState(defaultFilters)
    const [roles, setRoles] = useState<RoleInterface[]>([])
    const confirm = useBoolean()
    const [onDeleteId, setOnDeleteId] = useState<string>('')

    // USE QUERY
    const { refetch: refetchData } = useQuery({
        queryKey: 'get-all-roles',
        queryFn: async () => await GetAllRolesApi(session?.token),
        onSuccess: response => {
            setRoles(response.data)
        },
    })

    // FUNCTIONS
    const pagePermissions =
        permissions &&
        permissions.find(
            (perm: { [key: string]: any }) =>
                perm.title === 'role permission management',
        )

    const dataFiltered = applyFilter({
        inputData: roles,
        comparator: getComparator(table.order, table.orderBy),
        filters,
    })

    const handleFilters = useCallback(
        (name: string, value: RolePermissionTableFiltersValue) => {
            table.onResetPage()
            setFilters(prevState => ({
                ...prevState,
                [name]: value,
            }))
        },
        [table],
    )
    const notFound = !dataFiltered.length || !dataFiltered.length

    const handleEditRow = (id: string) => {
        router.push(paths.dashboard.rolePermissionMamagement.edit(id))
    }

    const handleDeleteRow = async () => {
        const deleteData = await DeleteRoleApi(session?.token, onDeleteId)
        if (!deleteData.success) {
            enqueueSnackbar(deleteData.message, {
                variant: 'error',
            })
        }
        enqueueSnackbar(deleteData.message, {
            variant: 'success',
        })
        confirm.onFalse()
        setOnDeleteId('')
        await refetchData()
    }

    return (
        <>
            <Card className=''>
                <Box className='flex items-center justify-between p-7'>
                    <Typography variant='h4'>Roles & Permissions</Typography>

                    <Box className='flex items-center flex-none space-x-4'>
                        <RolePermissioinSearcbar
                            filters={filters}
                            onFilters={handleFilters}
                        />
                        {pagePermissions && pagePermissions['create'] && (
                            <Link
                                href={
                                    paths.dashboard.rolePermissionMamagement.new
                                }
                            >
                                <Box className='flex items-center flex-auto px-6 py-2 space-x-2 rounded-md bg-PRIMARY-600'>
                                    <Iconify icon={'akar-icons:circle-plus'} />
                                    <Typography
                                        variant='body1'
                                        className='capitalize '
                                    >
                                        Add Role & Permissions
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
                        <Table size='medium' sx={{}}>
                            <TableHeadCustom
                                order={table.order}
                                orderBy={table.orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={roles.length}
                                numSelected={table.selected.length}
                                onSort={table.onSort}
                                onSelectAllRows={checked =>
                                    table.onSelectAllRows(
                                        checked,
                                        roles.map(row => row.id),
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
                                        <RolePermissionTableRow
                                            key={row.id}
                                            row={row}
                                            onEditRow={() =>
                                                handleEditRow(row.id)
                                            }
                                            isDeletableRow={
                                                pagePermissions &&
                                                pagePermissions['delete']
                                            }
                                            onDeleteRow={() => {
                                                confirm.onTrue()
                                                setOnDeleteId(row.id)
                                            }}
                                        />
                                    ))}
                                <TableEmptyRows
                                    emptyRows={emptyRows(
                                        table.page,
                                        rowsPerPage,
                                        roles.length,
                                    )}
                                />
                                <TableNoData notFound={notFound} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Card>
            <TablePaginationCustom
                count={dataFiltered?.length || 0}
                page={table.page}
                rowsPerPage={rowsPerPage}
                onPageChange={table.onChangePage}
                onRowsPerPageChange={table.onChangeRowsPerPage}
            />

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title='Are you sure want to delete?'
                content='This action cannot be undone.'
                action={
                    <Button
                        variant='contained'
                        color='error'
                        onClick={handleDeleteRow}
                    >
                        Confirm
                    </Button>
                }
            />
        </>
    )
}

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
            accountType =>
                accountType.name
                    .toLowerCase()
                    .indexOf(searchValue.toLowerCase()) !== -1,
        )
    }
    return inputData
}
