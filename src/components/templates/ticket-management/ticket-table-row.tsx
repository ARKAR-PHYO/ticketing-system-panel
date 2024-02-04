import Iconx from '@/components/atoms/icons/iconx'
import { TicketTableRowInterface } from '@/lib/interfaces/ticket-interface'
import { formatDateTime } from '@/utils/functions/format-time'
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'

export default function TicketTableRow({
    row,
    onEditRow,
    onDeleteRow,
    isDeletableRow,
}: TicketTableRowInterface) {
    const {
        title,
        createdAt,
        responsiblePerson,
        deadline,
        createdBy,
        status,
        project,
    } = row

    return (
        <>
            <TableRow hover sx={{ cursor: 'pointer' }}>
                <TableCell sx={{ whiteSpace: 'nowrap' }}> {title}</TableCell>
                <TableCell sx={{}}>
                    {createdAt ? formatDateTime(createdAt) : '-'}
                </TableCell>
                <TableCell sx={{}}>{responsiblePerson?.fullName}</TableCell>
                <TableCell sx={{}}>{deadline ? deadline : '-'}</TableCell>
                <TableCell sx={{}}>{createdBy?.fullName}</TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>
                    {status ? status : '-'}
                </TableCell>
                <TableCell sx={{}}>{project ? project?.name : '-'}</TableCell>
                <TableCell sx={{ px: 1 }}>
                    <Tooltip title='Edit' placement='top' arrow>
                        <IconButton
                            color={'default'}
                            onClick={() => {
                                onEditRow()
                            }}
                        >
                            <Iconx
                                icon='PencilSquareIcon'
                                className='w-[20px] h-[20px] '
                            />
                        </IconButton>
                    </Tooltip>
                    {isDeletableRow ? (
                        <Tooltip title='Delete' placement='top' arrow>
                            <IconButton color={'default'} onClick={onDeleteRow}>
                                <Iconx
                                    icon='TrashIcon'
                                    className='w-[20px] h-[20px] '
                                />
                            </IconButton>
                        </Tooltip>
                    ) : null}
                </TableCell>
            </TableRow>
        </>
    )
}
