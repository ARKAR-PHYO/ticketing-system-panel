'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import TicketCreateEditView from './ticket-create-edit-view'
import { TicketInterface } from '@/lib/interfaces/ticket-interface'
import { TicketSearchApi } from '@/utils/apis/ticket-api'

interface Props {
    id: string
}

export default function TicketEditView({ id }: Props) {
    const { data: session } = useSession()

    // STATES
    const [tickets, setTickets] = useState<TicketInterface>()

    useQuery({
        queryKey: 'ticket-id-search',
        queryFn: async () =>
            await TicketSearchApi(session?.token, {
                filters: { where: { id } },
            }),
        onSuccess: response => {
            setTickets(response.data)
        },
        enabled: !!id,
    })

    if (!!tickets) return <TicketCreateEditView currentData={tickets} />
}
