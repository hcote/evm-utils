interface IcoEthereumProps {
  size?: number;
  className?: string;
}

const IcoEthereumRainbow: React.FC<IcoEthereumProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 319.6 533.3"
    className={className}
    fill="none"
    xmlSpace="preserve"
  >
    <path
      d="M159.6,402.5L319.6,302L159.6,533.3V402.5z M183.4,415.6v41.8l51.3-74L183.4,415.6z"
      fill="#5A9DED"
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <path
      d="M175.9,193.8l118.2,66.9l-11.7,20.6l-118.2-66.9L175.9,193.8z"
      fill="#D895D3"
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <path
      d="M159.6,0l159.6,274.6L159.6,375.3V0z M183.1,87.9v244.7l104.2-65.7L183.1,87.9z"
      fill="#FF9C92"
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <path
      d="M160.1,402.5L0,302l160.1,231.3V402.5z M136.3,415.6v41.8l-51.3-74L136.3,415.6z"
      fill="#53D3E0"
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <path
      d="M138.7,196L20.5,262.9l11.7,20.6l118.2-66.9L138.7,196z"
      fill="#A6E275"
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <path
      d="M159.6,0L0,274.6l159.6,100.6V0z M136,87.9v244.7L31.8,266.9L136,87.9z"
      fill="#FFE94D"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

export default IcoEthereumRainbow;
