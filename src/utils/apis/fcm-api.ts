import apiCall, { endpoints } from './api-call'

export async function SearchFCM(
    token: string | undefined,
    searchParameters: { [key: string]: any },
) {
    try {
        const response = await apiCall(token).post(
            endpoints.fcm.search,
            searchParameters,
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function CreateFCM(token: string | undefined, data: any) {
    try {
        const response = await apiCall(token).post(endpoints.fcm.create, data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
