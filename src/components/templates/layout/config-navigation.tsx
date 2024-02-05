import { paths } from '@/routes/paths'
import { getIconify } from '@/utils/functions/get-icons'
import axios from 'axios'
import { ReactElement, useMemo } from 'react'
import { useQuery } from 'react-query'

const ICONS = {
    dashboard: getIconify('material-symbols:home'),
    user: getIconify('heroicons-solid:user-group'),
    role: getIconify('mdi:user-lock-open'),
    project: getIconify('oi:project'),
    task: getIconify('fluent:tasks-app-20-filled'),
}

export interface NavItemChilden {
    title: string
    path: string
}
export interface INavItem {
    items: [
        {
            title: string
            path: string
            icon: ReactElement
            children?: () => NavItemChilden[]
        },
    ]
    perms: { [key: string]: any }
}

export function useNavData() {
    const { data: navData } = useQuery({
        queryKey: 'get-nav-list',
        queryFn: async () => {
            const nav = await axios.get(`/api/nav`)
            return await nav.data
        },
    })
    return useMemo(
        (): INavItem[] =>
            navData && [
                {
                    items: [
                        {
                            title: 'dashboard',
                            path: paths.dashboard.root,
                            icon: ICONS.dashboard,
                        },
                    ],
                    perms: (navData &&
                        navData.role.permission.find(
                            (p: any) => p.title === 'dashboard',
                        )) || {
                        title: 'dashboard',
                        read: true,
                    },
                },
                {
                    items: [
                        {
                            title: `user management`,
                            path: paths.dashboard.userManagement.root,
                            icon: ICONS.user,
                            children: () => {
                                const perm = navData.role.permission.find(
                                    (p: any) => p.title === 'user management',
                                )
                                if (perm['create']) {
                                    return [
                                        {
                                            title: `user lists`,
                                            path: paths.dashboard.userManagement
                                                .root,
                                        },
                                        {
                                            title: `create user`,
                                            path: paths.dashboard.userManagement
                                                .new,
                                        },
                                    ]
                                } else {
                                    return [
                                        {
                                            title: 'user lists',
                                            path: paths.dashboard.userManagement
                                                .root,
                                        },
                                    ]
                                }
                            },
                        },
                    ],
                    perms: (navData &&
                        navData.role.permission.find(
                            (p: any) => p.title === 'user management',
                        )) || {
                        title: 'user management',
                        read: true,
                    },
                },
                {
                    items: [
                        {
                            title: 'role permission management',
                            path: paths.dashboard.rolePermissionMamagement.root,
                            icon: ICONS.role,
                            children: () => {
                                const perm = navData.role.permission.find(
                                    (p: any) =>
                                        p.title ===
                                        'role permission management',
                                )
                                if (perm['create']) {
                                    return [
                                        {
                                            title: 'view account type',
                                            path: paths.dashboard
                                                .rolePermissionMamagement.root,
                                        },
                                        {
                                            title: 'create new role permission',
                                            path: paths.dashboard
                                                .rolePermissionMamagement.new,
                                        },
                                    ]
                                } else {
                                    return [
                                        {
                                            title: 'view account type',
                                            path: paths.dashboard
                                                .rolePermissionMamagement.root,
                                        },
                                    ]
                                }
                            },
                        },
                    ],
                    perms: (navData &&
                        navData.role.permission.find(
                            (p: any) => p.title === 'account type management',
                        )) || {
                        title: 'account type management',
                        read: true,
                    },
                },
                {
                    items: [
                        {
                            title: 'project management',
                            path: paths.dashboard.projectManagement.root,
                            icon: ICONS.project,
                            children: () => {
                                const perm = navData.role.permission.find(
                                    (p: any) =>
                                        p.title === 'project management',
                                )
                                if (perm['create']) {
                                    return [
                                        {
                                            title: 'Projects',
                                            path: paths.dashboard
                                                .projectManagement.root,
                                        },
                                        {
                                            title: 'create new project',
                                            path: paths.dashboard
                                                .projectManagement.new,
                                        },
                                    ]
                                } else {
                                    return [
                                        {
                                            title: 'view account type',
                                            path: paths.dashboard
                                                .projectManagement.root,
                                        },
                                    ]
                                }
                            },
                        },
                    ],
                    perms: (navData &&
                        navData.role.permission.find(
                            (p: any) => p.title === 'account type management',
                        )) || {
                        title: 'account type management',
                        read: true,
                    },
                },
                {
                    items: [
                        {
                            title: 'ticket management',
                            path: paths.dashboard.ticketManagement.root,
                            icon: ICONS.task,
                            children: () => {
                                const perm = navData.role.permission.find(
                                    (p: any) => p.title === 'ticket management',
                                )
                                if (perm['create']) {
                                    return [
                                        {
                                            title: 'Ticket',
                                            path: paths.dashboard
                                                .ticketManagement.root,
                                        },
                                        {
                                            title: 'create new ticket',
                                            path: paths.dashboard
                                                .ticketManagement.new,
                                        },
                                    ]
                                } else {
                                    return [
                                        {
                                            title: 'view ticket',
                                            path: paths.dashboard
                                                .ticketManagement.root,
                                        },
                                    ]
                                }
                            },
                        },
                    ],
                    perms: (navData &&
                        navData.role.permission.find(
                            (p: any) => p.title === 'ticket management',
                        )) || {
                        title: 'ticket management',
                        read: true,
                    },
                },
            ],
        [navData],
    )
}
