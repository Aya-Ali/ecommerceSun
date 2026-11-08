'use server'

export async function registerApi(data) {



    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'content-type': "application/json"
        }
    })
    const resData = await res.json()
  
    return resData

}