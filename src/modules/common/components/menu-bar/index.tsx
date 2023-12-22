import clsx from "clsx"

import Image, { StaticImageData } from "next/image"

type MenuBarProps = {
  leftIcon: StaticImageData | string
  leftAlt: string
  rightIcon: StaticImageData | string
  rightAlt: string
  size: number
  mainText: string | number
  subText?: string | number | null
  styles?: string
}

const MenuBar: React.FC<MenuBarProps> = ({
  leftIcon,
  leftAlt,
  rightIcon,
  rightAlt,
  size,
  mainText,
  subText = "",
  styles,
}) => {

  return (
    <div className={clsx({
      [`py-2 w-full border-b border-neutral-5 ${styles}`]: (!subText),
      [`py-1 w-full border-b border-neutral-5 ${styles}`]: (subText),
    })}>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Image 
            src={leftIcon}
            alt={leftAlt}
            width={size}
            height={size}
          />
          {(subText !== ("" || null || undefined))
            ? <div className="flex flex-col">
              <p className="p1-mobile-semi capitalize">{mainText}</p>
              <p className="text-mobile-light-italic">{subText}</p>
            </div>

            : <p className="p1-mobile-semi capitalize">{mainText}</p>
          }
        </div>

        <Image 
          src={rightIcon}
          alt={rightAlt}
          width={size}
          height={size}
        />
      </div>
    </div>
  );
};

export default MenuBar