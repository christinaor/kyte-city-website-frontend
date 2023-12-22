import { useMobileMenu } from "@lib/context/mobile-menu-context"
import { searchClient, SEARCH_INDEX_NAME } from "@lib/search-client"
import { MagnifyingGlassMini } from "@medusajs/icons"
import MobileHit from "@modules/search/components/mobile-hit"
import MobileHits from "@modules/search/components/mobile-hits"
import SearchBox from "@modules/search/components/search-box"
import { InstantSearch } from "react-instantsearch-hooks-web"
import Image from "next/image"
import Link from "next/link"
import MagnifyingGlass from "@modules/common/icons/magnifying-glass"
import { POPULAR_SEARCHES as popularSearches, SUGGESTED_SEARCHES as suggestedSearches } from "@lib/constants"

const SearchMenu = () => {
  const {
    close,
  } = useMobileMenu()

  return (
    <InstantSearch searchClient={searchClient} indexName={SEARCH_INDEX_NAME}>
      <div className="flex flex-col flex-1 px-4 py-8">
        <div className="flex items-center justify-between w-full border-b border-gray-200">
          <div className="flex-1 basis-0">
            <div className="flex items-center gap-x-2 pb-2">
              <MagnifyingGlass size={20} />
              <SearchBox close={close} />
            </div>
          </div>
          <div className="flex justify-end ml-4">
            <button
              // onClick={() => setScreen("main")}
              onClick={() => close()}
              className="text-small-semi uppercase"
            >
              Cancel
            </button>
          </div>
        </div>

        {(suggestedSearches?.length > 0 || popularSearches?.length > 0) && (
          <div className="pt-6 grid grid-cols-2">
            {suggestedSearches?.length > 0 && (
              <div className="flex flex-col gap-3">
                <h6 className="h6-mobile-semi capitalize">suggested</h6>
                {suggestedSearches?.map((term) => (
                  <button key={`search-suggested-${term}`} onClick={close} className="self-start">
                    <Link href={`/shop-by/${term.toLowerCase()}`}>
                      <p className="p1-mobile-light capitalize">{term}</p>
                    </Link>
                  </button>
                ))}
              </div>
            )}

            {popularSearches?.length > 0 && (
              <div className="flex flex-col gap-3">
                <h6 className="h6-mobile-semi capitalize">popular search</h6>
                {popularSearches?.map((term) => (
                  <button key={`search-popular-${term}`} onClick={close} className="flex gap-2">
                    <MagnifyingGlass size={16} />
                    <Link href={`/search?searchTerm=${term}`}>
                      <p className="p1-mobile-light capitalize">{term}</p>
                    </Link>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="py-4 px-8">
          <MobileHits hitComponent={MobileHit} />
        </div>
      </div>
    </InstantSearch>
  )
}

export default SearchMenu
