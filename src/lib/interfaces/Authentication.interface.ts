// import { AuthUserInterface } from "./AuthUser.interface";
// -----------------------------------------------------------------------------

export interface AuthUserInterface {
    id: string
    fullName: string
    email: string
    password: string
    mobileNumber: string
    roleName: string
}

export type AuthUser = any | null | Record<string, any>

export type AppState = {}

// -----------------------------------------------------------------------------
export type JWTContextType = {
    login: (email: string, password: string) => Promise<void>
}

export type authenticatedUserTypes = {
    fullname: string
    email: string
    mobileNumber: string
    userTypes: string
    id: string
}

export type NodeExpressContextType = {}

export interface SignInSuccessReturnInterface {
    success: boolean
    statusCode: number
    message: string
    data: AuthUserInterface
    accessToken: string
}

export interface SignInFailedReturnInterface {
    success: boolean
    statusCode: number
    message: string
}
