"use client"

import Image from "next/image"
import Flash from "@modules/common/icons/flash"

const KeyFeatures = () => {
  return (
    <section className="flex justify-between items-center gap-10 p-4 min-h-[48px] bg-primary-5 xsmall:px-20 xsmall:py-8">
      <div className="flex items-center gap-2">
        <Flash
          size={16}
          stroke="#F7F4F2"
          fill="#F7F4F2"
          className="shrink-0"
        />
        <p className="p2-mobile-light text-secondary-1 xsmall:p2-desktop-light">Instant Delivery</p>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/group.svg"
          alt="group icon"
          width="16"
          height="16"
          className="shrink-0"
        />
        <p className="p2-mobile-light text-secondary-1 xsmall:p2-desktop-light">Cutting-edge Technology</p>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/diamond.svg"
          alt="diamond icon"
          width="16"
          height="16"
          className="shrink-0"
        />
        <p className="p2-mobile-light text-secondary-1 xsmall:p2-desktop-light">Premium Products</p>
      </div>
    </section>
  );
};

export default KeyFeatures;