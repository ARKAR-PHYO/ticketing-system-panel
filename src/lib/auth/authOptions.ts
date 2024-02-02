import type { NextAuthOptions } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { paths } from '@/routes/paths'
import { API_SERVER, NEXTAUTH_SECRET } from '@/config-global'
import {
    SignInSuccessReturnInterface,
    SignInFailedReturnInterface,
} from '@/lib/interfaces/Authentication.interface'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password' },
            },

            authorize: async credentials => {
                const data = (await fetch(`${API_SERVER}/api/auth/signin`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials),
                }).then(res => res.json())) as
                    | SignInSuccessReturnInterface
                    | SignInFailedReturnInterface

                if ('accessToken' in data) {
                    return {
                        id: data.data.id.toString(),
                        token: data.accessToken,
                        user: {
                            id: data.data.id,
                            fullName: data.data.fullName,
                            email: data.data.email,
                            mobileNumber: data.data.mobileNumber,
                            roleName: data.data.roleName,
                        },
                    }
                }

                return null
            },
        }),
    ],

    callbacks: {
        jwt: async ({ token, user, account, profile, trigger, session }) => {
            if (trigger === 'update' && token?.user?.id == session?.user?.id) {
                token.user = session.user
            } else {
                if (user) {
                    if (account?.provider === 'credentials') {
                        token.token = user.token
                        token.user = user.user
                    }
                }
            }

            return token
        },
        session: async ({ session, token, user, trigger, newSession }) => {
            if (trigger === 'update' && token?.user?.id == session?.user?.id) {
                session.user = newSession.user
            } else {
                if (token) {
                    session.token = token.token
                    session.user = token.user
                }
            }
            return session
        },
    },
    secret: NEXTAUTH_SECRET,
    jwt: {
        secret: NEXTAUTH_SECRET,
        maxAge: 60 * 60 * 24 * 30,
    },

    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 30,
    },

    pages: {
        signIn: paths.auth.login,
    },
}
