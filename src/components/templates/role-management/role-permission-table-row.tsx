import Iconx from '@/components/atoms/icons/iconx'
import { RolePermissionTableRowInterface } from '@/lib/interfaces/Role-interface'
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'

export default function RolePermissionTableRow({
    row,
    onEditRow,
    onDeleteRow,
    isDeletableRow,
}: RolePermissionTableRowInterface) {
    const { name, description } = row

    return (
        <>
            <TableRow hover sx={{ cursor: 'pointer' }}>
                <TableCell sx={{ whiteSpace: 'nowrap' }}> {name}</TableCell>
                <TableCell sx={{}}>{description ? description : '-'}</TableCell>
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
