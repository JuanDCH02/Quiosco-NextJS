'use client'
import { Category } from "@prisma/client"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({category}: CategoryIconProps) {

    const params = useParams<{category:string}>()

    return (
        <div className={`${category.slug === params.category? 'bg-amber-300':''} flex 
        items-center gap-4 p-3 w-full border-t border-gray-200 last-of-type:border-b`}
        >
            <div className="w-16 h-16 relative">
                <Image  src={`/icon_${category.slug}.svg`} 
                    alt="icon-category"
                    fill 
                />
            </div>
            <Link className="text-xl font-bold"
                href={`/order/${category.slug}`}
                >{category.name}
            </Link>

        </div>
    )
}