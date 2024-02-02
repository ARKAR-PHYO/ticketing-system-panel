// @mui
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
// theme
import { hideScroll } from '@/theme/css'
// components
import Logo from '@/components/atoms/logo'
import { NavSectionMini } from './nav-section'
//
import { NAV } from './config-layout'
import { useNavData } from './config-navigation'
import NavToggleButton from '@/components/organisms/root/_common/nav-toggle-button'

// ----------------------------------------------------------------------

export default function NavMini() {
    const navData = useNavData()
    const filteredNavData =
        navData &&
        navData.filter(group => {
            if (group.perms['read']) {
                return group
            }
        })

    return (
        <Box
            component='nav'
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.W_MINI },
            }}
        >
            <NavToggleButton
                sx={{
                    top: 22,
                    left: NAV.W_MINI - 12,
                }}
            />

            <Stack
                sx={{
                    pb: 2,
                    height: 1,
                    position: 'fixed',
                    width: NAV.W_MINI,
                    borderRight: theme => `dashed 1px ${theme.palette.divider}`,
                    ...hideScroll.x,
                }}
            >
                <Logo sx={{ mx: 'auto', my: 2 }} />

                {navData && (
                    <NavSectionMini data={filteredNavData} config={{}} />
                )}
            </Stack>
        </Box>
    )
}
