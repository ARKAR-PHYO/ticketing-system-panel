import { AuthUserInterface } from '../interfaces/Authentication.interface'

export type AUTHContextType = {
    user: AuthUserInterface
    isAuthenticated: boolean
    permissions: { [key: string]: any }
}
