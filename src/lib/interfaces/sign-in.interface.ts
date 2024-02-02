export type SignInInterface = {
    email: string
    password: string
    remember: boolean
}

export type ForgotPasswordInterface = {
    email: string
    company: string
    mobileNumber: string
    password: string
    confirmPassword: string
}

export type PasswordResetInterface = {
    password: string
    confirmPassword: string
}
