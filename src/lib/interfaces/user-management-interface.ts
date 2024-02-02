export interface UserInterface {
    id: string
    fullName: string
    userName: string
    password: string
    confirmPassword: string
    email: string
    mobileNumber: string
    profileImage: string
    roleName: string
}

export interface UserTableFiltersInterface {
    searchValue: string
}

export interface ApplyFilterInterface {
    inputData: UserInterface[]
    comparator: (a: any, b: any) => number
    filters: UserTableFiltersInterface
}

export type UserTableFiltersValue = string | string[]

export interface UserTableRowInterface {
    row: UserInterface
    selected: boolean
    onEditRow: VoidFunction
    onSelectRow: VoidFunction
    onDeleteRow: VoidFunction
    isDeleteable: boolean
}

export interface UserTableSearchbarProps {
    filters: UserTableFiltersInterface
    onFilters: (name: string, value: UserTableFiltersValue) => void
}
