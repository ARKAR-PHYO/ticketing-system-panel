import { format, getTime, formatDistanceToNow, parse } from 'date-fns'
import moment from 'moment'

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined

export function fDate(date: InputValue, newFormat?: string) {
    const fm = newFormat || 'dd MMM yyyy'

    return date ? format(new Date(date), fm) : ''
}

export function fDateTime(date: InputValue, newFormat?: string) {
    const fm = newFormat || 'dd MMM yyyy p'

    return date ? format(new Date(date), fm) : ''
}

export function fTimestamp(date: InputValue) {
    return date ? getTime(new Date(date)) : ''
}

export function fToNow(date: InputValue) {
    return date
        ? formatDistanceToNow(new Date(date), {
              addSuffix: true,
          })
        : ''
}

export function fCurrentYear() {
    return format(new Date(), 'yyyy')
}

export function parseDate(dateString: string): Date {
    const formatsToTry: string[] = [
        'yyyy-MM-dd',
        'dd/MM/yyyy',
        'dd/MM/yyyy HH:mm',
    ]
    for (const formatStr of formatsToTry) {
        const parsedDate = parse(dateString, formatStr, new Date())
        if (!isNaN(parsedDate.getTime())) {
            return parsedDate
        }
    }
    return new Date()
}

export function formatDate(date: Date): string {
    return format(date, 'dd/MM/yyyy')
}

export function formatDateTime(date: string) {
    const formattedDate = moment(date).format('MMMM DD YYYY, HH:mm')
    return formattedDate
}
