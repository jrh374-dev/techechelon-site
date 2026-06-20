// Generates a deterministic, realistic-looking sparkline for a market symbol
// using the symbol's slug as a seed. Swap to live time-series data later.

function seedFromSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function lcg(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return ((s >>> 0) / 0xffffffff);
  };
}

export function MarketChart({
  slug,
  direction,
  width = 760,
  height = 220,
}: {
  slug: string;
  direction: "up" | "down" | "flat";
  width?: number;
  height?: number;
}) {
  const points = 78; // ~3 months of daily closes
  const rng = lcg(seedFromSlug(slug));
  const drift =
    direction === "up" ? 0.12 : direction === "down" ? -0.10 : 0.0;

  const values: number[] = [];
  let v = 100;
  for (let i = 0; i < points; i++) {
    const wobble = (rng() - 0.5) * 1.6;
    v += drift + wobble;
    values.push(v);
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = 18;
  const xStep = (width - pad * 2) / (points - 1);
  const yScale = (height - pad * 2) / (max - min || 1);

  const xy = values.map((val, i) => {
    const x = pad + i * xStep;
    const y = height - pad - (val - min) * yScale;
    return [x, y] as const;
  });

  const linePath = xy
    .map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
    .join(" ");
  const areaPath =
    linePath +
    ` L${xy[xy.length - 1]![0].toFixed(1)},${height - pad} ` +
    `L${xy[0]![0].toFixed(1)},${height - pad} Z`;

  const stroke = direction === "down" ? "#C9402A" : "#15264D";
  const fill = direction === "down" ? "rgba(232,90,44,0.10)" : "rgba(21,38,77,0.10)";

  const gridY = [pad, height / 2, height - pad];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      role="img"
      aria-label={`Sparkline chart for ${slug}`}
    >
      {gridY.map((y, i) => (
        <line
          key={i}
          x1={pad}
          x2={width - pad}
          y1={y}
          y2={y}
          stroke="rgba(10,10,10,0.08)"
          strokeWidth="0.5"
        />
      ))}
      <path d={areaPath} fill={fill} />
      <path d={linePath} fill="none" stroke={stroke} strokeWidth="2" />
      <circle
        cx={xy[xy.length - 1]![0]}
        cy={xy[xy.length - 1]![1]}
        r="4"
        fill={stroke}
      />
    </svg>
  );
}
