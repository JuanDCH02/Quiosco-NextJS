import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";


async function searchProducts(search:string){
    const products = await prisma.product.findMany({
        where: {
            name: { contains: search, mode:'insensitive' }
        },
        include:{ category: true}
    })
    return products
}

export default async function searchPage({searchParams} : {searchParams: {search:string} }) {
    const param = await searchParams
    const products = await searchProducts(param.search)
    console.log(products)
    return (
        <>
            <Heading>
                Resultados de búsqueda:{''}
                <span className="font-medium text-shadow-none">{param.search}</span> 
            </Heading>
            <div className="flex flex-col lg:flex-row lg:justify-end gap-5 ">
                <ProductSearchForm/>
            </div>
            {products.length ? (
                    <ProductTable
                        products={products}
                    />
                ) : <p className="text-center text-lg text-indigo-500 font-bold my-10"
                        >No hay resultados
                    </p>
            }
            
        </>
    )
}
