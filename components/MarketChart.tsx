// SVG sparkline chart. Accepts real close-price bars when available; falls
// back to a deterministic, slug-seeded placeholder series so the visual
// shape remains stable when live data is unavailable.

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

function placeholderValues(slug: string, direction: "up" | "down" | "flat", n: number): number[] {
  const rng = lcg(seedFromSlug(slug));
  const drift = direction === "up" ? 0.12 : direction === "down" ? -0.10 : 0.0;
  const out: number[] = [];
  let v = 100;
  for (let i = 0; i < n; i++) {
    v += drift + (rng() - 0.5) * 1.6;
    out.push(v);
  }
  return out;
}

export function MarketChart({
  slug,
  direction,
  data,
  width = 760,
  height = 220,
}: {
  slug: string;
  direction: "up" | "down" | "flat";
  data?: number[];
  width?: number;
  height?: number;
}) {
  const points = 78;
  const values = data && data.length > 5 ? data : placeholderValues(slug, direction, points);

  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = 18;
  const xStep = (width - pad * 2) / Math.max(1, values.length - 1);
  const yScale = (height - pad * 2) / Math.max(0.01, max - min);

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
      aria-label={`Chart for ${slug}`}
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
