export function paramCase(str: string) {
    return str
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
}

export function snakeCase(str: string) {
    return str
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '')
}

export function capitalize(str: string) {
    if (typeof str !== 'string' || str.length === 0) {
        return str
    }

    return str.charAt(0).toUpperCase() + str.slice(1)
}
