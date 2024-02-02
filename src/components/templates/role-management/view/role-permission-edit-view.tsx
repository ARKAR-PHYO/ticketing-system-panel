'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { RoleInterface } from '@/lib/interfaces/Role-interface'
import { RoleSearchApi } from '@/utils/apis/role-api'
import RolePermissionCreateEditView from './role-permission-create-edit-view'

interface Props {
    id: string
}

export default function RolePermissionEditView({ id }: Props) {
    const { data: session } = useSession()

    // STATES
    const [role, setRole] = useState<RoleInterface>()

    useQuery({
        queryKey: 'role-id-search',
        queryFn: async () =>
            await RoleSearchApi(session?.token, {
                filters: {
                    where: { id },
                },
            }),
        onSuccess: response => {
            setRole(response.data)
        },
        enabled: !!id,
    })

    if (!!role) return <RolePermissionCreateEditView currentData={role} />
}
