import { product, Products } from "@/Interface/Product.t";


export async function HandleGetProduct():Promise<product[]> {

    'use cache'
    const response = await fetch(`${process.env.BASE_URL}/api/v1/products`)
    const responseData:Products =await response.json()
    // console.log(responseData.data);

    return responseData.data
}

export async function HandleGetSingleProduct(id:string):Promise<product | null> {
    const response = await fetch(`${process.env.BASE_URL}/api/v1/products/${id}`, {
        cache: "no-store",
    })

    if (response.status === 404) return null
    if (!response.ok) {
        throw new Error(`Could not load product (${response.status})`)
    }

    const responseData:{data?:product} = await response.json()
    return responseData.data ?? null
}

