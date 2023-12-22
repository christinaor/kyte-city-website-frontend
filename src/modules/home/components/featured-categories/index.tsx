"use client"

import { Text } from "@medusajs/ui"
import { useProductCategories } from "medusa-react"
import { ProductCategory } from "@medusajs/medusa"
import CategoryPreview from "./category-preview"

const FeaturedCategories = () => {
  const { product_categories: categories } = useProductCategories()

  return (
    <div className="px-5 pb-10 flex flex-col xsmall:px-20">
      {categories && (
        <div className="">
          <div className="max-w-[1440px] w-full mx-auto py-6 flex flex-col gap-4 small:py-12">
            <Text className="h4-mobile-semi text-main-1 capitalize xsmall:h4-desktop-semi">discover by category</Text>
            <ul className="grid grid-cols-2 xsmall:grid-cols-3 small:grid-cols-4 gap-x-6 gap-y-5">
              {categories.map((category: ProductCategory) => (
                <li key={category.id}>
                  <CategoryPreview 
                    title={category.name}
                    handle={category.handle}
                    size="square"
                    isFeatured
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeaturedCategories
