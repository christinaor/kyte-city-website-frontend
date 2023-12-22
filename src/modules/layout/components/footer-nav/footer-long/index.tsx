"use client"

import Image from "next/image";
import Link from "next/link";
import FooterIcons from "../footer-icons";

const FooterLong: React.FC = () => {
  return (
    <div className="w-screen">
      <div className="content-container flex flex-col shrink-0 gap-9 px-4 py-8 min-h-[104px] bg-main-1 text-main-2 xsmall:px-12 xsmall:py-20">

        <Image
          src="/images/logo.svg"  // Specify the correct path
          alt="Kyte City Logo Image"
          width="90"
          height="24"
        />

        <div className="grid grid-cols-2 grid-row-2 gap-4 xsmall:grid-cols-3 small:grid-cols-4">
          <div className="flex flex-col gap-1">
            <h6 className="h6-mobile-semi capitalize">our company</h6>
            <div className="flex flex-col gap-1">
              <Link href="/" className="p1-mobile-light">About us</Link>
              <Link href="/" className="p1-mobile-light">Contact</Link>
              <Link href="/" className="p1-mobile-light">Privacy policy</Link>
              <Link href="/" className="p1-mobile-light">Terms and conditions</Link>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h6 className="h6-mobile-semi capitalize">work with us</h6>
            <div className="flex flex-col gap-1">
              <Link href="/" className="p1-mobile-light">Become and affiliate</Link>
              <Link href="/" className="p1-mobile-light">List your business</Link>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h6 className="h6-mobile-semi capitalize">help & support</h6>
            <div className="flex flex-col gap-1">
              <Link href="/" className="p1-mobile-light">Account details</Link>
              <Link href="/" className="p1-mobile-light">Order history</Link>
              <Link href="/" className="p1-mobile-light">Customer service</Link>
              <Link href="/" className="p1-mobile-light">FAQ</Link>
            </div>
          </div>
        </div>

        <FooterIcons />
        
        <p className="micro-mobile-semi text-secondary-4 uppercase">© {new Date().getFullYear()} kyte dynamics</p>
      </div>
    </div>
  )
}

export default FooterLong;