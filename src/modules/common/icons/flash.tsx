import React from "react";
import { IconProps } from "types/icon";

const Flash: React.FC<IconProps> = ({
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
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      {...attributes}
    >
      <path 
        d="M9.852 1.031 3 9.5h4l-.985 5.413a.074.074 0 0 0 .073.087.073.073 0 0 0 .06-.03L13 6.5H9l.99-5.414a.077.077 0 0 0-.138-.055Z" 
        fill={fill}
        stroke={stroke}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Flash;