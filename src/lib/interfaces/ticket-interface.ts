import { ProjectInterface } from './Project-interface'
import { UserInterface } from './user-management-interface'

export interface TicketInterface {
    id: string
    ticketNumber: string
    title: string
    body: string
    status: string
    projectId: string
    project?: ProjectInterface
    responsiblePersonId: string
    createdById?: string
    participantIds: UserInterface[]
    deadline: string
    createdAt?: string
    responsiblePerson?: UserInterface
    createdBy?: UserInterface
    participants?: UserInterface[]
}

export interface TicketFiltersInterface {
    searchValue: string
}

export interface ApplyFilterInterface {
    inputData: TicketInterface[]
    comparator: (a: any, b: any) => number
    filters: TicketFiltersInterface
}

export type TicketTableFiltersValue = string | string[]

export interface TicketTableRowInterface {
    row: TicketInterface
    onEditRow: VoidFunction
    onDeleteRow: VoidFunction
    isDeletableRow?: boolean
}

export interface TicketTableSearchbarInterface {
    filters: TicketFiltersInterface
    onFilters: (fullName: string, value: TicketTableFiltersValue) => void
}
