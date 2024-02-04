import '@/utils/functions/highlight'
import dynamic from 'next/dynamic'
// @mui
import { alpha } from '@mui/material/styles'
import Skeleton from '@mui/material/Skeleton'
//
import { EditorProps } from './types'
import { StyledEditor } from './styles'
import Toolbar, { formats } from './toolbar'
import { Field, FieldProps } from 'formik'

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => (
        <Skeleton
            sx={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                height: 1,
                position: 'absolute',
                borderRadius: 1,
            }}
        />
    ),
})

// ----------------------------------------------------------------------

export default function Editor({
    id = 'minimal-quill',
    error,
    simple = false,
    helperText,
    sx,
    fieldName,
    className,
    placeholder,
    disabled,
    ...other
}: EditorProps) {
    const modules = {
        toolbar: {
            container: `#${id}`,
        },
        history: {
            delay: 500,
            maxStack: 100,
            userOnly: true,
        },
        syntax: true,
        clipboard: {
            matchVisual: false,
        },
    }

    return (
        <>
            <StyledEditor
                className={className}
                sx={{
                    ...(error && {
                        border: theme =>
                            `solid 1px ${theme.palette.error.main}`,
                        '& .ql-editor': {
                            bgcolor: theme =>
                                alpha(theme.palette.error.main, 0.08),
                        },
                    }),
                    ...sx,
                }}
            >
                <Toolbar id={id} isSimple={simple} />

                <Field name={fieldName}>
                    {({ field }: FieldProps) => (
                        <ReactQuill
                            value={field.value}
                            onChange={field.onChange(field.name)}
                            modules={modules}
                            formats={formats}
                            placeholder={
                                placeholder
                                    ? placeholder
                                    : 'Write something awesome...'
                            }
                            {...other}
                        />
                    )}
                </Field>
            </StyledEditor>

            {helperText && helperText}
        </>
    )
}
