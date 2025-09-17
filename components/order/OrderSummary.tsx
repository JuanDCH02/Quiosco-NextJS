'use client'
import { useStore } from "@/src/store"


export default function OrderSummary() {

    const {order} = useStore()

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5 ">
            <h1 className="text-4xl text-center font-black">Mi pedido</h1>
            {order.length===0? <p className="text-center my-10">carrito vacio</p> 
                : (
                    <div className="mt-5">
                        <p>carrito lleno</p>
                    </div>
                ) }
        </aside>
    )
}
