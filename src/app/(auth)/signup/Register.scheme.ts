import * as z from 'zod'
export const RegisterScheme = z.object({
    name: z.string().nonempty('Name is Required').min(3, 'at last 3 char').max(20, 'max 20 char'),
    email: z.string().nonempty('email is Required').regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'name in Valid'),
    password: z.string().nonempty('Password is Required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Password in Valid'),
    rePassword: z.string().nonempty('Password is Required'),
    phone: z.string().nonempty('phone is Required').regex(/^(002)?01[0125][0-9]{8}$/,"enter Valid Egypt Phone")

}).refine((data) => {
    return data.password === data.rePassword
}, {
    error: 'Confirm Password not Match',
    path: ['rePassword']
})

