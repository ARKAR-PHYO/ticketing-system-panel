// @mui
import { styled, SxProps, Theme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableSortLabel, {
    TableSortLabelProps,
} from '@mui/material/TableSortLabel'
import { useTheme } from '@mui/system'
import { SortDescIcon } from '@/components/atoms/icons/sort-desc-icon'
import { SortAscIcon } from '@/components/atoms/icons/sort-asc-icon'
import { Checkbox } from '@mui/material'

// ----------------------------------------------------------------------

const visuallyHidden = {
    border: 0,
    margin: -1,
    padding: 0,
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    clip: 'rect(0 0 0 0)',
} as const

const StyledTableSortLabel = styled(TableSortLabel)<TableSortLabelProps>(
    ({ theme }) => ({
        '& .MuiTableSortLabel-icon': {
            display: 'none',
        },
    }),
)

// ----------------------------------------------------------------------

type Props = {
    checkbox?: boolean
    order?: 'asc' | 'desc'
    orderBy?: string
    headLabel: any[]
    rowCount?: number
    numSelected?: number
    onSort?: (id: string, child?: string) => void
    onSelectAllRows?: (checked: boolean) => void
    sx?: SxProps<Theme>
}

export default function TableHeadCustom({
    checkbox = false,
    order,
    orderBy,
    rowCount = 0,
    headLabel,
    numSelected = 0,
    onSort,
    onSelectAllRows,
    sx,
}: Props) {
    const theme = useTheme()

    return (
        <TableHead sx={sx}>
            <TableRow>
                {checkbox && onSelectAllRows && (
                    <TableCell
                        padding='checkbox'
                        sx={{
                            background: theme.palette.primary.lighter,
                            textTransform: 'capitalize',
                        }}
                    >
                        <Checkbox
                            indeterminate={
                                !!numSelected && numSelected < rowCount
                            }
                            checked={!!rowCount && numSelected === rowCount}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>,
                            ) => onSelectAllRows(event.target.checked)}
                        />
                    </TableCell>
                )}
                {headLabel.map(
                    headCell =>
                        headCell.include !== false && (
                            <TableCell
                                key={headCell.id}
                                align={headCell.align || 'left'}
                                sortDirection={
                                    orderBy === headCell.id ? order : false
                                }
                                sx={{
                                    width: headCell.width,
                                    minWidth: headCell.minWidth,
                                    background: theme.palette.primary.lighter,
                                    textTransform: 'capitalize',
                                }}
                            >
                                {onSort ? (
                                    <StyledTableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={
                                            orderBy === headCell.id
                                                ? order
                                                : 'asc'
                                        }
                                        onClick={() =>
                                            headCell.id !== 'action' &&
                                            headCell.id !== 'working_hours' &&
                                            onSort(headCell.id, headCell.child)
                                        }
                                    >
                                        {headCell.label}
                                        {headCell.id !== 'action' &&
                                        headCell.id !== 'working_hours' ? (
                                            orderBy === headCell.id ? (
                                                <>
                                                    {order === 'desc' ? (
                                                        <SortDescIcon className='w-[24px] h-[24px] ml-1 ' />
                                                    ) : (
                                                        <SortAscIcon className='w-[24px] h-[24px] ml-1 ' />
                                                    )}
                                                    <Box
                                                        sx={{
                                                            ...visuallyHidden,
                                                        }}
                                                    >
                                                        {order === 'desc'
                                                            ? 'sorted descending'
                                                            : 'sorted ascending'}
                                                    </Box>
                                                </>
                                            ) : (
                                                <SortAscIcon className='w-[24px] h-[24px] ml-1 ' />
                                            )
                                        ) : null}
                                    </StyledTableSortLabel>
                                ) : (
                                    headCell.label
                                )}
                            </TableCell>
                        ),
                )}
            </TableRow>
        </TableHead>
    )
}
