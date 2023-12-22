import { IconProps } from "types/icon"

const MagnifyingGlass: React.FC<IconProps> = ({
  size = "16",
  color = "currentColor",
  stroke = "currentColor",
  fill = "currentColor",
  ...attributes
}) => {
  return (
    <svg 
      width={size}
      height={size}
      viewBox="0 0 16 16" 
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <path 
        d="M8.636 2.5a6.136 6.136 0 1 0 0 12.273 6.136 6.136 0 0 0 0-12.273Z" 
        fill="transparent"
        stroke={stroke}
        strokeMiterlimit="10"
      />
      <path 
        d="M13.214 13.215 17.5 17.5" 
        fill={fill}
        stroke={stroke}
        strokeMiterlimit="10" 
        strokeLinecap="round"  
      />
    </svg>
  )
}

export default MagnifyingGlass