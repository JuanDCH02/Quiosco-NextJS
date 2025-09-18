'use client'
import { useStore } from "@/src/store"
import ProductDetail from "./ProductDetail"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"


export default function OrderSummary() {

    const {order} = useStore()
    const total = useMemo(()=> order.reduce((total, item) => total + item.subtotal, 0), [order])

    const handleCreateOrder= (formData: FormData)=> {
        console.log(formData.get('name'))
        createOrder()
    }

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5 ">
            <h1 className="text-4xl text-center font-black">Mi pedido</h1>
            {order.length===0? <p className="text-center my-10">pedido vacio</p> 
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
                        <form className="space-y-5 w-full mt-10"
                        action={handleCreateOrder}>
                            <input type="text"
                                placeholder="dinos tu nombre"
                                className="bg-white border border-gray-200 p-2 w-full"
                                name="name"
                            />
                            <input type="submit" value='confirmar pedido'
                                className="py-2 rounded uppercase text-white
                                 bg-black w-full text-center font-bold"
                            />
                        </form>
                    </div>
                )}
        </aside>
)}
