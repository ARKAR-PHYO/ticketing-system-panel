import Iconify from '@/components/atoms/icons/iconify'
import { UserTableSearchbarProps } from '@/lib/interfaces/user-management-interface'
import { Box, InputAdornment, TextField } from '@mui/material'
import { useCallback } from 'react'

export default function UserTableSearchbar({
    filters,
    onFilters,
}: UserTableSearchbarProps) {
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
