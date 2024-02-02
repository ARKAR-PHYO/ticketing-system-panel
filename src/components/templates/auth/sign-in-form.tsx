'use client'

import { useState } from 'react'
import {
    Box,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material'
import * as Yup from 'yup'
import { Form, FormikProvider, useFormik } from 'formik'
import { SignInInterface } from '@/lib/interfaces/sign-in.interface'
import Iconx from '@/components/atoms/icons/iconx'
import Link from 'next/link'
import LoadingButton from '@mui/lab/LoadingButton'
import { fCurrentYear } from '@/utils/functions/format-time'
import { signIn } from 'next-auth/react'
import { useSnackbar } from '@/components/organisms/root/snackbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/authOptions'
import { paths } from '@/routes/paths'

export async function getServerSideProps(context: any) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions,
    )

    if (!session) {
        return {
            redirect: {
                destination: paths.auth.login,
                permanent: false,
            },
        }
    }

    return {
        props: {
            session,
        },
    }
}

const SignInForm = () => {
    const { enqueueSnackbar } = useSnackbar()
    // STATES
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loginError, setLoginError] = useState<boolean>(false)

    // FORMIK
    const SignInSchema = Yup.object().shape({
        email: Yup.string().required('Email is required.'),
        password: Yup.string().required('Password is required'),
    })
    const formik = useFormik<SignInInterface>({
        enableReinitialize: true,
        initialValues: {
            email: '',
            password: '',
            remember: false,
        },
        validationSchema: SignInSchema,
        onSubmit: async values => {
            try {
                signIn('credentials', {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                }).then(res => {
                    if (!res?.error) {
                        enqueueSnackbar('Successfully logged in!', {
                            variant: 'success',
                        })
                    } else {
                        setLoginError(true)
                        enqueueSnackbar('User email or password was wrong!', {
                            variant: 'error',
                        })
                    }
                })
            } catch (error) {
                console.error('signin Error', error)
            }
        },
        validateOnChange: true, // Trigger validation on input change
        validateOnBlur: true, // Trigger validation on input blur
    })
    const {
        errors,
        touched,
        values,
        isSubmitting,
        handleSubmit,
        getFieldProps,
        handleChange,
    } = formik

    return (
        <Box className='w-1/4 ml-40 bg-white rounded-md text-slate-900'>
            <Box className='p-10'>
                <Box>
                    <Typography variant='h4'>Sign in</Typography>
                    <Typography variant='body2' className=' text-slate-500'>
                        Please sign in to your account.
                    </Typography>
                </Box>
                <FormikProvider value={formik}>
                    <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                        <Box className='mt-10 space-y-8'>
                            <TextField
                                fullWidth
                                autoComplete='Username / Email'
                                label='Username / Email'
                                {...getFieldProps('email')}
                                error={Boolean(
                                    (touched.email && errors.email) ||
                                        loginError,
                                )}
                                helperText={touched.email && errors.email}
                            />
                            <TextField
                                fullWidth
                                autoComplete='password'
                                label='Password'
                                type={showPassword ? 'text' : 'password'}
                                {...getFieldProps('password')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        show => !show,
                                                    )
                                                }
                                                edge='end'
                                            >
                                                <Iconx
                                                    icon={
                                                        showPassword
                                                            ? 'EyeIcon'
                                                            : 'EyeSlashIcon'
                                                    }
                                                    className='w-6 h-6'
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(
                                    touched.password &&
                                        (errors.password || loginError),
                                )}
                                helperText={
                                    (touched.password && errors.password) ||
                                    (loginError &&
                                        'User email or password was wrong!')
                                }
                            />
                            <Box className='flex items-center justify-between'>
                                <FormControlLabel
                                    label='Remember Me'
                                    name='remember'
                                    control={
                                        <Checkbox
                                            checked={values.remember}
                                            onChange={handleChange}
                                        />
                                    }
                                />
                                <Link
                                    href={'/auth/forgot-password'}
                                    className=' text-PRIMARY-500'
                                >
                                    Forgot Password?
                                </Link>
                            </Box>

                            <LoadingButton
                                fullWidth
                                color='primary'
                                size='large'
                                type='submit'
                                variant='contained'
                                loading={isSubmitting}
                            >
                                Login
                            </LoadingButton>

                            <Typography
                                variant='body2'
                                className='text-center text-slate-500'
                            >
                                Copyright &copy; {fCurrentYear()}
                            </Typography>
                        </Box>
                    </Form>
                </FormikProvider>
            </Box>
        </Box>
    )
}

export default SignInForm
