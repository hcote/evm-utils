interface IcoDecoderProps {
  color?: string;
  size?: number;
  className?: string;
}

const IcoDecoder: React.FC<IcoDecoderProps> = ({
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
    className={`lucide lucide-search-code-icon ${className}`}
  >
    <path d="m13 13.5 2-2.5-2-2.5" />
    <path d="m21 21-4.3-4.3" />
    <path d="M9 8.5 7 11l2 2.5" />
    <circle cx="11" cy="11" r="8" />
  </svg>
);

export default IcoDecoder;
