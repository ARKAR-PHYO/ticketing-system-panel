import apiCall, { endpoints } from './api-call'

export async function GetTicketNumberApi(token: string | undefined) {
    try {
        const res = await apiCall(token).get(endpoints.ticket.ticketNumber)
        return res.data
    } catch (error) {
        return error
    }
}

export async function GetAllTicketsApi(token: string | undefined) {
    try {
        const res = await apiCall(token).get(endpoints.ticket.list)
        return res.data
    } catch (error) {
        console.error('GetAllTicketsApi Error', error)
        return error
    }
}

export async function CreateTicketApi(
    token: string | undefined,
    data: { [key: string]: any },
) {
    try {
        const res = await apiCall(token).post(endpoints.ticket.create, data)
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function TicketSearchManyApi(
    token: string | undefined,
    searchParameters: { [key: string]: any },
) {
    try {
        const response = await apiCall(token).post(
            endpoints.ticket.searchMany,
            searchParameters,
        )
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function TicketSearchApi(
    token: string | undefined,
    searchParameters: { [key: string]: any },
) {
    try {
        const response = await apiCall(token).post(
            endpoints.ticket.search,
            searchParameters,
        )
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
