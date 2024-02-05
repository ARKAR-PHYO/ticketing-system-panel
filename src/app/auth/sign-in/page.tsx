import { Box } from '@mui/material'
import SignInForm from '@/components/templates/auth/sign-in-form'

export const metadata = {
    title: 'Login',
}

const SignIn = () => {
    return (
        <Box className='flex items-center justify-center h-screen'>
            <Box className='flex-auto max-w-xl pl-36'>
                <Box className='mt-10 space-y-5 text-white'>
                    <p className='text-5xl font-bold'>Hi, Welcome Back!</p>
                    <p className='text-xl font-light'>
                        Empower your organization. Lead with confidence and
                        unlock success.
                    </p>
                </Box>
            </Box>

            <SignInForm />
        </Box>
    )
}

export default SignIn
