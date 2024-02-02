import Iconx from '@/components/atoms/icons/iconx'
import { ConfirmDialog } from '@/components/molecules/custom-dialog'
import { useBoolean } from '@/hooks/use-boolean'
import { UserTableRowInterface } from '@/lib/interfaces/user-management-interface'

import {
    Box,
    Button,
    IconButton,
    TableCell,
    TableRow,
    Tooltip,
} from '@mui/material'
import { usePathname } from 'next/navigation'

const UserTableRow = ({
    row,
    selected,
    onEditRow,
    onSelectRow,
    onDeleteRow,
    isDeleteable,
}: // isDriver,
UserTableRowInterface) => {
    const { roleName, fullName, userName, email, mobileNumber } = row
    const pathName = usePathname()
    const edit = useBoolean()
    const confirm = useBoolean()

    return (
        <>
            <TableRow
                hover
                selected={selected}
                onClick={() => {
                    onSelectRow()
                }}
                sx={{ cursor: 'pointer' }}
            >
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{roleName}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{fullName}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{userName}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {mobileNumber}
                </TableCell>
                <TableCell sx={{ px: 1, whiteSpace: 'nowrap' }}>
                    <Tooltip title='Edit' placement='top' arrow>
                        <IconButton
                            color={'default'}
                            onClick={() => {
                                onEditRow()
                                edit.onTrue
                            }}
                        >
                            <Iconx
                                icon='PencilSquareIcon'
                                className='w-[20px] h-[20px] '
                            />
                        </IconButton>
                    </Tooltip>

                    {isDeleteable ? (
                        <Tooltip title='Delete' placement='top' arrow>
                            <IconButton
                                color={'default'}
                                onClick={() => {
                                    confirm.onTrue()
                                }}
                            >
                                <Iconx
                                    icon='TrashIcon'
                                    className='w-[20px] h-[20px] '
                                />
                            </IconButton>
                        </Tooltip>
                    ) : null}
                </TableCell>
            </TableRow>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title='Are you sure want to delete?'
                content='This action cannot be undone.'
                action={
                    <Button
                        variant='contained'
                        color='error'
                        onClick={onDeleteRow}
                    >
                        Confirm
                    </Button>
                }
            />
        </>
    )
}

export default UserTableRow
