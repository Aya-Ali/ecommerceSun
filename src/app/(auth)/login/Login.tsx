'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel, FieldTitle } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { Controller, useForm } from 'react-hook-form'
import { LoginScheme } from './login.scheme'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoginApi } from './login.api'
import { signIn } from 'next-auth/react'
export default function Login() {
    const { handleSubmit, control } = useForm<z.infer<typeof LoginScheme>>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(LoginScheme)
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    async function handleLogin(data: z.infer<typeof LoginScheme>) {
                // setLoading(true)
        // const resp = await LoginApi(data)
        setLoading(true)
        
       const res =  await signIn('credentials', { ...data, redirect: false, callbackUrl: "/" })
       console.log(res);
       
     

        if(res.ok){
             toast.success('Login Success')
            setTimeout(() => {
                router.push('/')
            }, 1000);
        } else {
            toast.error('email or password incorrect')
        }
        setLoading(false)
    }

    // nextauth
    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleSubmit(handleLogin)} className='my-6' >
                <FieldGroup>

                    <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Enter Your Email *
                                </FieldLabel>
                                <Input
                                    {...field}
                                    type='email'
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Enter Your Password *
                                </FieldLabel>
                                <Input
                                    {...field}
                                    type='password'
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                </FieldGroup>
                {loading ? <Button type='button' className={cn('my-5 w-full')}>Loading....</Button> : <Button type='submit' className={cn('my-5 w-full')}>Login</Button>}

            </form>
        </div>
    )
}
