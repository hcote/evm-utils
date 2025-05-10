interface IcoCloseProps {
  color?: string;
  size?: number;
  className?: string;
}

const IcoClose: React.FC<IcoCloseProps> = ({
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
    className={`lucide lucide-x-icon ${className}`}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default IcoClose;
