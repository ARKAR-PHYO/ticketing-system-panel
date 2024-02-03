'use client'

import { useAuthContext } from '@/auth/hooks/use-auth-context'
import CustomBreadcrumbs from '@/components/molecules/custom-breadcrumbs'
import { useSnackbar } from '@/components/organisms/root/snackbar'
import { ProjectInterface } from '@/lib/interfaces/Project-interface'
import { paths } from '@/routes/paths'
import { CreateProjectApi, UpdateProjectApi } from '@/utils/apis/project-api'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, Card, TextField, Typography } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Props {
    currentData?: ProjectInterface
}

export default function ProjectCreateEditView({ currentData }: Props) {
    const { data: session } = useSession()
    const { permissions } = useAuthContext()
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()

    // FUNCTIONS
    const pagePermissions =
        permissions &&
        permissions.find(
            (perm: { [key: string]: any }) =>
                perm.title === 'project management',
        )

    if (!currentData && !pagePermissions['create']) {
        router.replace('/error/403')
    }

    // FORMIK
    const defaultValues: ProjectInterface = {
        id: (currentData && currentData.id) || '',
        name: (currentData && currentData.name) || '',
        description: (currentData && currentData.description) || '',
    }
    const formik = useFormik<ProjectInterface>({
        initialValues: defaultValues,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                if (currentData && currentData.id) {
                    const res = await UpdateProjectApi(session?.token, values)
                    if (res.data.statusCode === 200) {
                        enqueueSnackbar(res.data.message, {
                            variant: 'success',
                        })
                        router.push(paths.dashboard.projectManagement.root)
                    }
                } else {
                    const res = await CreateProjectApi(session?.token, values)
                    if (res.statusCode === 200) {
                        enqueueSnackbar(res.message, {
                            variant: 'success',
                        })
                        setSubmitting(false)
                        resetForm()
                        router.push(paths.dashboard.projectManagement.root)
                    } else {
                        enqueueSnackbar(res.message, {
                            variant: 'error',
                        })
                    }
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
                                heading={
                                    currentData
                                        ? 'Edit Project'
                                        : 'Create Project'
                                }
                                links={[
                                    {
                                        name: 'Project Management',
                                    },
                                    {
                                        name: currentData
                                            ? 'Edit Project'
                                            : 'Create Project',
                                    },
                                ]}
                            />
                            <Box className='flex items-center w-1/5 space-x-3'>
                                <Button
                                    variant='outlined'
                                    fullWidth
                                    onClick={() =>
                                        router.push(
                                            paths.dashboard.projectManagement
                                                .root,
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
                            <Box className='mt-10 space-y-8'>
                                <TextField
                                    required
                                    fullWidth
                                    label='Project Name'
                                    type='text'
                                    {...getFieldProps('name')}
                                    disabled={
                                        pagePermissions &&
                                        !pagePermissions['update'] &&
                                        !pagePermissions['create']
                                    }
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                                <TextField
                                    fullWidth
                                    label='Type description here...'
                                    type='text'
                                    multiline
                                    minRows={4}
                                    maxRows={4}
                                    autoComplete='description'
                                    {...getFieldProps('description')}
                                    disabled={
                                        pagePermissions &&
                                        !pagePermissions['update'] &&
                                        !pagePermissions['create']
                                    }
                                    error={Boolean(
                                        touched.description &&
                                            errors.description,
                                    )}
                                    helperText={
                                        touched.description &&
                                        errors.description
                                    }
                                />
                            </Box>
                        </Box>
                    </Form>
                </FormikProvider>
            </Card>
        </>
    )
}
