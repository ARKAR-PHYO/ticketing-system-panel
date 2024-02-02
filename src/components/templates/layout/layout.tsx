// @mui
import Box from '@mui/material/Box'
// hooks
import { useBoolean } from '@/hooks/use-boolean'
import { useResponsive } from '@/hooks/use-responsive'
// components
import { useSettingsContext } from '@/components/organisms/root/settings'
//
import Main from './main'
import Header from './header'
import NavMini from './nav-mini'
import NavVertical from './nav-vertical'
import NavHorizontal from './nav-horizontal'
import AuthGuard from '@/auth/guard/auth-guard'

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
    const settings = useSettingsContext()

    const lgUp = useResponsive('up', 'lg')

    const nav = useBoolean()

    const isHorizontal = settings.themeLayout === 'horizontal'

    const isMini = settings.themeLayout === 'mini'

    const renderNavMini = <NavMini />

    const renderHorizontal = <NavHorizontal />

    const renderNavVertical = (
        <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />
    )

    if (isHorizontal) {
        return (
            <>
                <AuthGuard>
                    <Header onOpenNav={nav.onTrue} />

                    {lgUp ? renderHorizontal : renderNavVertical}

                    <Main>{children}</Main>
                </AuthGuard>
            </>
        )
    }

    if (isMini) {
        return (
            <>
                <AuthGuard>
                    <Header onOpenNav={nav.onTrue} />

                    <Box
                        sx={{
                            minHeight: 1,
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                        }}
                    >
                        {lgUp ? renderNavMini : renderNavVertical}

                        <Main>{children}</Main>
                    </Box>
                </AuthGuard>
            </>
        )
    }

    return (
        <>
            <AuthGuard>
                <Header onOpenNav={nav.onTrue} />

                <Box
                    sx={{
                        minHeight: 1,
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                    }}
                >
                    {renderNavVertical}

                    <Main>{children}</Main>
                </Box>
            </AuthGuard>
        </>
    )
}
