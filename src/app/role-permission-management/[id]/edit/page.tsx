'use client'

import RolePermissionEditView from '@/components/templates/role-management/view/role-permission-edit-view'
import { useParams } from 'next/navigation'

export default function RolePermissionEditPage() {
    const { id } = useParams()

    return <RolePermissionEditView id={id as string} />
}
