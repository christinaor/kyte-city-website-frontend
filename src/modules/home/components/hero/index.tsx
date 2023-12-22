"use client"

import Image from "next/image"
import { Button, Heading } from "@medusajs/ui"
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    //   <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
    <div className="h-[60vh] w-full relative bg-ui-bg-subtle xsmall:40vh">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Hero Image"
          fill // for responsive image
          objectFit="cover"  // Adjust the objectFit property as needed
        />
        <div className="inline-flex flex-col shrink-0 justify-center gap-4 pl-4 w-10/12 h-full text-secondary-1 xsmall:pl-16">
          <h2 className="h2-mobile-regular drop-shadow-md text-secondary-1 xsmall:h2-desktop-regular">Be a Part of the Future of Delivery in Los Angeles</h2>
          <p className="p1-mobile-regular max-w-2/3 drop-shadow-md text-main-2 xsmall:p1-desktop-regular">Join Kyte today and experience a whole new level of convenience, speed, and efficiency.</p>
          <Button 
            className="flex flex-col shrink-0 justify-center items-center text-center px-5 py-1 w-min h-8 rounded-sm micro-mobile-bold text-main-1 bg-secondary-2 z-40 whitespace-nowrap" 
            onClick={() => router.push("/shop-by/bestsellers")}
          >
            shop bestsellers
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
