import { memo } from 'react'
// @mui
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
// theme
import { bgBlur } from '@/theme/css'
// components
import { NavSectionHorizontal } from './nav-section'
//
import { HEADER } from './config-layout'
import { useNavData } from './config-navigation'
import HeaderShadow from '@/components/organisms/root/_common/header-shadow'

// ----------------------------------------------------------------------

function NavHorizontal() {
    const theme = useTheme()
    const navData = useNavData()
    const filteredNavData =
        navData &&
        navData.filter(group => {
            if (group.perms['read']) {
                return group
            }
        })

    return (
        <AppBar
            component='nav'
            sx={{
                top: HEADER.H_DESKTOP_OFFSET,
            }}
        >
            <Toolbar
                sx={{
                    ...bgBlur({
                        color: theme.palette.background.default,
                    }),
                }}
            >
                {navData && (
                    <NavSectionHorizontal data={filteredNavData} config={{}} />
                )}
            </Toolbar>

            <HeaderShadow />
        </AppBar>
    )
}

export default memo(NavHorizontal)
