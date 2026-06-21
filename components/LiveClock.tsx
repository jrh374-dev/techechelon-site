"use client";

import { useEffect, useState } from "react";

const FMT = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

function fmt(d: Date): string {
  // Output like "09:42 AM ET"
  return `${FMT.format(d).replace(/\s+/g, " ").toUpperCase()} ET`;
}

export function LiveClock({ initial }: { initial: string }) {
  const [now, setNow] = useState<string>(initial);
  useEffect(() => {
    function tick() {
      setNow(fmt(new Date()));
    }
    tick();
    // align next tick to the top of the next minute so the display flips
    // exactly when the minute changes
    const ms = 60000 - (Date.now() % 60000);
    const t0 = window.setTimeout(() => {
      tick();
      const t1 = window.setInterval(tick, 60000);
      // store on ref isn't needed because the cleanup below catches both
      (window as unknown as { __teClockInterval?: number }).__teClockInterval = t1;
    }, ms);
    return () => {
      window.clearTimeout(t0);
      const t1 = (window as unknown as { __teClockInterval?: number }).__teClockInterval;
      if (t1) window.clearInterval(t1);
    };
  }, []);
  return <span suppressHydrationWarning>{now}</span>;
}
