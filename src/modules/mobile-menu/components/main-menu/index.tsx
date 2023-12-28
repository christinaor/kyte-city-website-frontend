import { useAccount } from "@lib/context/account-context"
import { useMobileMenu } from "@lib/context/mobile-menu-context"
// import { useStore } from "@lib/context/store-context"
// import useCountryOptions from "@lib/hooks/use-country-options"
// import ChevronDown from "@modules/common/icons/chevron-down"
import { MagnifyingGlassMini, XMark as X } from "@medusajs/icons"
import { useCollections, useMeCustomer, useProductCategories } from "medusa-react"
// import { ProductCategory } from "@medusajs/medusa"
import Link from "next/link"
import clsx from "clsx"
// import ReactCountryFlag from "react-country-flag"
// import { Heading } from "@medusajs/ui"
import { useState } from "react"
// import { useRouter } from "next/navigation"
import MenuBar from "@modules/common/components/menu-bar"
import MenuLink from "../menu-link"

const MainMenu = () => {
  const { handleLogout } = useAccount()
  const { collections } = useCollections()
  const { product_categories: categories } = useProductCategories()
  const { customer } = useMeCustomer()
  // const { countryCode } = useStore()

  // const router = useRouter();
  // const countries = useCountryOptions()

  const {
    close,
    // screen: [_, setScreen],
  } = useMobileMenu()

  const [currentCategory, setCurrentCategory] = useState("pharmacy");

  const handleLogoutAndClose = () => {
    handleLogout()
    close()
  }

  // const setScreenCountry = () => setScreen("country")
  // const setScreenSearch = () => setScreen("search")

  return (
    <div className="flex flex-col flex-1">
      {/* <div className="flex-1 basis-0 flex justify-end"> */}
        <button onClick={close}>
          <X />
        </button>
      {/* </div> */}

      <div className="space-y-6 flex-1 flex flex-col justify-between py-4">
        <div className="flex flex-col flex-1 border-b-[0.5px] border-solid border-neutral-5 text-large-regular text-gray-900">
          <div className="flex flex-col gap-y-2 p-4">
            <ul className="flex flex-wrap gap-6">
              {categories ? (
                <>
                  {categories?.map((category) => (
                    <button 
                      key={`menu-categories-${category.handle}`}
                      className={clsx({
                        ["border-b-2 border-b-main-1 rounded-sm"]: category.handle === currentCategory,
                        ["border-b-2 border-b-transparent rounded-sm"]: category.handle !== currentCategory
                      })}
                      onClick={() => setCurrentCategory(category.handle)}
                    >
                      <p className={clsx({
                        ["pb-1 caption2-mobile-extrabold text-main-1"]: category.handle === currentCategory,
                        ["pb-1 caption2-mobile-bold text-secondary-5"]: category.handle !== currentCategory
                      })}>
                        {category.name}
                      </p>
                    </button>
                  ))}
                </>
              ) : null}
            </ul>
          </div>
        </div>

        {/* <div className="flex flex-col">
          <div className="flex flex-col gap-y-8 text-small-regular">
            {!customer ? (
              <div className="flex flex-col gap-y-4 ">
                <span className="text-gray-700 uppercase">Account</span>
                <Link href={`/account/login`} passHref>
                  <button
                    className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
                    onClick={close}
                  >
                    <span className="sr-only">Go to sign in page</span>
                    <span className="normal-case">Sign in</span>
                    <ChevronDown className="-rotate-90" />
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-y-4">
                <span className="text-gray-700 uppercase">Signed in as</span>
                <Link href={`/account`} passHref>
                  <button
                    className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
                    onClick={close}
                  >
                    <span className="sr-only">Go to account page</span>
                    <span className="normal-case">{customer.email}</span>
                    <ChevronDown className="-rotate-90" />
                  </button>
                </Link>
              </div>
            )} */}

            {/* <div className="flex flex-col gap-y-4">
              <span className="text-gray-700 uppercase">Delivery</span>
              <button
                className="flex items-center justify-between border-b border-gray-200 py-2"
                onClick={setScreenCountry}
              >
                <span className="sr-only">
                  Click to select shipping country
                </span>
                <div className="flex items-center gap-x-2">
                  <ReactCountryFlag countryCode={countryCode || "us"} svg />
                  <span className="normal-case">
                    Shipping to{" "}
                    {countries?.find((c) => c.country === countryCode)?.label}
                  </span>
                </div>
                <ChevronDown className="-rotate-90" />
              </button>
            </div> */}
          {/* </div>
        </div> */}

        {customer && (
          <div className="flex flex-col gap-4 p-4 pt-6 pb-0">
            <button onClick={close}>
              <Link href="/account-settings">
                <MenuBar
                  leftIcon="/icons/account-settings-person.svg"
                  leftAlt="account and settings icon"
                  rightIcon="/icons/arrow-right.svg"
                  rightAlt="go to my account and settings icon"
                  size={16}
                  mainText="account & settings"
                />
              </Link>
            </button>
            <button onClick={close}>
              <Link href="/my-address">
                <MenuBar
                  leftIcon="/icons/location-filled.svg"
                  leftAlt="my addresses icon"
                  rightIcon="/icons/arrow-right.svg"
                  rightAlt="go to my addresses icon"
                  size={16}
                  mainText="my address"
                />
              </Link>
            </button>
            <button onClick={close}>
              <Link href="/my-orders">
                <MenuBar
                  leftIcon="/icons/order.svg"
                  leftAlt="my orders icon"
                  rightIcon="/icons/arrow-right.svg"
                  rightAlt="go to my orders icon"
                  size={16}
                  mainText="my orders"
                />
              </Link>
            </button>
            <button onClick={close}>
              <Link href="/payment-methods">
                <MenuBar
                  leftIcon="/icons/credit-card.svg"
                  leftAlt="payment methods icon"
                  rightIcon="/icons/arrow-right.svg"
                  rightAlt="go to payment methods icon"
                  size={16}
                  mainText="payment methods"
                />
              </Link>
            </button>
            {/* <button onClick={close}>
              <Link href="/refer-a-friend">
                <MenuBar
                  leftIcon={ReferAFriendIcon}
                  leftAlt="refer a friend icon"
                  rightIcon={ArrowRightIcon}
                  rightAlt="go to Refer-A-Friend page icon"
                  size={16}
                  mainText="refer a friend"
                />
              </Link>
            </button> */}
            <button onClick={close}>
              <Link href="/help">
                <MenuBar
                  leftIcon="/icons/help-circle-filled.svg"
                  leftAlt="help icon"
                  rightIcon="/icons/arrow-right.svg"
                  rightAlt="go to help page icon"
                  size={16}
                  mainText="help"
                />
              </Link>
            </button>
          </div>
        )}

        <div className="flex flex-col items-start gap-1 px-4">
          {!customer ? (
            <div className="flex flex-col gap-y-4 ">
              <Link href={`/account/login`} passHref>
                <button
                  onClick={close}
                >
                  <span className="sr-only p1-mobile-light">Go to sign in page</span>
                  <span className="p1-mobile-light capitalize">Sign in</span>
                </button>
              </Link>
            </div>
          ) : (
            <MenuLink
              path="/"
              linkText="Logout"
              handleClick={handleLogoutAndClose}
            />
          )}
          <MenuLink
            path="/about-us"
            linkText="about us"
            handleClick={close}
          />
          <MenuLink
            path="/frequently-asked-questions"
            linkText="FAQs"
            handleClick={close}
          />
          <MenuLink
            path="/careers"
            linkText="careers"
            handleClick={close}
          />
          <MenuLink
            path="/blog"
            linkText="blog"
            handleClick={close}
          />
          <MenuLink
            path="/partner-with-us"
            linkText="become a delivery partner"
            handleClick={close}
          />
        </div>
      </div>
    </div>
  )
}

export default MainMenu
