import { number, object, ref, string } from 'yup'

export const UserValidationSchema = object().shape({
    id: string(),
    roleName: string().required('Role Name is required.'),
    fullName: string().required('Full Name is a required field.'),
    userName: string().required('Username is a required field.'),
    email: string().email(),
    mobileNumber: number().typeError('The mobile number can be only numeric'),
    password: string().when('$id', ([id], schema) => {
        return id
            ? schema
            : schema
                  .required('Password is required')
                  .test(
                      'password-complexity',
                      'Use 8 or more characters with a mix of uppercase letters, lowercase letters, numbers, and symbols',
                      value => {
                          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*.?&]{8,}$/.test(
                              value,
                          )
                      },
                  )
    }),
    confirmPassword: string().oneOf(
        [ref('password')],
        'Passwords do not match',
    ),
})
