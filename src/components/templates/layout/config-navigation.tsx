import { paths } from '@/routes/paths'
import { getIconify, getSVGIcon } from '@/utils/functions/get-icons'
import axios from 'axios'
import { ReactElement, useMemo } from 'react'
import { useQuery } from 'react-query'

const ICONS = {
    dashboard: getIconify('material-symbols:home'),
    accountTypeManagement: getIconify('heroicons-solid:user-group'),
    job: getSVGIcon('ic_job_management'),
    workshop: getIconify('maki:car-repair'),
    completionCode: getIconify('grommet-icons:user-worker'),
    jobManagement: getIconify('entypo:area-graph'),
    subcontractor: getIconify('grommet-icons:user-worker'),
    fleetManagement: getIconify('fluent:dual-screen-settings-24-regular'),
    carManagement: getIconify('ph:car-profile-fill'),
    accountManagement: getIconify('solar:user-bold'),
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
                            icon: ICONS.accountTypeManagement,
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
            ],
        [navData],
    )
}
