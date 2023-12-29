"use client"

import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import SkeletonCartPage from "@modules/skeletons/templates/skeleton-cart-page"
import { useCart, useMeCustomer } from "medusa-react"
import EmptyCartMessage from "../components/empty-cart-message"
import ItemsTemplate from "./items"
import DiscountCode from "@modules/checkout/components/discount-code"
import Summary from "./summary"
import CheckoutButtons from "./checkout-buttons"

const CartTemplate = () => {
  const { cart } = useCart()
  const { customer, isLoading } = useMeCustomer()
  const items = useEnrichedLineItems()

  if (!cart || !cart?.id?.length || isLoading) {
    return <SkeletonCartPage />
  }

  return (
    <div className="py-12">
      <div className="content-container flex justify-center">
        {cart.items.length ? (
          <div className="grid grid-cols-1 w-full xsmall:max-w-[460px] small:max-w-[770px] gap-x-40">
            <h5 className="py-6 h5-mobile-semi">Shopping Bag</h5>
            <div className="flex flex-col gap-y-6">
              <ItemsTemplate region={cart?.region} items={items} />
              <DiscountCode cart={cart} />
            </div>
            <Summary data={cart} />
            <CheckoutButtons customer={customer} />
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
