'use client'
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button";
import { AddProductToCart } from "@/services/Cart.services";
import toast from "react-hot-toast";
import { useContext } from "react";
import { CartContext } from "@/context/CartContextProvider";

export default function AddProductBtn({ id }: { id: string }) {


    const {setNumCartItem} = useContext(CartContext)
    async function handleAddBtn() {
        const data = await AddProductToCart(id)
        if (data.status == 'success') {
            toast.success(data.message)
            setNumCartItem(data.numOfCartItems)
        }


    }
    return (
        <Button onClick={handleAddBtn} size="icon" className="product-add-button"><Plus size={18} /></Button>
    )
}
