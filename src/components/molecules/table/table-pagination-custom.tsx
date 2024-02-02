// @mui
import { Theme, SxProps } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TablePagination, {
    TablePaginationProps,
} from '@mui/material/TablePagination'
import { Button, Typography } from '@mui/material'
import Iconx from '@/components/atoms/icons/iconx'

// ----------------------------------------------------------------------

type Props = {
    sx?: SxProps<Theme>
    count: number
    page: number
    rowsPerPage: number
}

export default function TablePaginationCustom({
    sx,
    count,
    page,
    rowsPerPage,
    ...other
}: Props & TablePaginationProps) {
    return (
        <Box className='flex items-center justify-between mt-4'>
            <Box>
                <Typography variant='body2'>
                    {/* {`${Math.min((page + 1) * rowsPerPage, count)} of ${page + 1}`} */}
                    {/* {`Page ${Math.min((page + 1) * rowsPerPage, count)} of ${count}`} */}
                </Typography>
            </Box>
            <Box>
                <TablePagination
                    component='div'
                    count={count}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    rowsPerPageOptions={[rowsPerPage]}
                    labelRowsPerPage={''}
                    labelDisplayedRows={() => null}
                    {...other}
                    sx={{
                        borderTopColor: 'transparent',
                    }}
                />
            </Box>
        </Box>
    )
}

// ----------------------------------------------------------------------
type TablePaginationActionsProps = {
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => void
    page: number
    rowsPerPage: number
    count: number
}

const TablePaginationActions: React.FC<TablePaginationActionsProps> = ({
    onPageChange,
    page,
    rowsPerPage,
    count,
}) => {
    return (
        <Box className='flex items-center space-x-3'>
            <Button
                sx={{ paddingX: 3 }}
                variant='outlined'
                onClick={() => onPageChange(null, page - 1)}
                disabled={page === 0}
            >
                <Iconx icon='ArrowLongLeftIcon' className='w-5 h-5 mr-2' />
                <span className='text-sm'>Prev</span>
            </Button>
            <Button
                sx={{ paddingX: 3 }}
                variant='outlined'
                onClick={() => onPageChange(null, page + 1)}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
                <span className='text-sm'>Next</span>
                <Iconx icon='ArrowLongRightIcon' className='w-5 h-5 ml-2' />
            </Button>
        </Box>
    )
}
