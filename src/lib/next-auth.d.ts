import NextAuth, { DefaultSession, DefaultJWT } from 'next-auth'

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        token?: string
        user?: {
            id?: string
            fullName?: string
            mobileNumber: string
            roleName: string
            // userType?: string;
            // /** The user's postal address. */
            // role?: {
            // 	department?: string;
            // 	position?: string;
            // };
            subcontractorId?: string
        } & DefaultSession['user']
    }

    interface User {
        token: string
        user: {
            id?: string
            fullName?: string
            mobileNumber: string
            roleName: string
            // user_type?: string;
            // role?: {
            // 	department?: string;
            // 	position?: string;
            // };
        }
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        token?: string
        user?: {
            id?: string
            fullName?: string
            mobileNumber: string
            roleName: string
            // user_type?: string;
            /** The user's postal address. */
            // role?: {
            // 	department?: string;
            // 	position?: string;
            // };
        } & DefaultSession['user']
    }
}
