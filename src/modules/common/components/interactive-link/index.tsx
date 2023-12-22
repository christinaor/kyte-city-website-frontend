import Link from "next/link"
import Image from "next/image"
import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  ...props
}: InteractiveLinkProps) => {
  return (
    <Link
      className="flex gap-x-1 items-center group"
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text className="text-ui-fg-interactive p1-mobile-regular text-neutral-5 xsmall:p1-desktop-regular">{children}</Text>
      {/* <ArrowRightMini
        className="group-hover:rotate-45 ease-in-out duration-150"
        color="var(--fg-interactive)"
      /> */}
      <Image
        src="/icons/chevron-back.svg"
        alt="view all icon"
        width="12"
        height="12"
      />
    </Link>
  )
}

export default InteractiveLink
