interface IcoDataDecoderProps {
  color?: string;
  size?: number;
  className?: string;
}

const IcoDataDecoder: React.FC<IcoDataDecoderProps> = ({
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
    className={`lucide lucide-scan-search-icon ${className}`}
  >
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <circle cx="12" cy="12" r="3" />
    <path d="m16 16-1.9-1.9" />
  </svg>
);

export default IcoDataDecoder;
