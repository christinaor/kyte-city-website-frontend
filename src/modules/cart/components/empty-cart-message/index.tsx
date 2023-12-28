import Image from "next/image"
import Link from "next/link"

const EmptyCartMessage = () => {
  return (
    <div className="flex flex-col max-w-[770px] min-h-60v">
      <h5 className="py-10 h5-mobile-semi">Shopping Bag</h5>
      <div className="flex flex-col gap-5 items-center">
        <div className="flex justify-center items-center p-[10px] pt-[9px] pb-[11px] border border-warning-3 rounded-full bg-warning-3">
          <Image
            src="/icons/shopping-bag-solid.svg"
            alt="empty shopping bag icon"
            width="40"
            height="40"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <h5 className="text-warning-3 h5-mobile-semi capitalize">your shopping bag is empty</h5>

          <p className="p1-mobile-light">Looks like you have not added anything to your bag.</p>
        </div>
      </div>
      <div className="flex justify-center gap-4 py-10 xsmall:gap-6">
        <Link className="flex justify-center items-center px-5 py-1 max-w-[180px] w-full h-[40px] border-solid border-[1px] rounded-sm border-main-1 bg-secondary-1 whitespace-nowrap" href={`/account/login`} passHref>
          <span className="caption2-mobile-bold uppercase ">sign in</span>
        </Link>
        <Link className="flex justify-center items-center px-5 py-1 max-w-[180px] w-full h-[40px] border border-solid border-main-1 rounded-sm caption2-mobile-bold uppercase whitespace-nowrap  bg-main-1 text-main-2" href={`/`}>
          <span className="caption2-mobile-bold uppercase">continue shopping</span>
        </Link>
      </div>
    </div>
  )
}

export default EmptyCartMessage
