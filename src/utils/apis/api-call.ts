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
        list: '/adminUser',
        create: '/adminUser/createAdminUser',
        update: (id: string) => `/adminUser/updateAdminUser/${id}`,
        delete: (id: string) => `/adminUser/${id}`,
        getByUserType: (role: string) => `/adminUser/by-role/${role}`,
        getByUserId: (id: string) => `/adminUser/by-id/${id}`,
        searchMultiple: '/adminUser/search-multiple',
        search: '/adminUser/search',

        driverByStatus: '/user/driver-by-status',
        myProfile: '/user/my-profile',
        settings: '/user/settings',
        changeUserStatus: (id: string) => `/adminUser/change-status/${id}`,
    },
    role: {
        list: '/role',
        create: '/role',
        update: '/role',
        delete: (id: string) => `/role/${id}`,
        getAllRoles: '/role',
        getRole: (name: string) => `role/${name}`,
    },
}
