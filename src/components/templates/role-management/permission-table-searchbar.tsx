import Iconify from '@/components/atoms/icons/iconify'
import { PermissionTableSearchbarProps } from '@/lib/interfaces/Role-interface'
import { InputAdornment, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useCallback } from 'react'

const PermissionTableSearchbar = ({
    filters,
    onFilters,
}: PermissionTableSearchbarProps) => {
    const handleFilterName = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onFilters('title', event.target.value)
        },
        [onFilters],
    )

    return (
        <Box className=''>
            <TextField
                fullWidth
                value={filters.title}
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

export default PermissionTableSearchbar
