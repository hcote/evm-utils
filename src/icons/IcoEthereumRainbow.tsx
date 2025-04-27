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
    viewBox="1259 529 142 215"
    className={className}
    fill="none"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 7,
    }}
  >
    {/* Bottom - Purple2 */}
    <path
      d="M1394.74,693.463L1330.36,604.024L1330.36,654.238L1394.74,693.463Z"
      fill="#C8B2F5"
      stroke="#3441C0"
      strokeWidth="2.27"
      transform="matrix(1.08181,0,0,-1.03277,-108.829,1366.48)"
    />
    {/* Bottom - Yellow2 */}
    <path
      d="M1394.74,693.463L1330.36,604.024L1330.36,654.238L1394.74,693.463Z"
      fill="#EECBC0"
      stroke="#3441C0"
      strokeWidth="2.27"
      transform="matrix(-1.08181,0,0,-1.03277,2769.57,1366.48)"
    />
    {/* Top - Blue1 */}
    <path
      d="M1398.61,639.614L1328.95,608.641L1328.95,679.249L1398.61,639.614Z"
      fill="#87A9F0"
      stroke="#3441C0"
      strokeWidth="2.4"
      transform="matrix(-1,0,0,1,2659.32,-0.0263692)"
    />
    {/* Top - Purple1 */}
    <path
      d="M1398.61,639.614L1328.95,608.641L1328.95,679.249L1398.61,639.614Z"
      fill="#CAB3F5"
      stroke="#3441C0"
      strokeWidth="2.4"
      transform="matrix(1,0,0,1,1.41643,-0.0263692)"
    />
    {/* Top - Yellow1 */}
    <path
      d="M1394.74,709.855L1330.36,604.024L1330.36,679.865L1394.74,709.855Z"
      fill="#EECBC0"
      stroke="#3441C0"
      strokeWidth="2.27"
      transform="matrix(-1.08181,0,0,1.03277,2769.57,-93.5314)"
    />
    {/* Top - Green1 */}
    <path
      d="M1394.74,709.855L1330.36,604.024L1330.36,679.865L1394.74,709.855Z"
      fill="#B8FBF6"
      stroke="#3441C0"
      strokeWidth="2.27"
      transform="matrix(1.08181,0,0,1.03277,-108.829,-93.5314)"
    />
  </svg>
);

export default IcoEthereumRainbow;
