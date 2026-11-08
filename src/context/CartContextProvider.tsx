'use client'
import { Cart } from "@/Interface/Cart.t"
import { GetAllCartItem } from "@/services/Cart.services"
import { useSession } from "next-auth/react"
import { createContext, ReactNode, useEffect, useState } from "react"


export const CartContext = createContext()

export default function CartContextProvider({ children }: { children: ReactNode }) {
    const session = useSession()
    const [numCartItem, setNumCartItem] = useState<number>(0)


    useEffect(() => {
        console.log("sessionssss",session);
        
        if (session.status == 'authenticated') {

            getCartData()
        }
    }, [session])

    async function getCartData() {

        const responseData: Cart = await GetAllCartItem()
        console.log(responseData)
        setNumCartItem(responseData.numOfCartItems)
    }
    return (
        <CartContext.Provider value={{ numCartItem, setNumCartItem }}>{children}</CartContext.Provider>
    )
}
