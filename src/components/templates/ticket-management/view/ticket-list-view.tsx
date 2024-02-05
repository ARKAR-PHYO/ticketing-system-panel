'use client'

import { useAuthContext } from '@/auth/hooks/use-auth-context'
import Iconify from '@/components/atoms/icons/iconify'
import { ConfirmDialog } from '@/components/molecules/custom-dialog'
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
    TicketFiltersInterface,
    TicketInterface,
    TicketTableFiltersValue,
} from '@/lib/interfaces/ticket-interface'
import { paths } from '@/routes/paths'
import { GetAllTicketsApi } from '@/utils/apis/ticket-api'
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
import { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import TicketTableRow from '../ticket-table-row'
import TicketSearcbar from '../ticket-searchbar'
import useFcmToken from '@/hooks/use-fcm-token'
import { getMessaging, onMessage } from 'firebase/messaging'
import firebaseApp from '@/utils/firebase'
import TicketAssignPopup from '@/components/organisms/ticketAssignPopup'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Name' },
    { id: 'createdAt', label: 'Active' },
    { id: 'responsiblePerson', label: 'Responsible Person', child: 'fullName' },
    { id: 'deadline', label: 'Deadline' },
    { id: 'createdBy', label: 'Created By', child: 'fullName' },
    { id: 'status', label: 'Status' },
    { id: 'project', label: 'Project', child: 'name' },
    { id: 'action', label: 'Action', width: 88 },
]

const defaultFilters: TicketFiltersInterface = {
    searchValue: '',
}

// ----------------------------------------------------------------------
export default function TicketListView() {
    const { data: session } = useSession()
    const { permissions } = useAuthContext()
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const table = useTable()
    const rowsPerPage = 10
    const assignPopup = useBoolean()
    const { notificationPermissionStatus } = useFcmToken()

    // STATES
    const [filters, setFilters] = useState(defaultFilters)
    const [tickets, setTickets] = useState<TicketInterface[]>([])
    const confirm = useBoolean()
    const [onDeleteId, setOnDeleteId] = useState<string>('')

    // USE QUERY
    const { refetch: refetchData } = useQuery({
        queryKey: 'get-all-Tickets',
        queryFn: async () => await GetAllTicketsApi(session?.token),
        onSuccess: response => {
            setTickets(response.data)
        },
    })

    // FUNCTIONS
    const pagePermissions =
        permissions &&
        permissions.find(
            (perm: { [key: string]: any }) =>
                perm.title === 'ticket management',
        )

    const dataFiltered = applyFilter({
        inputData: tickets,
        comparator: getComparator(table.order, table.orderBy),
        filters,
    })

    const handleFilters = useCallback(
        (name: string, value: TicketTableFiltersValue) => {
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
        router.push(paths.dashboard.ticketManagement.edit(id))
    }

    const handleDeleteRow = async () => {
        // const deleteData = await DeleteProjectApi(session?.token, onDeleteId)
        // if (!deleteData.success) {
        //     enqueueSnackbar(deleteData.message, {
        //         variant: 'error',
        //     })
        // }
        // enqueueSnackbar(deleteData.message, {
        //     variant: 'success',
        // })
        // confirm.onFalse()
        // setOnDeleteId('')
        // await refetchData()
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            const messaging = getMessaging(firebaseApp)
            const unsub = onMessage(messaging, payload => {
                assignPopup.onTrue()
                console.log('payload', payload)
                enqueueSnackbar(payload?.notification?.body, {
                    variant: 'info',
                })
            })
            return () => {
                unsub()
            }
        } else {
            console.log('noti ma yout')
        }
    }, [notificationPermissionStatus])

    return (
        <>
            <Card className=''>
                <Box className='flex items-center justify-between p-7'>
                    <Typography variant='h4'>Tickets</Typography>

                    <Box className='flex items-center flex-none space-x-4'>
                        <TicketSearcbar
                            filters={filters}
                            onFilters={handleFilters}
                        />
                        {pagePermissions && pagePermissions['create'] && (
                            <Link href={paths.dashboard.ticketManagement.new}>
                                <Box className='flex items-center flex-auto px-6 py-2 space-x-2 rounded-md bg-PRIMARY-600'>
                                    <Iconify icon={'akar-icons:circle-plus'} />
                                    <Typography
                                        variant='body1'
                                        className='capitalize '
                                    >
                                        Add Ticket
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
                                rowCount={tickets.length}
                                numSelected={table.selected.length}
                                onSort={table.onSort}
                                onSelectAllRows={checked =>
                                    table.onSelectAllRows(
                                        checked,
                                        tickets.map(row => row.id),
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
                                        <TicketTableRow
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
                                        tickets.length,
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

            <TicketAssignPopup
                open={assignPopup.value}
                onClose={assignPopup.onFalse}
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
            ticket =>
                (ticket.title &&
                    ticket.title
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())) ||
                (ticket.ticketNumber &&
                    ticket.ticketNumber
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())) ||
                (ticket.status &&
                    ticket.status
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())) ||
                (ticket.deadline &&
                    ticket.deadline
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())) ||
                (ticket.responsiblePerson &&
                    ticket.responsiblePerson.fullName
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())) ||
                (ticket.createdBy &&
                    ticket.createdBy.fullName
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())) ||
                (ticket.participants &&
                    ticket.participants.map((participant: any) =>
                        participant.id
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()),
                    )) ||
                (ticket.createdAt &&
                    ticket.createdAt
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())),

            // ticket.title
            //     .toLowerCase()
            //     .indexOf(searchValue.toLowerCase()) !== -1,
        )
    }
    return inputData
}
