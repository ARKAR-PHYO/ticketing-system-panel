'use client'

import UserEditView from '@/components/templates/user-management/view/user-edit-view'
import { useParams } from 'next/navigation'

export default function UserEditPage() {
    const { id } = useParams()

    return <UserEditView id={id as string} />
}
