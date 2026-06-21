type Props = {
  size?: number;
  className?: string;
};

const BAR_Y = [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43];

// Stable per-size clip id so two marks of different sizes on the same page
// don't collide. When no size is set, we use a name-based id.
function clipIdFor(size?: number): string {
  return `te-mark-clip-${size ?? "css"}`;
}

export function TechEchelonMark({ size, className = "" }: Props) {
  const clipId = clipIdFor(size);
  return (
    <svg
      viewBox="0 0 50 50"
      {...(size !== undefined ? { width: size, height: size } : {})}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="25" cy="25" r="22.5" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`} fill="currentColor">
        {BAR_Y.map((y) => (
          <rect key={y} x="0" y={y} width="50" height="2.4" />
        ))}
      </g>
    </svg>
  );
}
