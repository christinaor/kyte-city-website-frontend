import { useStore } from "@lib/context/store-context"
import { LineItem, Region } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"
import Link from "next/link"
import Image from "next/image"

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
  type?: "full" | "preview"
}

const Item = ({ item, region, type = "full" }: ItemProps) => {
  const { updateItem, deleteItem } = useStore()
  const { handle } = item.variant.product

  return (
    <div className="flex justify-between gap-4 w-full">
      <div className="flex gap-4 w-full">
        <Link
          href={`/products/${handle}`}
          className={clx("flex", {
            "w-20": type === "preview",
            "xsmall:w-20 w-16": type === "full",
          })}
        >
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </Link>
        <div className="flex flex-col pt-1">
          <p className="p2-mobile-semi xsmall:p2-desktop-semi">{item.title}</p>
          <LineItemUnitPrice item={item} region={region} style="tight" />
        </div>
      </div>
      <div className="flex gap-[11px] px-[4px] py-[5px] min-w-[70px] h-fit border border-solid border-neutral-5 rounded-full pt-1">
        <button onClick={() =>
          updateItem({
            lineId: item.id,
            quantity: item.quantity - 1,
          })}
        >
          <Image
            src="/icons/remove-item.svg"
            alt="remove item icon"
            width="16"
            height="16"
          />
        </button>
        <h6 className="h6-mobile-bold text-neutral-5">{item.quantity}</h6>
        <button onClick={() => updateItem({
            lineId: item.id,
            quantity: item.quantity + 1,
          })}
        >
          <Image
            src="/icons/add-item.svg"
            alt="add item icon"
            width="16"
            height="16"
          />
        </button>
      </div>
    </div>
  )
}

export default Item
