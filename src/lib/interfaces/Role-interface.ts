import { UserInterface } from './user-management-interface'

export interface RoleInterface {
    id: string
    name: string
    description: string
    permission: Permission[]
    createdAt?: string
    updatedAt?: string
    user?: UserInterface[]
}

export interface Permission {
    title: string
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
}
