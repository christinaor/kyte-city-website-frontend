import { Cart, Order } from "@medusajs/medusa"
import { Label, Tooltip } from "@medusajs/ui"
import { InformationCircleSolid } from "@medusajs/icons"
import { formatAmount } from "medusa-react"
import React from "react"

type SummaryProps = {
  data: Omit<Cart, "refundable_amount" | "refunded_total"> | Order
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
  const {
    total,
  } = data

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: data.region,
      includeTaxes: false,
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center gap-3 pt-3">
        <Label className="flex items-center gap-x-1 mb-2 p1-mobile-light text-main-1">
          <span className="p1-mobile-light text-main-1">Delivery Fee</span>
          <Tooltip content="You can add multiple gift cards, but only one discount code.">
            <InformationCircleSolid color="var(--fg-muted)" />
          </Tooltip>
        </Label>
        <span className="text-mobile-light-italic text-neutral-5">Calculated at next step</span>
      </div>

      <div className="flex items-center justify-between p1-mobile-semi mb-2">
        <span>Total</span>
        <span>{getAmount(total)}</span>
      </div>
    </div>
  )
}

export default Summary