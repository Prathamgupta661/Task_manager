import * as Yup from 'yup';

export const SignUpSchema = Yup.object({
    name: Yup.string().min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be at most 50 characters')
        .required('Name is required').notOneOf(['admin', 'root','1','0','2','3','4','5','6','7','8',9], 'Enter a valid name'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be at most 20 characters')
        .required('Password is required'),
    country: Yup.string()
        .min(2, 'Country must be at least 2 characters')
        .max(50, 'Country must be at most 50 characters')
        .required('Country is required'),
})