import { API_SERVER, SECRET_PASSWORD } from '@/config-global'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth/authOptions'

export async function GET(request: NextRequest, response: NextResponse) {
    const serverSession = await getServerSession(authOptions)
    try {
        const accountTypeReponse = await fetch(
            API_SERVER + `/api/role/${serverSession?.user?.roleName}`,
            {
                method: 'GET',
                headers: {
                    Authorization:
                        SECRET_PASSWORD + ' ' + serverSession?.token!,
                },
            },
        )
        const data = await accountTypeReponse.json()

        return NextResponse.json(data)
    } catch (error) {
        throw error
    }
}
