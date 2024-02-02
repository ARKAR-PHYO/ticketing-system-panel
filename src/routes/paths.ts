import { paramCase } from '@/utils/functions/change-case'

const ROOTS = {
    AUTH: '/auth',
    DASHBOARD: '/',
    ROOT: '/dashboard',
}

// ----------------------------------------------------------------------

export const paths = {
    // AUTH
    auth: {
        login: `${ROOTS.AUTH}/sign-in`,
    },

    // DASHBOARD
    dashboard: {
        root: ROOTS.DASHBOARD,
        userManagement: {
            root: `/${paramCase('user management')}`,
            new: `/${paramCase('user management')}/${paramCase('new')}`,
            edit: (id: string) => `/${paramCase('user management')}/${id}/edit`,
            driverStatus: `/${paramCase('user management')}/${paramCase(
                'driver status',
            )}`,
        },
        rolePermissionMamagement: {
            root: `/${paramCase('role permission management')}`,
            new: `/${paramCase('role permission management')}/${paramCase(
                'new',
            )}`,
            edit: (id: string) =>
                `/${paramCase('role permission management')}/${id}/edit`,
        },
    },
}
