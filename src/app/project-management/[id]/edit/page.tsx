'use client'

import ProjectEditView from '@/components/templates/project-management/view/project-edit-view'
import { useParams } from 'next/navigation'

export default function ProjectEditPage() {
    const { id } = useParams()

    return <ProjectEditView id={id as string} />
}
