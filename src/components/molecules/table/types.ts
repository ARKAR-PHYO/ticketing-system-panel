// ----------------------------------------------------------------------

export type TableProps = {
    /**
     * Child is for the columns that are from another table in the db
     * e.g., In `user.subcontractor.name`, in this case, `name` will be used to
     * sort.
     *
     */
    child: string
    dense: boolean
    page: number
    rowsPerPage: number
    order: 'asc' | 'desc'
    orderBy: string
    //
    selected: string[]
    onSelectRow: (id: string) => void
    onSelectAllRows: (checked: boolean, newSelecteds: string[]) => void
    //
    onResetPage: VoidFunction
    onSort: (id: string, child?: string) => void
    onChangePage: (event: unknown, newPage: number) => void
    onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void
    onUpdatePageDeleteRow: (totalRowsInPage: number) => void
    onUpdatePageDeleteRows: ({
        totalRows,
        totalRowsInPage,
        totalRowsFiltered,
    }: {
        totalRows: number
        totalRowsInPage: number
        totalRowsFiltered: number
    }) => void
    //
    setPage: React.Dispatch<React.SetStateAction<number>>
    setDense: React.Dispatch<React.SetStateAction<boolean>>
    setOrder: React.Dispatch<React.SetStateAction<'desc' | 'asc'>>
    setOrderBy: React.Dispatch<React.SetStateAction<string>>
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
}
