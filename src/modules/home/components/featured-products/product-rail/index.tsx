"use client"

import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import { ProductCollection } from "@medusajs/medusa"
import ProductPreview from "@modules/products/components/product-preview"
import { Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"

const ProductRail = ({ collection }: { collection: ProductCollection }) => {
  const { data } = useFeaturedProductsQuery(collection.id)

  return (
    // <div className="max-w-[1440px] w-full mx-auto py-6 border-b border-b-solid border-b-neutral-5">
    // <div>
    <>
      {(data ?? []).length > 0 && (
        <div className="max-w-[1440px] w-full mx-auto py-6 border-b border-b-solid border-b-neutral-5 flex flex-col gap-4 xsmall:py-10">
          <div className="flex justify-between">
            <Text className="h4-mobile-semi text-main-1 capitalize xsmall:h4-desktop-semi">{collection.title}</Text>
            <InteractiveLink href={`/collections/${collection.handle}`}>
              View all
            </InteractiveLink>
          </div>

          <ul className="grid grid-cols-2 xsmall:grid-cols-3 small:grid-cols-4 gap-x-6 gap-y-4">
            {data &&
              data.map((product) => (
                <li key={product.id}>
                  <ProductPreview isFeatured {...product} />
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
    // </div>
  )
}

export default ProductRail
