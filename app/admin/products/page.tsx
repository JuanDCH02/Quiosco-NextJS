import ProductsPagination from "@/components/products/ProductsPagination"
import ProductTable from "@/components/products/ProductsTable"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { redirect } from "next/navigation"
import { number } from "zod"

async function ProductCount() {
    return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number){
    const skip = (page - 1) * pageSize
    const products = await prisma.product.findMany({
        take: pageSize,
        skip,
        include: { category:true }
    })
    return products
}
    //infiero el type de mi return en automatico
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({searchParams} : {searchParams: {page:string}}) {

        //recupero la pagina actual de productos, sino encuentra el default es 1
    const params = await searchParams
    const page = params.page ? Number(searchParams.page) : 1;
    const pageSize = 10

    if(page < 0) redirect('/admin/products')

    const productsData = getProducts(page, pageSize )
    const countProductsData = ProductCount()
    const [products, totalProducts] = await Promise.all([productsData,countProductsData ])
    const totalPages = Math.ceil(totalProducts / pageSize) 

    if(page > totalPages) redirect('/admin/products')
    return (
        <>
            <Heading>
                Administrar Productos
            </Heading>
            
            <ProductTable
                products={products}
            />
            
            <ProductsPagination
                page={page}
                totalPages={totalPages}
            />

        </>
    )
}
