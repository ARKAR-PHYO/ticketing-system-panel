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
