export function InlineTicker({
  symbol,
  price,
  change,
}: {
  symbol: string;
  price: string;
  change: string;
}) {
  return (
    <span className="inline-block px-1.5 border-[1.5px] border-coral text-coral font-mono text-[12.5px] font-bold tracking-tight mx-1 whitespace-nowrap align-baseline">
      {symbol} ${price} ({change})
    </span>
  );
}
