'use client'

import { signOut, useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from './auth-context'
import { defaultPermission } from '@/components/templates/role-management/_common/default-permission'
import { useQuery } from 'react-query'
import { GetRoleApi } from '@/utils/apis/role-api'
import { useSnackbar } from '@/components/organisms/root/snackbar'
import { useRouter } from 'next/navigation'

type Props = {
    children: React.ReactNode
}

export function AuthProvider({ children }: Props) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    // STATES
    const [user, setUser] = useState<any | null>(null)
    const [permissions, setPermissions] = useState(defaultPermission)

    useEffect(() => {
        setUser(session?.user || null)
    }, [session])

    // ----------------------------------------------------------------------
    const isAuthenticated = !!user

    const { data } = useQuery({
        queryKey: 'get-role-perms',
        queryFn: () => GetRoleApi(session?.token, session?.user?.roleName!),
        onSuccess: response => {
            if (response.response && response.response?.code !== 200) {
                enqueueSnackbar(
                    'Your session has expired! Please login again!',
                    {
                        variant: 'error',
                    },
                )
                signOut({
                    redirect: true,
                    callbackUrl: '/auth/sign-in',
                })
                return
            }
            setPermissions(response.role.permission)
            const cleanedPathname = window.location.pathname
                .replace(/[-]/g, ' ')
                .replace('/', '')
            const pagePermission: any = Object.values(
                response.role.permission,
            ).find((p: any) => p?.title === cleanedPathname)
            if (pagePermission && !pagePermission.read) {
                router.replace('/error/403')
            }
            if (window.location.pathname.includes('new')) {
                const newCleanedPathname = cleanedPathname.replace('/new', '')
                const newPagePermission: any = Object.values(
                    response.role.permission,
                ).find((p: any) => p?.title === newCleanedPathname)
                if (newPagePermission && !newPagePermission.create) {
                    router.replace('/error/403')
                }
            }
        },
        enabled: !!session?.user,
    })

    const memoizedValue = useMemo(
        () => ({
            user: { ...user },
            loading: status === 'loading',
            authenticated: status === 'authenticated',
            unauthenticated: status === 'unauthenticated',
            // permissions: data?.permissions,
        }),
        [user, status],
    )
    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                permissions,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
