import { ProductCollection } from "@medusajs/medusa"
import ProductRail from "./product-rail"

const FeaturedProducts = ({
  collections,
}: {
  collections: ProductCollection[]
}) => {
  return (
    <div className="">
      <ul className="px-5 flex flex-col xsmall:px-20">
        {collections.map((collection) => (
          <li key={collection.id}>
            <ProductRail collection={collection} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FeaturedProducts
