import { ProjectInterface } from '@/lib/interfaces/Project-interface'
import apiCall, { endpoints } from './api-call'

export async function CreateProjectApi(
    token: string | undefined,
    data: { [key: string]: any },
) {
    try {
        const res = await apiCall(token).post(endpoints.project.create, data)
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function GetAllProjectsApi(token: string | undefined) {
    try {
        const res = await apiCall(token).get(endpoints.project.list)
        return res.data
    } catch (error) {
        console.error('GetAllProjectApi Error', error)
        return error
    }
}

export async function UpdateProjectApi(
    token: string | undefined,
    data: { [key: string]: any },
) {
    try {
        return await apiCall(token).put(endpoints.project.update, data)
    } catch (error) {
        console.error('Update Project Error', error)
        return error
    }
}

export async function DeleteProjectApi(token: string | undefined, id: string) {
    try {
        const res = await apiCall(token).delete(endpoints.project.delete(id))
        return res.data
    } catch (error) {
        console.error('Project Delete Error', error)
        return error
    }
}

export async function ProjectSearchManyApi(
    token: string | undefined,
    searchParameters: { [key: string]: any },
) {
    try {
        const response = await apiCall(token).post(
            endpoints.project.searchMany,
            searchParameters,
        )
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function ProjectSearchApi(
    token: string | undefined,
    searchParameters: { [key: string]: any },
) {
    try {
        const response = await apiCall(token).post(
            endpoints.project.search,
            searchParameters,
        )
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
