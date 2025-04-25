import React from "react";

interface IcoChevronDownProps {
  color?: string;
  size?: number;
  className?: string;
}

const IcoChevronDown: React.FC<IcoChevronDownProps> = ({
  color = "currentColor",
  size = 24,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-chevron-down-icon ${className}`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default IcoChevronDown;
