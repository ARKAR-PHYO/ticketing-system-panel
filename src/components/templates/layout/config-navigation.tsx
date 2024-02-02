import { paths } from '@/routes/paths'
import { getIconify } from '@/utils/functions/get-icons'
import axios from 'axios'
import { ReactElement, useMemo } from 'react'
import { useQuery } from 'react-query'

const ICONS = {
    dashboard: getIconify('material-symbols:home'),
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
    perms?: { [key: string]: any }
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
            ],
        [navData],
    )
}

// export function useNavData() {
//     const { data: navData } = useQuery({
//         queryKey: 'get-nav-list',
//         queryFn: async () => {
//             const nav = await axios.get(`/api/nav`)
//             return await nav.data
//         },
//     })
//     return useMemo(
//         (): INavItem[] =>
//             navData && [
//                 {
//                     items: [
//                         {
//                             title: 'dashboard',
//                             path: paths.dashboard.root,
//                             icon: ICONS.dashboard,
//                         },
//                     ],
//                     perms: (navData &&
//                         navData.role.permission.find(
//                             (p: any) => p.title === 'dashboard',
//                         )) || {
//                         title: 'dashboard',
//                         read: true,
//                     },
//                 },
//             ],
//         [navData],
//     )
// }
