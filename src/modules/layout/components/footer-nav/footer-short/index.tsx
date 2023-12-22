"use client"

import Link from "next/link";
import FooterIcons from "../footer-icons";
import ChevronDown from "@modules/common/icons/chevron-down";
import Logo from "@modules/common/icons/logo";

const FooterShort: React.FC = () => {
  return (
    <div className="w-screen">
      <div className="content-container flex flex-col shrink-0 gap-10 px-4 py-10 w-screen bg-neutral-4 text-primary-1 xsmall:grid xsmall: grid-cols-3 xsmall:grid-rows-2 xsmall:gap-x-2 xsmall:p-20">
        <Logo
          fill="#F0F5FF"
        />

        <div className="grid grid-cols-2 grid-row-2 gap-x-15 gap-y-4 h6-mobile-semi capitalize">
          <Link href="/" className="flex items-center gap-1">
            <h6>our company</h6>
            <ChevronDown
              size={16}
              className=" text-primary-1"
            />
          </Link>

          <Link href="/" className="flex items-center gap-1">
            <h6>company</h6>
            <ChevronDown
              size={16}
              className=" text-primary-1"
            />
          </Link>

          <Link href="/" className="flex items-center gap-1">
            <h6>help & support</h6>
            <ChevronDown
              size={16}
              className=" text-primary-1"
            />
          </Link>

          <Link href="/" className="flex items-center gap-1">
            <h6>contact</h6>
            <ChevronDown
              size={16}
              className=" text-primary-1"
            />
          </Link>
        </div>

        <FooterIcons />
        <p className="micro-mobile-semi uppercase">© {new Date().getFullYear()} kyte dynamics</p>
      </div>
    </div>
  );
};

export default FooterShort;