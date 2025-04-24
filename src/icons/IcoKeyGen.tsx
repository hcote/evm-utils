interface IcoKeyGenProps {
  color?: string;
  size?: number;
  className?: string;
}

const IcoKeyGen: React.FC<IcoKeyGenProps> = ({
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
    className={`lucide lucide-rotate-ccw-key-icon ${className}`}
  >
    <path d="m14.5 9.5 1 1" />
    <path d="m15.5 8.5-4 4" />
    <path d="M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <circle cx="10" cy="14" r="2" />
  </svg>
);

export default IcoKeyGen;
