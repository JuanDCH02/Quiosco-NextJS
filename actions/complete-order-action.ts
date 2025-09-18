"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { OrderId } from "@/src/schema";
 
export async function completeOrder(orderId: unknown) {
        //obtengo y valido el dato order id
  const parsed = OrderId.safeParse({ orderId });
 
  if (!parsed.success) {
    console.error(parsed.error.issues);
    throw new Error("Order ID inválido");
  }
 
  const { orderId: validOrderId } = parsed.data;
 
  try {
        //cambio el estado de la orden y le agrego la fecha de realizacion
    await prisma.order.update({
      where: { id: validOrderId },
      data: {
        status: true,
        orderReadyAt: new Date(),
      },
    })
      //refetch
    revalidatePath('/admin/orders')
  } catch (e) {
    console.error(e);
    throw new Error("No se pudo completar la orden");
  }
}
