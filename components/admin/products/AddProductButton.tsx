'use client'

import { useStore } from "@/src/store"
import { Product } from "@prisma/client"

type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({product} : AddProductButtonProps) {

    const {addToOrder} = useStore()
    return (
        <button type="button"
            onClick={()=> addToOrder(product)}
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full 
            mt-5 p-3 uppercase font-bold cursor-pointer"
                >agregar al carrito
        </button>
    )
}
