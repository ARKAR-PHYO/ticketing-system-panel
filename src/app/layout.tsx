import ThemeProvider from '@/theme'
import './globals.scss'
import type { Metadata } from 'next'
import { SnackbarProvider } from '@/components/organisms/root/snackbar'
import ProgressBar from '@/components/organisms/root/progress-bar/progress-bar'
import { NextAuthProvider } from '@/components/organisms/next-auth-provider'
import { AuthProvider } from '@/auth/context/auth-provider'
import { SettingsProvider } from '@/components/organisms/root/settings'
import Providers from '@/utils/provider'
import { LocalizationProvider } from '@/locales'
import 'react-quill/dist/quill.snow.css'

export const metadata: Metadata = {
    title: 'Ticket Management',
    description: 'Generated For Ticket Management Portal App',
}

type Props = {
    children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang='en'>
            <body>
                <NextAuthProvider>
                    <LocalizationProvider>
                        <Providers>
                            <SettingsProvider
                                defaultSettings={{
                                    themeMode: 'light', // 'light' | 'dark'
                                    themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                                    themeStretch: false,
                                }}
                            >
                                <ThemeProvider>
                                    <SnackbarProvider>
                                        <ProgressBar />
                                        <AuthProvider>{children}</AuthProvider>
                                    </SnackbarProvider>
                                </ThemeProvider>
                            </SettingsProvider>
                        </Providers>
                    </LocalizationProvider>
                </NextAuthProvider>
            </body>
        </html>
    )
}
