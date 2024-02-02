import { NavListProps } from '@/components/templates/layout/nav-section'
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

export interface ApplyFilterInterface {
    inputData: RoleInterface[]
    comparator: (a: any, b: any) => number
    filters: RolePermissionTableFiltersInterface
}

export interface RolePermissionTableFiltersInterface {
    searchValue: string
}

export type RolePermissionTableFiltersValue = string | string[]

export interface RolePermissionTableRowInterface {
    row: RoleInterface
    onEditRow: VoidFunction
    onDeleteRow: VoidFunction
    isDeletableRow?: boolean
}

export interface RolePermissionTableSearchbarInterface {
    filters: RolePermissionTableFiltersInterface
    onFilters: (
        fullName: string,
        value: RolePermissionTableFiltersValue,
    ) => void
}

// ----------------------------------------------------------------------

// permission table
export type PermissionTableFiltersValue = string | string[]

export type PermissionProps = {
    subheader?: string
    items: NavListProps[]
}[]

export type PermissioinApplyFilterType = {
    inputData: any[]
    comparator: (a: any, b: any) => number
    filters: PermissionTableFiltersTypes
}

export type PermissionTableFiltersTypes = {
    title: string
}

export type PermissionTableRowProps = {
    row: NavListProps
    selected?: boolean
    onEditRow?: VoidFunction
    onSelectRow?: VoidFunction
    onDeleteRow?: VoidFunction
}

export type PermissionTableSearchbarProps = {
    filters: PermissionTableFiltersTypes
    onFilters: (title: string, value: PermissionTableFiltersValue) => void
}
