'use client'

import { useAuthContext } from '@/auth/hooks/use-auth-context'
import CustomBreadcrumbs from '@/components/molecules/custom-breadcrumbs'
import Editor from '@/components/molecules/editor'
import { useSnackbar } from '@/components/organisms/root/snackbar'
import { ProjectInterface } from '@/lib/interfaces/Project-interface'
import { TicketInterface } from '@/lib/interfaces/ticket-interface'
import { UserInterface } from '@/lib/interfaces/user-management-interface'
import { paths } from '@/routes/paths'
import { GetAllProjectsApi } from '@/utils/apis/project-api'
import { CreateTicketApi, GetTicketNumberApi } from '@/utils/apis/ticket-api'
import { GetAllUsersApi } from '@/utils/apis/user-api'
import { formatDate, parseDate } from '@/utils/functions/format-time'
import LoadingButton from '@mui/lab/LoadingButton'
import {
    Autocomplete,
    Box,
    Button,
    Card,
    Chip,
    FormControl,
    FormHelperText,
    TextField,
    Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { Form, FormikProvider, useFormik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'

interface Props {
    currentData?: TicketInterface
}

export default function TicketCreateEditView({ currentData }: Props) {
    const { data: session } = useSession()
    const { permissions } = useAuthContext()
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()

    // STATES
    const [users, setUsers] = useState<UserInterface[]>([])
    const [projects, setProjects] = useState<ProjectInterface[]>([])

    // USE QUERY
    const { refetch: refetchJobCount } = useQuery({
        queryKey: ['job-count'],
        queryFn: async () => await GetTicketNumberApi(session?.token),
        onSuccess: response => {
            if (!currentData) {
                formik.setFieldValue('ticketNumber', response.data)
            }
        },
    })
    useQuery({
        queryKey: 'get-users',
        queryFn: async () => await GetAllUsersApi(session?.token),
        onSuccess: response => {
            setUsers(response.data)
        },
    })
    const { isLoading: projectsLoading } = useQuery({
        queryKey: 'get-projects',
        queryFn: async () => await GetAllProjectsApi(session?.token),
        onSuccess: response => {
            setProjects(response.data)
        },
    })

    // FUNCTIONS
    const pagePermissions =
        permissions &&
        permissions.find(
            (perm: { [key: string]: any }) =>
                perm.title === 'ticket management',
        )

    if (!currentData && !pagePermissions['create']) {
        router.replace('/error/403')
    }

    // FORMIK
    const defaultValues: TicketInterface = {
        id: (currentData && currentData.id) || '',
        ticketNumber: (currentData && currentData.ticketNumber) || '',
        title: (currentData && currentData.title) || '',
        body: (currentData && currentData.body) || '',
        status: (currentData && currentData.status) || '',
        projectId: (currentData && currentData.projectId) || '',
        responsiblePersonId:
            (currentData && currentData.responsiblePersonId) || '',
        createdById: (currentData && currentData.createdById) || '',
        participantIds: (currentData && currentData.participantIds) || [],
        deadline: (currentData && currentData.deadline) || '',
    }
    const formik = useFormik<TicketInterface>({
        initialValues: defaultValues,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                if (currentData && currentData.id) {
                } else {
                    const res = await CreateTicketApi(session?.token, values)
                    if (res.statusCode === 201) {
                        enqueueSnackbar(res.message, {
                            variant: 'success',
                        })
                        setSubmitting(false)
                        resetForm()
                        router.push(paths.dashboard.ticketManagement.root)
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

    // RENDERS
    const renderDetails = (
        <>
            <Box className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Box>
                    <Typography variant='h6' sx={{ mb: 0.5 }}>
                        Details
                    </Typography>
                    <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary' }}
                    >
                        Title, short description...
                    </Typography>
                </Box>
                <Box className='space-y-7'>
                    <Typography variant='h5'>
                        {`Task #${values.ticketNumber}`}
                    </Typography>
                    <TextField
                        required
                        fullWidth
                        label='Task Name'
                        type='text'
                        {...getFieldProps('title')}
                        disabled={
                            pagePermissions &&
                            !pagePermissions['update'] &&
                            !pagePermissions['create']
                        }
                        error={Boolean(touched.title && errors.title)}
                        helperText={touched.title && errors.title}
                    />
                    <Editor
                        className='col-span-2'
                        fieldName='body'
                        placeholder='Type Service Provided here...'
                        simple
                        disabled={
                            pagePermissions &&
                            !pagePermissions['update'] &&
                            !pagePermissions['create']
                        }
                        helperText={
                            <FormHelperText
                                error
                                sx={{
                                    px: 2,
                                    textTransform: 'capitalize',
                                }}
                            >
                                {touched.body && errors.body}
                            </FormHelperText>
                        }
                    />
                </Box>
            </Box>
        </>
    )

    const renderResponsible = (
        <>
            <Box className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Box>
                    <Typography variant='h6' sx={{ mb: 0.5 }}>
                        Responsibility
                    </Typography>
                    <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary' }}
                    >
                        Responsible person ...
                    </Typography>
                </Box>
                <Box className='space-y-7'>
                    <FormControl fullWidth>
                        <Autocomplete
                            sx={{ flex: 1 }}
                            freeSolo
                            filterSelectedOptions
                            disableClearable
                            options={projects}
                            getOptionLabel={(project: ProjectInterface) =>
                                project.name
                            }
                            value={projects.find(
                                project => project.id === values.projectId,
                            )}
                            onChange={(
                                event: ChangeEvent<{}>,
                                value: ProjectInterface,
                            ) => {
                                console.log('value ==>', value)

                                if (value) {
                                    setFieldValue(`projectId`, value.id)
                                }
                            }}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    key={params.id}
                                    required
                                    label='Project'
                                    error={Boolean(
                                        touched.projectId && errors.projectId,
                                    )}
                                    helperText={
                                        touched.projectId && errors.projectId
                                    }
                                />
                            )}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <Autocomplete
                            sx={{ flex: 1 }}
                            freeSolo
                            filterSelectedOptions
                            disableClearable
                            options={users}
                            getOptionLabel={(user: UserInterface) =>
                                user.fullName
                            }
                            value={users.find(
                                user => user.id === values.responsiblePersonId,
                            )}
                            onChange={(
                                event: ChangeEvent<{}>,
                                value: UserInterface,
                            ) => {
                                if (value) {
                                    setFieldValue(
                                        `responsiblePersonId`,
                                        value.id,
                                    )
                                }
                            }}
                            renderInput={params => (
                                <TextField
                                    key={params.id}
                                    required
                                    label='Responsible Person'
                                    error={Boolean(
                                        touched.responsiblePersonId &&
                                            errors.responsiblePersonId,
                                    )}
                                    helperText={
                                        touched.responsiblePersonId &&
                                        errors.responsiblePersonId
                                    }
                                    {...params}
                                />
                            )}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <Autocomplete
                            multiple
                            options={users}
                            getOptionLabel={user => user.fullName}
                            value={values.participantIds || []}
                            isOptionEqualToValue={(option, value) =>
                                value && option.id === value.id
                            }
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setFieldValue(
                                        'participantIds',
                                        newValue.map(user => ({
                                            id: user.id,
                                            fullName: user.fullName,
                                        })),
                                    )
                                } else {
                                    setFieldValue('participantIds', [])
                                }
                            }}
                            renderInput={params => (
                                <TextField
                                    key={params.id}
                                    required
                                    label='Participants'
                                    placeholder='Please Select Participants'
                                    error={Boolean(
                                        touched.participantIds &&
                                            errors.participantIds,
                                    )}
                                    helperText={
                                        touched.participantIds &&
                                        (Array.isArray(errors.participantIds)
                                            ? errors.participantIds.join(', ')
                                            : errors.participantIds)
                                    }
                                    {...params}
                                />
                            )}
                            renderOption={(props, option) => (
                                <li {...props} key={option.id}>
                                    {option.fullName}
                                </li>
                            )}
                            renderTags={(selected, getTagProps) =>
                                selected.map((option, index) => (
                                    <Chip
                                        {...getTagProps({ index })}
                                        key={option.id}
                                        label={option.fullName}
                                        size='medium'
                                        color={'default'}
                                        variant='soft'
                                    />
                                ))
                            }
                        />
                    </FormControl>
                    <DatePicker
                        label='Deadline'
                        format='dd/MM/yyyy'
                        sx={{ width: '100%' }}
                        value={
                            values.deadline !== ''
                                ? parseDate(values.deadline)
                                : null
                        }
                        onChange={value =>
                            value &&
                            setFieldValue(
                                'deadline',
                                formatDate(new Date(value)),
                            )
                        }
                    />
                </Box>
            </Box>
        </>
    )

    return (
        <>
            <Card>
                <FormikProvider value={formik}>
                    <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                        <Box className='flex items-center justify-between p-7'>
                            <CustomBreadcrumbs
                                heading={
                                    currentData
                                        ? 'Edit Ticket'
                                        : 'Add New Ticket'
                                }
                                links={[
                                    {
                                        name: 'Ticket Management',
                                    },
                                    {
                                        name: currentData
                                            ? 'Edit Ticket'
                                            : 'Add New Ticket',
                                    },
                                ]}
                            />
                            <Box className='flex items-center w-1/5 space-x-3'>
                                <Button
                                    variant='outlined'
                                    fullWidth
                                    onClick={() =>
                                        router.push(
                                            paths.dashboard.ticketManagement
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

                        <Box className='grid grid-cols-1 gap-4 p-7'>
                            {renderDetails}
                            {renderResponsible}
                        </Box>
                    </Form>
                </FormikProvider>
            </Card>
        </>
    )
}
