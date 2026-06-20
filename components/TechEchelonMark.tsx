type Props = {
  size?: number;
  className?: string;
};

const BAR_Y = [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43];

export function TechEchelonMark({ size = 36, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 50 50"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="te-mark-clip">
          <circle cx="25" cy="25" r="22.5" />
        </clipPath>
      </defs>
      <g clipPath="url(#te-mark-clip)" fill="currentColor">
        {BAR_Y.map((y) => (
          <rect key={y} x="0" y={y} width="50" height="2.4" />
        ))}
      </g>
    </svg>
  );
}
