'use server'
import { getMyToken } from "@/lib/getMyToken";


export async function AddProductToCart(id: string) {
    const token = await getMyToken()
    const res = await fetch(`${process.env.BASE_URL}/api/v2/cart`, {
        method: "POST",
        headers: {
            'token': token as string,
            'content-type': "application/json"
        },
        body: JSON.stringify({ productId: id })
    })
    const ResData = await res.json()
    return ResData
}



export async function GetAllCartItem() {
    const token = await getMyToken()
    const res = await fetch(`${process.env.BASE_URL}/api/v2/cart`, {
        headers: {
            'token': token as string
        }
    })
    const ResData = await res.json()

    return ResData
}
export async function DeleteProductItemFromCart(id: string) {
    const token = await getMyToken()
    const res = await fetch(`${process.env.BASE_URL}/api/v2/cart/${id}`, {
        method: "delete",
        headers: {
            token: token as string
        }
    })
    const ResData = await res.json()
    return ResData
}
export async function ClearCart() {
    const token = await getMyToken()
    const res = await fetch(`${process.env.BASE_URL}/api/v2/cart`, {
        method: "delete",
        headers: {
            token: token as string
        }
    })
    const ResData = await res.json()
    return ResData
}

export async function UpdateCartProductCount(count: number, id: string) {
    const token = await getMyToken()
    const res = await fetch(`${process.env.BASE_URL}/api/v2/cart/${id}`, {
        method: "PUT",
        body: JSON.stringify({ count: count }),
        headers: {
            token: token as string,
            'content-type': 'application/json'
        }
    })
    const ResData = await res.json()
    return ResData
}

export async function PaymentOrder(obj, cartID) {
    const token = await getMyToken()
    const orderBody = {
        shippingAddress: obj
    }

    const res = await fetch(`${process.env.BASE_URL}/api/v1/orders/checkout-session/${cartID}?url=https://ecommerce-sun-delta.vercel.app/`, {
        method: "POST",
        body: JSON.stringify(orderBody),
        headers: {
            token: token as string,
            'content-type': 'application/json'
        }
    })
    const ResData = await res.json()
    return ResData
}