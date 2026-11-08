'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel, FieldTitle } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { Controller, useForm } from 'react-hook-form'
import { RegisterScheme } from './Register.scheme'
import { registerApi } from './Register.api'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function SignUp() {
    const { handleSubmit, control } = useForm<z.infer<typeof RegisterScheme>>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        resolver: zodResolver(RegisterScheme)
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    async function handleRegister(data: z.infer<typeof RegisterScheme>) {
        setLoading(true)
        const response = await registerApi(data)
        console.log(response);
        if (response.message == 'success') {
            toast.success('account Create')
            setTimeout(() => {
                router.push('/login')
            }, 1000);
        } else {
            toast.error(response.message)
        }
        setLoading(false)

    }


    return (
        <div>

            <h1>Create Account.......</h1>

            <form onSubmit={handleSubmit(handleRegister)} className='my-6' >
                <FieldGroup>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Enter Your Name *
                                </FieldLabel>
                                <Input
                                    {...field}
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
                    <Controller
                        name="rePassword"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Enter Confirm Password *
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
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Enter Phone *
                                </FieldLabel>
                                <Input
                                    {...field}
                                    type='tel'
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
                {loading ? <Button type='button' className={cn('my-5 w-full')}>Loading....</Button> : <Button type='submit' className={cn('my-5 w-full')}>Create Account</Button>}

            </form>
        </div>
    )
}
