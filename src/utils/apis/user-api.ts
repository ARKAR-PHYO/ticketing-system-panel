import { UserInterface } from '@/lib/interfaces/user-management-interface'
import apiCall, { endpoints } from './api-call'

export async function GetAllUsersApi(token: string | undefined) {
    try {
        const res = await apiCall(token).get(endpoints.user.list)
        return res.data
    } catch (error) {
        console.error('GetAllUsersApi ->', error)
        return error
    }
}

export async function CreateUserApi(
    token: string | undefined,
    data: UserInterface,
) {
    try {
        const res = await apiCall(token).post(endpoints.user.create, data)
        return res.data
    } catch (error) {
        console.error('CreateUserApi ->', error)
        if (error.response && error.response.data) {
            return error.response.data
        } else {
            return { statusCode: 500, message: 'An error occurred.' }
        }
    }
}

export const UpdateUserApi = async (
    token: string | undefined,
    id: string,
    data: { [key: string]: any },
) => {
    try {
        const response = await apiCall(token).put(
            endpoints.user.update(id),
            data,
        )
        return response.data
    } catch (error) {
        console.error('UpdateUserApi Error ->', error)
        return error
    }
}

export async function DeleteUserApi(token: string | undefined, id: string) {
    try {
        const res = await apiCall(token).delete(endpoints.user.delete(id))
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function UserSearchManyApi(
    token: string | undefined,
    searchParameters: { [key: string]: any },
) {
    try {
        const response = await apiCall(token).post(
            endpoints.user.searchMany,
            searchParameters,
        )
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function UserSearchApi(
    token: string | undefined,
    searchParameters: { [key: string]: any },
) {
    try {
        const response = await apiCall(token).post(
            endpoints.user.search,
            searchParameters,
        )
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
