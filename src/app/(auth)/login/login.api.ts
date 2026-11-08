'use server'

import { cookies } from "next/headers"

export async function LoginApi(data) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    })
    const responseData = await response.json()

    const CookiesData = await cookies()
    CookiesData.set('userToken', responseData.token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 ,
        secure:true,
        sameSite:'strict'
    })
    return responseData
}