interface IcoArbitrumProps {
  size?: number;
  className?: string;
}

const IcoArbitrum: React.FC<IcoArbitrumProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 2500 2500"
    className={className}
    fill="none"
  >
    <rect width="2500" height="2500" fill="none" />
    <path
      fill="#213147"
      d="M226 760v980c0 63 33 120 88 152l849 490c54 31 121 31 175 0l849-490c54-31 88-89 88-152V760c0-63-33-120-88-152l-849-490c-54-31-121-31-175 0L314 608c-54 31-87 89-87 152z"
    />
    <path
      fill="#12AAFF"
      d="M1435 1440l-121 332c-3 9-3 19 0 29l208 571 241-139-289-793c-7-18-32-18-39 0zm243-558c-7-18-32-18-39 0l-121 332c-3 9-3 19 0 29l341 935 241-139-422-1157z"
    />
    <path
      fill="#9DCCED"
      d="M1250 155c6 0 12 2 17 5l918 530c11 6 17 18 17 30v1060c0 12-7 24-17 30l-918 530c-5 3-11 5-17 5s-12-2-17-5l-918-530c-11-6-17-18-17-30V719c0-12 7-24 17-30l918-530c5-3 11-5 17-5zm0-155c-33 0-65 8-95 25L237 555c-59 34-95 96-95 164v1060c0 68 36 130 95 164l918 530c29 17 62 25 95 25s65-8 95-25l918-530c59-34 95-96 95-164V719c0-68-36-130-95-164L1344 25c-29-17-62-25-95-25h1z"
    />
    <polygon fill="#213147" points="642,2179 727,1947 897,2088 738,2234" />
    <path
      fill="#FFFFFF"
      d="M1172 644H939c-17 0-33 11-39 27L401 2039l241 139 550-1507c5-14-5-28-19-28zm408 0h-233c-17 0-33 11-39 27L738 2233l241 139 620-1701c5-14-5-28-19-28z"
    />
  </svg>
);

export default IcoArbitrum;
