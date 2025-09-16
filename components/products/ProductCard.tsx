import { formatCurrency } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({product} : ProductCardProps) {
    return (
        <div className="border border-gray-300 bg-white ">

            <Image width={500} height={400}
                src={`/products/${product.image}.jpg`}
                alt={`imagen ${product.name}`}
            />

            <div className="p-5 ">
                <h3 className="text-3xl font-bold">{product.name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatCurrency(product.price) }
                </p>
                <button type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full 
                    mt-5 p-3 uppercase font-bold cursor-pointer"
                    >agregar al carrito
                </button>
            </div>
        </div>
    )
}
