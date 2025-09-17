'use client'
import { useStore } from "@/src/store"
import ProductDetail from "./ProductDetail"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"


export default function OrderSummary() {

    const {order} = useStore()
    const total = useMemo(()=> order.reduce((total, item) => total + item.subtotal, 0), [order])

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5 ">
            <h1 className="text-4xl text-center font-black">Mi pedido</h1>
            {order.length===0? <p className="text-center my-10">carrito vacio</p> 
                : (
                    <div className="mt-5">
                        {order.map(item => (
                            <ProductDetail
                                key={item.id}
                                item={item}
                            />
                        ))}
                        <p className="text-2xl mt-20 text-center">
                            total a pagar: 
                            <span className="font-bold"> {formatCurrency(total)}</span>
                        </p>
                    </div>
                )}
        </aside>
    )
}
