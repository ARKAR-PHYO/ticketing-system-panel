'use client'

import TicketEditView from '@/components/templates/ticket-management/view/ticket-edit-view'
import { useParams } from 'next/navigation'

export default function TickettEditPage() {
    const { id } = useParams()

    return <TicketEditView id={id as string} />
}
