import clsx from "clsx"
import Link from "next/link"
import { CategoryPreviewType } from "types/global"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { CATEGORY_IMAGES as categoryImages } from "@lib/constants"

const CategoryPreview = ({
  title,
  handle,
  size = "small",
  isFeatured,
  className,
}: CategoryPreviewType) => (
  <Link href={`/category/${handle}`} 
    className="group"
  >
    <Container 
      className={clsx(
        "relative w-full overflow-hidden p-0 rounded-none bg-neutral-2 shadow-elevation-card-rest group-hover:shadow-elevation-card-hover transition-shadow ease-in-out duration-150",
        className,
        {
          "aspect-[11/14]": isFeatured,
          "aspect-[9/16]": !isFeatured && size !== "square",
          "aspect-[1/1]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
    >
      <h3 className="absolute top-[16px] left-[16px] w-[5.8125rem] h3-mobile-regular text-main-1 capitalize small:h5-desktop-regular">{title}</h3>
      <Image
        src={(categoryImages[handle]) ? categoryImages[handle] : ""}
        alt={`category image for ${title}`}
        width={64}
        height={0}
        className="absolute right-[11px] bottom-[11px] w-[64px]"
      />
    </Container>
  </Link>
)

export default CategoryPreview
