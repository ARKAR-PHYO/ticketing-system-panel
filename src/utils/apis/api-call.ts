import axios from 'axios'
import { API_SERVER, SECRET_PASSWORD } from '@/config-global'

const apiCall = (token?: string | null | undefined) => {
    const headers = {
        Authorization: token ? `${SECRET_PASSWORD} ${token}` : `JWT ${token}`,
    }

    const apiCall = axios.create({
        baseURL: `${API_SERVER}/api`,
        headers,
    })
    return apiCall
}
export const apiCallDownload = (token?: string | null | undefined) => {
    const headers = {
        Authorization: token ? `${SECRET_PASSWORD} ${token}` : `JWT ${token}`,
        responseType: 'blob',
    }

    const apiCall = axios.create({
        baseURL: `${API_SERVER}/api`,
        headers,
    })
    return apiCall
}

axios.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error.response.data)
    },
)

export default apiCall

// ----------------------------------------------------------------------

export const endpoints = {
    auth: {
        signIn: '/auth/signin',
        forgetPassword: '/auth/forget-password',
        verifyDetails: '/auth/verify-details',
        signout: `/auth/signout`,
    },
    user: {
        list: '/user',
        create: '/user',
        update: (id: string) => `/user/${id}`,
        delete: (id: string) => `/user/${id}`,
        getByUserType: (role: string) => `/user/by-role/${role}`,
        getByUserId: (id: string) => `/user/by-id/${id}`,
        searchMany: '/user/search-many',
        search: '/user/search',

        driverByStatus: '/user/driver-by-status',
        myProfile: '/user/my-profile',
        settings: '/user/settings',
        changeUserStatus: (id: string) => `/user/change-status/${id}`,
    },
    role: {
        list: '/role',
        create: '/role',
        update: '/role',
        delete: (id: string) => `/role/${id}`,
        getAllRoles: '/role',
        getRole: (name: string) => `role/${name}`,
        searchMany: '/role/search-many',
        search: '/role/search',
    },
    project: {
        list: '/project',
        create: `/project`,
        update: '/project',
        delete: (id: string) => `/project/${id}`,
        searchMany: '/project/search-many',
        search: '/project/search',
    },
}
