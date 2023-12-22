import clsx from "clsx"
import React from "react"
import Image from "next/image"

type SearchInNavProps = {
  setOpen: () => void
}

const SearchInNav: React.FC<SearchInNavProps> = ({ setOpen }) => {
  return (
    <button className="flex items-center" onClick={setOpen}>
      <Image 
        src="/icons/search.svg"
        alt="search icon"
        width="20"
        height="20"
      />
    </button>
  )
}

export default SearchInNav
