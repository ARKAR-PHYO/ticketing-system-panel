'use client'

import { UserSearchApi } from '@/utils/apis/user-api'
import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query'
import UserCreateEditView from './user-create-edit-view'

interface Props {
    id: string
}

export default function UserEditView({ id }: Props) {
    const { data: session } = useSession()

    const { data: userData } = useQuery({
        queryKey: 'get-user-by-id',
        queryFn: async () => {
            const data = await UserSearchApi(session?.token, {
                filters: {
                    where: {
                        id,
                    },
                },
            })
            return await data.data
        },
    })

    if (!!userData) return <UserCreateEditView currentData={userData} />
}
