'use client'

import { useAuthContext } from '@/auth/hooks/use-auth-context'
import {
    TableEmptyRows,
    TableHeadCustom,
    TableNoData,
    emptyRows,
    getComparator,
    useTable,
} from '@/components/molecules/table'
import { useSnackbar } from '@/components/organisms/root/snackbar'
import {
    PermissioinApplyFilterType,
    Permission,
    PermissionTableFiltersTypes,
    PermissionTableFiltersValue,
    RoleInterface,
} from '@/lib/interfaces/Role-interface'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { defaultPermission } from '../_common/default-permission'
import { Form, FormikProvider, useFormik } from 'formik'
import { paths } from '@/routes/paths'
import {
    Box,
    Button,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography,
} from '@mui/material'
import CustomBreadcrumbs from '@/components/molecules/custom-breadcrumbs'
import PermissionTableSearchbar from '../permission-table-searchbar'
import { CreateRoleApi, UpdateRoleApi } from '@/utils/apis/role-api'

interface Props {
    currentData?: RoleInterface
}

const TABLE_HEAD = [
    { id: 'resourceName', label: 'Resource Name' },
    { id: 'create', label: 'create' },
    { id: 'read', label: 'Read' },
    { id: 'update', label: 'Update' },
    { id: 'delete', label: 'Delete' },
]

const defaultFilters: PermissionTableFiltersTypes = {
    title: '',
}

export default function RolePermissionCreateEditView({ currentData }: Props) {
    const { data: session } = useSession()
    const router = useRouter()
    const { permissions } = useAuthContext()
    const { enqueueSnackbar } = useSnackbar()
    const table = useTable()
    const rowsPerPage = 100

    const pagePermissions =
        permissions &&
        permissions.find(
            (perm: { [key: string]: any }) =>
                perm.title === 'role permission management',
        )
    if (!currentData && !pagePermissions['create']) {
        router.replace('/error/403')
    }

    // STATES
    const [filters, setFilters] = useState(defaultFilters)
    const [resources, setResources] = useState(defaultPermission)

    const currentDataPermissions = Array.isArray(currentData?.permission)
        ? currentData?.permission
        : JSON.parse(currentData?.permission || '[]')

    // FORMIK
    const defaultValues: RoleInterface = {
        id: currentData?.id || '',
        name: currentData?.name || '',
        description: currentData?.description || '',
        permission:
            currentDataPermissions.length > 0
                ? currentDataPermissions
                : defaultPermission,
    }
    const formik = useFormik<RoleInterface>({
        initialValues: defaultValues,
        // validationSchema: AccountTypeCreationValidationSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                if (currentData && currentData.id) {
                    const res = await UpdateRoleApi(session?.token, values)
                    if (res.data.statusCode === 200) {
                        enqueueSnackbar(res.data.message, {
                            variant: 'success',
                        })
                        router.push(
                            paths.dashboard.rolePermissionMamagement.root,
                        )
                    }
                } else {
                    const res = await CreateRoleApi(session?.token, values)
                    if (res?.statusCode === 201) {
                        enqueueSnackbar(res.message, {
                            variant: 'success',
                        })
                        setSubmitting(false)
                        resetForm()
                        router.push(
                            paths.dashboard.rolePermissionMamagement.root,
                        )
                    } else {
                        enqueueSnackbar(res?.message, {
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
    const { errors, touched, values, handleSubmit, getFieldProps } = formik

    // FUNCTION
    const handlePermissionChange = (
        title: string,
        field: keyof Permission,
        value: boolean,
    ) => {
        const newPermissions = values.permission.map(permission => {
            if (permission.title === title) {
                return {
                    ...permission,
                    [field]: value,
                }
            }
            return permission
        })
        const permissionToAdd = newPermissions.find(
            newPerm => newPerm.title === title,
        )
        if (!permissionToAdd) {
            newPermissions.push({ title, [field]: value })
        }

        formik.setFieldValue('permission', newPermissions)
    }

    const dataFiltered = permissionApplyFilter({
        inputData: resources,
        comparator: getComparator(table.order, table.orderBy),
        filters,
    })
    const handleFilters = useCallback(
        (title: string, value: PermissionTableFiltersValue) => {
            table.onResetPage()
            setFilters(prevState => ({
                ...prevState,
                [title]: value,
            }))
        },
        [table],
    )
    const notFound = !dataFiltered.length || !dataFiltered.length
    const handleCancelClick = () => {
        router.push(paths.dashboard.rolePermissionMamagement.root)
    }

    return (
        <Box className='h-full mb-20'>
            <Card className=' h-fit'>
                <FormikProvider value={formik}>
                    <Form
                        autoComplete='off'
                        noValidate
                        onSubmit={event => {
                            event.preventDefault()
                            if (
                                JSON.stringify(formik.values.permission) ===
                                JSON.stringify(defaultPermission)
                            ) {
                                enqueueSnackbar(
                                    'Please fill out at least one permsision.',
                                    {
                                        variant: 'error',
                                    },
                                )
                            } else {
                                handleSubmit(event)
                            }
                        }}
                    >
                        <Box className='flex items-center justify-between p-7'>
                            <CustomBreadcrumbs
                                heading={
                                    currentData
                                        ? 'Edit Role Permission'
                                        : 'Add Role Permission'
                                }
                                links={[
                                    {
                                        name: 'Role Permissioin',
                                        href: paths.dashboard
                                            .rolePermissionMamagement.root,
                                    },
                                    {
                                        name: currentData
                                            ? 'Edit Role Permission'
                                            : 'Add New Role Permission',
                                    },
                                ]}
                            />
                            <Box className='flex items-center w-1/5 space-x-3'>
                                <Button
                                    variant='outlined'
                                    fullWidth
                                    onClick={() => handleCancelClick()}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    disabled={
                                        pagePermissions &&
                                        !pagePermissions['update'] &&
                                        !pagePermissions['create']
                                    }
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                        <Box className='p-7'>
                            <Typography>Fill in the details below.</Typography>
                            <Box className='mt-10 space-y-8 '>
                                <TextField
                                    fullWidth
                                    label='Id'
                                    type='text'
                                    {...getFieldProps('id')}
                                    disabled={
                                        pagePermissions &&
                                        !pagePermissions['update'] &&
                                        !pagePermissions['create']
                                    }
                                    style={{ display: 'none' }}
                                />
                                <TextField
                                    fullWidth
                                    required
                                    autoComplete='name'
                                    label='Name'
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
                            <Box className='mt-10'>
                                <Box className='flex items-center justify-between '>
                                    <Typography>Permission</Typography>
                                    <Box className='w-full max-w-md'>
                                        <PermissionTableSearchbar
                                            filters={filters}
                                            onFilters={handleFilters}
                                        />
                                    </Box>
                                </Box>

                                <TableContainer
                                    sx={{
                                        position: 'relative',
                                        overflow: 'unset',
                                        paddingTop: 5,
                                    }}
                                >
                                    <Table size='medium' sx={{ minWidth: 960 }}>
                                        <TableHeadCustom
                                            order={table.order}
                                            orderBy={table.orderBy}
                                            headLabel={TABLE_HEAD}
                                            // rowCount={navData.length}
                                            numSelected={table.selected.length}
                                            onSort={table.onSort}
                                        />
                                        <TableBody>
                                            {dataFiltered
                                                .slice(
                                                    table.page * rowsPerPage,
                                                    table.page * rowsPerPage +
                                                        rowsPerPage,
                                                )
                                                .map(row => (
                                                    <TableRow
                                                        hover
                                                        key={row.title}
                                                    >
                                                        <TableCell
                                                            sx={{
                                                                whiteSpace:
                                                                    'nowrap',
                                                            }}
                                                        >
                                                            <Typography className='capitalize'>
                                                                {row.title}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                whiteSpace:
                                                                    'nowrap',
                                                            }}
                                                        >
                                                            <Checkbox
                                                                name='create'
                                                                disabled={
                                                                    pagePermissions &&
                                                                    !pagePermissions[
                                                                        'update'
                                                                    ] &&
                                                                    !pagePermissions[
                                                                        'create'
                                                                    ]
                                                                }
                                                                checked={values.permission.some(
                                                                    permission =>
                                                                        permission.title ===
                                                                            row.title &&
                                                                        permission.create,
                                                                )}
                                                                onChange={e =>
                                                                    handlePermissionChange(
                                                                        row.title,
                                                                        'create',
                                                                        e.target
                                                                            .checked,
                                                                    )
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                whiteSpace:
                                                                    'nowrap',
                                                            }}
                                                        >
                                                            <Checkbox
                                                                name='read'
                                                                disabled={
                                                                    pagePermissions &&
                                                                    !pagePermissions[
                                                                        'update'
                                                                    ] &&
                                                                    !pagePermissions[
                                                                        'create'
                                                                    ]
                                                                }
                                                                checked={values.permission.some(
                                                                    permission =>
                                                                        permission.title ===
                                                                            row.title &&
                                                                        permission.read,
                                                                )}
                                                                onChange={e =>
                                                                    handlePermissionChange(
                                                                        row.title,
                                                                        'read',
                                                                        e.target
                                                                            .checked,
                                                                    )
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                whiteSpace:
                                                                    'nowrap',
                                                            }}
                                                        >
                                                            <Checkbox
                                                                name='update'
                                                                disabled={
                                                                    pagePermissions &&
                                                                    !pagePermissions[
                                                                        'update'
                                                                    ] &&
                                                                    !pagePermissions[
                                                                        'create'
                                                                    ]
                                                                }
                                                                checked={values.permission.some(
                                                                    permission =>
                                                                        permission.title ===
                                                                            row.title &&
                                                                        permission.update,
                                                                )}
                                                                onChange={e =>
                                                                    handlePermissionChange(
                                                                        row.title,
                                                                        'update',
                                                                        e.target
                                                                            .checked,
                                                                    )
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                whiteSpace:
                                                                    'nowrap',
                                                            }}
                                                        >
                                                            <Checkbox
                                                                name='delete'
                                                                disabled={
                                                                    pagePermissions &&
                                                                    !pagePermissions[
                                                                        'update'
                                                                    ] &&
                                                                    !pagePermissions[
                                                                        'create'
                                                                    ]
                                                                }
                                                                checked={values.permission.some(
                                                                    permission =>
                                                                        permission.title ===
                                                                            row.title &&
                                                                        permission.delete,
                                                                )}
                                                                onChange={e =>
                                                                    handlePermissionChange(
                                                                        row.title,
                                                                        'delete',
                                                                        e.target
                                                                            .checked,
                                                                    )
                                                                }
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            <TableEmptyRows
                                                emptyRows={emptyRows(
                                                    table.page,
                                                    rowsPerPage,
                                                    resources.length,
                                                )}
                                            />
                                            <TableNoData notFound={notFound} />
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    </Form>
                </FormikProvider>
            </Card>
        </Box>
    )
}

function permissionApplyFilter({
    inputData,
    comparator,
    filters,
}: PermissioinApplyFilterType) {
    const { title } = filters
    const stabilizedThis = inputData.map((el, index) => [el, index] as const)

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })

    inputData = stabilizedThis.map(el => el[0])

    if (title) {
        inputData = inputData.filter(
            resource =>
                resource.title.toLowerCase().indexOf(title.toLowerCase()) !==
                -1,
        )
    }
    return inputData
}
