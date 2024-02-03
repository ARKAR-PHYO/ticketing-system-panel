'use client'

import { ProjectInterface } from '@/lib/interfaces/Project-interface'
import { ProjectSearchApi } from '@/utils/apis/project-api'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import ProjectCreateEditView from './project-create-edit-view'

interface Props {
    id: string
}

export default function ProjectEditView({ id }: Props) {
    const { data: session } = useSession()

    // STATES
    const [projects, setProjects] = useState<ProjectInterface>()

    useQuery({
        queryKey: 'project-id-search',
        queryFn: async () =>
            await ProjectSearchApi(session?.token, {
                filters: { where: { id } },
            }),
        onSuccess: response => {
            setProjects(response.data)
        },
        enabled: !!id,
    })

    if (!!projects) return <ProjectCreateEditView currentData={projects} />
}
