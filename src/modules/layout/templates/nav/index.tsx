"use client"

import { useMobileMenu } from "@lib/context/mobile-menu-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import Hamburger from "@modules/common/components/hamburger"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import SideMenu from "@modules/layout/components/side-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation";
import Hero from "@modules/home/components/hero"
import SearchInNav from "@modules/layout/components/search-in-nav"
import SearchNavMenu from "@modules/layout/components/search-nav-menu"

const Nav = () => {
  const pathname = usePathname();
  const { 
    toggle,
    screen: [_, setScreen],
  } = useMobileMenu()
  const {
    state: searchModalState,
    close: searchModalClose,
    open: searchModalOpen,
  } = useToggleState()

  const setScreenSearch = () => setScreen("search")

  return (
    <header className="relative duration-200 group">
      {pathname === "/" && (
        <Hero />
      )}
      <div className="absolute top-0 inset-x-0 z-50 px-4 py-3">
        <nav className="flex items-center justify-between w-full h-full">
          {/* <div className="flex-1 basis-0 h-[20px] flex items-center gap-x-4"> */}
          <div className="flex-1 basis-0 flex items-center gap-x-4">
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
            <div className="hidden small:block h-full">
              <SideMenu searchModalOpen={searchModalOpen} />
            </div>

            <Link
              href="/"
            >
              <Image
                src="/images/logo.svg"  // Specify the correct path
                alt="Kyte City Logo Image"
                width="75"
                height="20"
              />
            </Link>
          </div>
          <div className="flex items-center gap-x-3 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && (
                <DesktopSearchModal
                  state={searchModalState}
                  close={searchModalClose}
                  open={searchModalOpen}
                />
              )}
              <Link className="hover:text-ui-fg-base" href="/account">
                Account
              </Link>
            </div>
            {/* <button onClick={() => handleOpenAndClearOverlay(searchStore)}>
              <Image 
                src="/icons/search.svg"
                alt="search icon"
                width="20"
                height="20"
              />
            </button> */}
            {/* <button
            className="bg-gray-50 flex items-center px-4 py-2 gap-x-2 text-ui-fg-muted rounded-rounded"
            onClick={setScreenSearch}
          ></button> */}
            <button className="block small:hidden" onClick={setScreenSearch}>
              <SearchInNav setOpen={toggle} />
            </button>
            {/* <div className="hidden small:block h-full">
              <SearchNavMenu searchModalOpen={searchModalOpen} />
            </div> */}
            <Link
              className="w-[20px] h-[20px] inline-block"
              href="/event"
            >
              <Image 
                src="/icons/location.svg"
                alt="location icon"
                width="20"
                height="20"
              />
            </Link>
            <CartDropdown />
          </div>
        </nav>
        <MobileMenu />
      </div>
    </header>
  )
}

export default Nav
