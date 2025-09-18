'use server'

import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"


export async function createOrder(data: unknown) {
    //valida con el schema de order
    const res = OrderSchema.safeParse(data)
    if(!res.success){
        return {
            errors: res.error.issues
        }
    }
    //si pasa la validacion pasa a escribir en la tabla de ordenes
    try {
        await prisma.order.create({
            data:{
                name: res.data.name,
                total: res.data.total,
                //tambien crea un registro en la tabla pivote de ordenes y productos
                orderProducts:{
                    create: res.data.order.map(product => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}