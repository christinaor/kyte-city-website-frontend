import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import { Text } from "@medusajs/ui"

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
  isFeatured,
}: ProductPreviewType) => (
  <Link href={`/products/${handle}`} className="group">
    <div>
      <Thumbnail thumbnail={thumbnail} size="square" isFeatured={isFeatured} />
      <div className="flex flex-col gap-1 txt-compact-medium mt-1.5 justify-between">
        <Text className="text-ui-fg-subtle h6-mobile-semi capitalize xsmall:h6-desktop-semi">{title}</Text>
        <div className="flex items-center gap-x-2">
          {price ? (
            <>
              {price.price_type === "sale" && (
                <Text className="p1-mobile-light line-through text-ui-fg-muted xsmall:p1-desktop-light">
                  {price.original_price}
                </Text>
              )}
              <Text
                className={clsx("p1-mobile-light text-ui-fg-muted", {
                  "text-ui-fg-interactive": price.price_type === "sale",
                })}
              >
                {price.calculated_price}
              </Text>
            </>
          ) : (
            <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
          )}
        </div>
      </div>
    </div>
  </Link>
)

export default ProductPreview
