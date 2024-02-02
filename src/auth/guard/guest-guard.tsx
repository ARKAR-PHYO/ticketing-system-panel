import { useCallback, useEffect } from 'react'
// routes
import { paths } from '@/routes/paths'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode
}

export default function GuestGuard({ children }: Props) {
    const router = useRouter()
    const { status } = useSession()

    const searchParams = useSearchParams()

    const returnTo = searchParams.get('returnTo') || paths.dashboard.root

    const check = useCallback(() => {
        if (status === 'authenticated') {
            router.replace(returnTo)
        }
    }, [status, returnTo, router])

    useEffect(() => {
        check()
    }, [check])

    return <>{children}</>
}
