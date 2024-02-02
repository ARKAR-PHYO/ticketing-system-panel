// ----------------------------------------------------------------------

export function emptyRows(
    page: number,
    rowsPerPage: number,
    arrayLength: number,
) {
    return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T, child?: any) {
    if (a[orderBy] === null) {
        return 1
    }
    if (b[orderBy] === null) {
        return -1
    }
    if (child) {
        //@ts-expect-error
        if (b[orderBy][child] < a[orderBy][child]) {
            return -1
        }
        //@ts-expect-error
        if (b[orderBy][child] > a[orderBy][child]) {
            return 1
        }
    } else {
        if (b[orderBy] < a[orderBy]) {
            return -1
        }
        if (b[orderBy] > a[orderBy]) {
            return 1
        }
    }
    return 0
}

export function getComparator<Key extends keyof any>(
    order: 'asc' | 'desc',
    orderBy: Key,
    child?: unknown,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy, child)
        : (a, b) => -descendingComparator(a, b, orderBy, child)
}