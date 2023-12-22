"use client"

import { usePathname } from "next/navigation";
import FooterLong from "./footer-long"
import FooterShort from "./footer-short";

const FooterNav = () => {
  const pathname = usePathname();

  return (
    <>
      {
        pathname.startsWith("/search")
        || pathname === "/product" 
        || pathname === "/"
        // ? <FooterLong />
        // : <div>FooterShort</div>
        ? <FooterLong />
        : <FooterShort />
      }
    </>
  )
}

export default FooterNav
