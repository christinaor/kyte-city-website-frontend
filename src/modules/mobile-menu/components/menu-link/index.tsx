import Link from "next/link"

type MenuLinkProps = {
  path: string
  linkText: string
  handleClick: (e: any, ...args: any[]) => void
}

const MenuLink: React.FC<MenuLinkProps> = ({
  path,
  linkText,
  handleClick,
}) => {
  return (
    <button onClick={handleClick}>
      <Link href={path}>
        <p className="sr-only">{`Go to ${linkText} page`}</p>
        <p className="p1-mobile-light capitalize">{linkText}</p>
      </Link>
    </button>
  )
}

export default MenuLink