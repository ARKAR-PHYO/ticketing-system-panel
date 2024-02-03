export interface ProjectInterface {
    id: string
    name: string
    description: string
}

export interface ProjectFiltersInterface {
    searchValue: string
}

export interface ApplyFilterInterface {
    inputData: ProjectInterface[]
    comparator: (a: any, b: any) => number
    filters: ProjectFiltersInterface
}

export type ProjectTableFiltersValue = string | string[]

export interface ProjectTableRowInterface {
    row: ProjectInterface
    onEditRow: VoidFunction
    onDeleteRow: VoidFunction
    isDeletableRow?: boolean
}

export interface ProjectTableSearchbarInterface {
    filters: ProjectFiltersInterface
    onFilters: (fullName: string, value: ProjectTableFiltersValue) => void
}
