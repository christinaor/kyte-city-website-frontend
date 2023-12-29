"use client"

import { Customer } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import Link from "next/link"

type CheckoutButtonsProps = {
  customer: Omit<Customer, "password_hash"> | undefined
}

const CheckoutButtons: React.FC<CheckoutButtonsProps> = ({ customer }) => {
  return (
    <div className="flex justify-center gap-4 py-10">
      <div className="flex-1">
        <Link href="/">
          <Button variant={null} className="flex justify-center items-center px-5 py-1 w-full h-10 border-solid border-[1px] rounded-sm border-main-1 bg-secondary-1 whitespace-nowrap caption2-mobile-bold">continue shopping</Button>
        </Link>
      </div>
      {customer 
        ? <div className="flex-1">
          <Link href="/checkout">
            <Button variant={null} className="flex justify-center items-center px-5 py-1 w-full h-10 border-solid border-[1px] rounded-sm border-main-1 bg-main-1 text-main-2 whitespace-nowrap caption2-mobile-bold">go to checkout</Button>
          </Link>
        </div>
        : <div className="flex-1">
          <Link href={`/account/login`} passHref>
            <Button variant={null} className="flex justify-center items-center px-5 py-1 w-full h-10 border-solid border-[1px] rounded-sm border-main-1 bg-main-1 text-main-2 whitespace-nowrap caption2-mobile-bold">sign in to checkout</Button>
          </Link>
        </div>
      }
    </div>
  )
}

export default CheckoutButtons
