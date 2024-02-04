import Iconify from '@/components/atoms/icons/iconify'
import { Box, InputAdornment, TextField } from '@mui/material'
import { useCallback } from 'react'
import { TicketTableSearchbarInterface } from '@/lib/interfaces/ticket-interface'

export default function TicketSearcbar({
    filters,
    onFilters,
}: TicketTableSearchbarInterface) {
    const handleFilterName = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onFilters('searchValue', event.target.value)
        },
        [onFilters],
    )
    return (
        <Box className=''>
            <TextField
                fullWidth
                value={filters.searchValue}
                onChange={handleFilterName}
                placeholder='Search...'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <Iconify
                                icon='eva:search-fill'
                                sx={{ color: 'text.disabled' }}
                            />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    )
}
