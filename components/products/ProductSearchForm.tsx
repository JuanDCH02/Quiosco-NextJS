'use client'
import { SearchSchema } from "@/src/schema"
import { redirect } from "next/navigation"
import { toast } from "react-toastify"

export default function ProductSearchForm() {

    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }
        const res = SearchSchema.safeParse(data)
        if(!res.success){
            toast.error(res.error.issues[0].message)
        }
        redirect(`/admin/products/search?search=${res.data?.search}`)
    }

    return (
        <form action={handleSearchForm}
            className="flex items-center"
        >
            <input type="text"
                placeholder="buscar producto"
                className="p-2 placeholder-gray-400 w-full bg-white border
                 border-indigo-300 rounded focus:outline-none focus:ring-0"
                name="search"
            />
            <input type="submit"
                placeholder="buscar producto"
                className="bg-indigo-600 p-2 uppercase text-white cursor-pointer
                rounded "
                value='buscar'
            />
        </form>
        
    )
}
