import { RoleInterface } from '@/lib/interfaces/Role-interface'
import apiCall, { endpoints } from './api-call'

export async function GetRoleApi(token: string | undefined, name: string) {
    try {
        const res = await apiCall(token).get(endpoints.role.getRole(name))
        return res.data
    } catch (error) {
        console.error('DeleteCompletionCodeApi Error', error)
        return error
    }
}

export async function GetAllRolesApi(token: string | undefined) {
    try {
        const res = await apiCall(token).get(endpoints.role.list)
        return res.data
    } catch (error) {
        console.error('GetAllRolesApi Error', error)
        return error
    }
}

export const CreateRoleApi = async (
    token: string | undefined,
    data: RoleInterface,
) => {
    try {
        const res = await apiCall(token).post(endpoints.role.create, data)
        return res.data
    } catch (error) {
        console.error('CreateRoleApi ERROR', error)
        return error
    }
}

export async function UpdateRoleApi(
    token: string | undefined,
    data: RoleInterface,
) {
    try {
        return await apiCall(token).put(endpoints.role.update, data)
    } catch (error) {
        console.error('UpdateRoleApi Error', error)
        return error
    }
}

export async function DeleteRoleApi(token: string | undefined, id: string) {
    try {
        const res = await apiCall(token).delete(endpoints.role.delete(id))
        return res.data
    } catch (error) {
        console.error('DeleteCompletionCodeApi Error', error)
        return error
    }
}

export async function RoleSearchManyApi(
    token: string | undefined,
    searchParameters: { [key: string]: any },
) {
    try {
        const response = await apiCall(token).post(
            endpoints.role.searchMany,
            searchParameters,
        )
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function RoleSearchApi(
    token: string | undefined,
    searchParameters: { [key: string]: any },
) {
    try {
        const response = await apiCall(token).post(
            endpoints.role.search,
            searchParameters,
        )
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
