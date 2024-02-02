import { paths } from '@/routes/paths'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/use-auth-context'

// ----------------------------------------------------------------------
type Props = {
    children: React.ReactNode
}

export default function AuthGuard({ children }: Props) {
    const router = useRouter()
    const { isAuthenticated } = useAuthContext()
    const [checked, setChecked] = useState<boolean>(false)
    const check = useCallback(() => {
        if (!isAuthenticated) {
            const searchParams = new URLSearchParams({
                returnTo: window.location.pathname,
            }).toString()

            const signInPath = paths.auth.login
            const href = `${signInPath}?${searchParams}`
            router.replace(href)
        } else {
            setChecked(true)
        }
    }, [isAuthenticated, router])

    useEffect(() => {
        check()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!checked) {
        return null
    }

    return <>{children}</>
}
