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
    className={`lucide lucide-circle-x-icon ${className}`}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

export default IcoClose;
