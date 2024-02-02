'use client'

import { useAuthContext } from '@/auth/hooks/use-auth-context'
import CustomBreadcrumbs from '@/components/molecules/custom-breadcrumbs'
import { useSnackbar } from '@/components/organisms/root/snackbar'
import { RoleInterface } from '@/lib/interfaces/Role-interface'
import { UserInterface } from '@/lib/interfaces/user-management-interface'
import { UserValidationSchema } from '@/lib/validation-schemas/user'
import { paths } from '@/routes/paths'
import { GetAllRolesApi } from '@/utils/apis/role-api'
import { CreateUserApi, UpdateUserApi } from '@/utils/apis/user-api'
import LoadingButton from '@mui/lab/LoadingButton'
import {
    Autocomplete,
    Box,
    Button,
    Card,
    TextField,
    Typography,
} from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'

interface Props {
    currentData?: UserInterface
}
export default function UserCreateEditView({ currentData }: Props) {
    const { data: session } = useSession()
    const router = useRouter()
    const { permissions } = useAuthContext()
    const { enqueueSnackbar } = useSnackbar()

    // STATES
    const [roles, setRoles] = useState<RoleInterface[]>([])
    const [isError, setIsError] = useState({
        error: false,
        message: '',
    })

    // USEQUERY
    useQuery({
        queryKey: 'get-roles',
        queryFn: async () => await GetAllRolesApi(session?.token),
        onSuccess: response => {
            setRoles(response.data)
        },
    })

    // FUNCTIONS
    const pagePermissions =
        permissions &&
        permissions.find(
            (perm: { [key: string]: any }) => perm.title === 'user management',
        )

    // FORMIK
    const defaultValues = useMemo<UserInterface>(
        () => ({
            id: (currentData && currentData.id) || '',
            roleName: (currentData && currentData.roleName) || '',
            fullName: (currentData && currentData.fullName) || '',
            userName: (currentData && currentData.userName) || '',
            password: (currentData && currentData.password) || '',
            confirmPassword: '',
            email: (currentData && currentData.email) || '',
            mobileNumber: (currentData && currentData.mobileNumber) || '',
            profileImage: (currentData && currentData.profileImage) || '',
        }),
        [currentData],
    )
    const formik = useFormik<UserInterface>({
        initialValues: defaultValues,
        validationSchema: UserValidationSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                if (currentData && currentData.id) {
                    const response = await UpdateUserApi(
                        session?.token,
                        currentData.id,
                        {
                            ...values,
                        },
                    )
                    if (response.success) {
                        enqueueSnackbar(response.message, {
                            variant: 'success',
                        })
                        resetForm()
                        setSubmitting(false)
                        router.push(paths.dashboard.userManagement.root)
                    }
                } else {
                    const res = await CreateUserApi(session?.token, values)
                    if (res.statusCode === 409) {
                        setIsError({ error: true, message: res.message })
                        enqueueSnackbar(res.message, {
                            variant: 'error',
                        })
                    } else if (res.statusCode === 201) {
                        setIsError({ error: false, message: '' })
                        enqueueSnackbar(res.message, {
                            variant: 'success',
                        })
                        setSubmitting(false)
                        resetForm()
                    }
                    router.push(paths.dashboard.userManagement.root)
                }
            } catch (error) {
                enqueueSnackbar(error, {
                    variant: 'error',
                })
            }
        },
    })
    const {
        errors,
        touched,
        values,
        handleSubmit,
        getFieldProps,
        setFieldValue,
        isSubmitting,
    } = formik

    return (
        <>
            <Card>
                <FormikProvider value={formik}>
                    <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                        <Box className='flex items-center justify-between p-7'>
                            <CustomBreadcrumbs
                                heading={currentData ? 'Edit User' : 'Add User'}
                                links={[
                                    {
                                        name: 'User',
                                        href: paths.dashboard.userManagement
                                            .root,
                                    },
                                    {
                                        name: currentData
                                            ? 'Edit User'
                                            : 'Add User',
                                    },
                                ]}
                            />
                            <Box className='flex items-center w-1/5 space-x-3'>
                                <Button
                                    variant='outlined'
                                    fullWidth
                                    onClick={() =>
                                        router.push(
                                            paths.dashboard.userManagement.root,
                                        )
                                    }
                                >
                                    Cancel
                                </Button>
                                <LoadingButton
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    disabled={
                                        pagePermissions &&
                                        !pagePermissions['update'] &&
                                        !pagePermissions['create']
                                    }
                                    loading={isSubmitting}
                                >
                                    Save
                                </LoadingButton>
                            </Box>
                        </Box>
                        <Box className='p-7'>
                            <Typography>
                                Fill in personal details below.
                            </Typography>
                            <Box className='flex w-full mt-10'>
                                <Box className='flex-auto'>
                                    <Box className='grid grid-cols-2 gap-4'>
                                        <Autocomplete
                                            options={roles}
                                            getOptionLabel={options =>
                                                options.name
                                            }
                                            value={
                                                roles.find(
                                                    type =>
                                                        type.name ===
                                                        values.roleName,
                                                ) || null
                                            }
                                            onChange={(
                                                event: React.ChangeEvent<{}>,
                                                value: RoleInterface | null,
                                            ) => {
                                                if (value) {
                                                    formik.setFieldValue(
                                                        'roleName',
                                                        value.name,
                                                    )
                                                }
                                            }}
                                            renderInput={params => (
                                                <TextField
                                                    required
                                                    label='Role'
                                                    placeholder='Select Role'
                                                    {...getFieldProps(
                                                        'roleName',
                                                    )}
                                                    {...params}
                                                    error={Boolean(
                                                        touched.roleName &&
                                                            errors.roleName,
                                                    )}
                                                    helperText={
                                                        touched.roleName &&
                                                        errors.roleName
                                                    }
                                                />
                                            )}
                                            disabled={
                                                (pagePermissions &&
                                                    !pagePermissions[
                                                        'update'
                                                    ] &&
                                                    !pagePermissions[
                                                        'create'
                                                    ]) ||
                                                (currentData &&
                                                    session?.user?.roleName !==
                                                        'Super Admin')
                                            }
                                        />
                                        <TextField
                                            fullWidth
                                            required
                                            autoComplete='fullName'
                                            label='Full Name'
                                            placeholder='Enter full name'
                                            {...getFieldProps('fullName')}
                                            disabled={
                                                pagePermissions &&
                                                !pagePermissions['update'] &&
                                                !pagePermissions['create']
                                            }
                                            error={Boolean(
                                                touched.fullName &&
                                                    errors.fullName,
                                            )}
                                            helperText={
                                                touched.fullName &&
                                                errors.fullName
                                            }
                                        />
                                        <TextField
                                            fullWidth
                                            required
                                            autoComplete='userName'
                                            label='Username'
                                            placeholder='Enter username'
                                            {...getFieldProps('userName')}
                                            disabled={
                                                pagePermissions &&
                                                !pagePermissions['update'] &&
                                                !pagePermissions['create']
                                            }
                                            error={Boolean(
                                                touched.userName &&
                                                    (errors.userName ||
                                                        isError.error),
                                            )}
                                            helperText={
                                                (touched.userName &&
                                                    errors.userName) ||
                                                (isError.error === true &&
                                                    isError.message)
                                            }
                                        />
                                        {!currentData && (
                                            <>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    autoComplete='password'
                                                    label='Password'
                                                    placeholder='Enter password'
                                                    {...getFieldProps(
                                                        'password',
                                                    )}
                                                    disabled={
                                                        pagePermissions &&
                                                        !pagePermissions[
                                                            'update'
                                                        ] &&
                                                        !pagePermissions[
                                                            'create'
                                                        ]
                                                    }
                                                    error={Boolean(
                                                        touched.password &&
                                                            errors.password,
                                                    )}
                                                    helperText={
                                                        touched.password &&
                                                        errors.password
                                                    }
                                                />
                                                <TextField
                                                    fullWidth
                                                    required
                                                    autoComplete='confirmPassword'
                                                    label='Confirm password'
                                                    placeholder='Enter confirm password'
                                                    {...getFieldProps(
                                                        'confirmPassword',
                                                    )}
                                                    disabled={
                                                        pagePermissions &&
                                                        !pagePermissions[
                                                            'update'
                                                        ] &&
                                                        !pagePermissions[
                                                            'create'
                                                        ]
                                                    }
                                                    error={Boolean(
                                                        touched.confirmPassword &&
                                                            errors.confirmPassword,
                                                    )}
                                                    helperText={
                                                        touched.confirmPassword &&
                                                        errors.confirmPassword
                                                    }
                                                />
                                            </>
                                        )}
                                        <TextField
                                            fullWidth
                                            autoComplete='email'
                                            label='Email'
                                            placeholder='Enter email'
                                            {...getFieldProps('email')}
                                            disabled={
                                                pagePermissions &&
                                                !pagePermissions['update'] &&
                                                !pagePermissions['create']
                                            }
                                            error={Boolean(
                                                touched.email && errors.email,
                                            )}
                                            helperText={
                                                touched.email && errors.email
                                            }
                                        />
                                        <TextField
                                            fullWidth
                                            autoComplete='mobileNumber'
                                            label='Mobile number'
                                            placeholder='Enter mobile number'
                                            {...getFieldProps('mobileNumber')}
                                            disabled={
                                                pagePermissions &&
                                                !pagePermissions['update'] &&
                                                !pagePermissions['create']
                                            }
                                            error={Boolean(
                                                touched.mobileNumber &&
                                                    errors.mobileNumber,
                                            )}
                                            helperText={
                                                touched.mobileNumber &&
                                                errors.mobileNumber
                                            }
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Form>
                </FormikProvider>
            </Card>
        </>
    )
}
