import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { LineItem, Region } from "@medusajs/medusa"
import clsx from "clsx"
import { formatAmount } from "medusa-react"
import { CalculatedVariant } from "types/medusa"

type LineItemUnitPriceProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
  style?: "default" | "tight"
}

const LineItemUnitPrice = ({
  item,
  region,
  style = "default",
}: LineItemUnitPriceProps) => {
  const originalPrice = (item.variant as CalculatedVariant).original_price
  const hasReducedPrice = (originalPrice * item.quantity || 0) > item.total!
  const reducedPrice = (item.total || 0) / item.quantity!

  return (
    <div className="flex gap-1 text-ui-fg-muted h-full">
      {hasReducedPrice && (
        <>
          <p>
            {style === "default" && (
              <span className="text-ui-fg-muted">Original: </span>
            )}
            <span className="p2-mobile-regular xsmall:p2-desktop-regular text-neutral-3 line-through">
              {formatAmount({
                amount: originalPrice,
                region: region,
                includeTaxes: false,
              })}
            </span>
          </p>
          {style === "default" && (
            <span className="text-ui-fg-interactive">
              -{getPercentageDiff(originalPrice, reducedPrice || 0)}%
            </span>
          )}
        </>
      )}
      <p>
        <span
          className={clsx("p2-mobile-regular xsmall:p2-desktop-regular text-neutral-5",{
            "p2-mobile-regular xsmall:p2-desktop-regular": hasReducedPrice,
          })}
        >
          {formatAmount({
            amount: reducedPrice || item.unit_price || 0,
            region: region,
            includeTaxes: false,
          })}
        </span>
      </p>
    </div>
  )
}

export default LineItemUnitPrice
