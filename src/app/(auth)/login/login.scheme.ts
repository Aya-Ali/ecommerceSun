import * as z from 'zod'
export const LoginScheme = z.object({
       email: z.string().nonempty('email is Required').regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'name in Valid'),
    password: z.string().nonempty('Password is Required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Password in Valid'),
   
})