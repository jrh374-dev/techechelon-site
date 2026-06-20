export interface MarketSymbol {
  slug: string;
  symbol: string;
  name: string;
  kind: "index" | "stock" | "rate" | "fx" | "commodity" | "crypto";
  sector?: string;
  description: string;
  // Snapshot data (placeholders until live data is wired).
  price: string;
  change: string;
  direction: "up" | "down" | "flat";
  open?: string;
  high52?: string;
  low52?: string;
  marketCap?: string;
  pe?: string;
  yieldPct?: string;
  // Free-text aliases used to find related TechEchelon coverage in
  // article titles + excerpts.
  searchTerms: string[];
}

export const MARKETS: MarketSymbol[] = [
  {
    slug: "spx",
    symbol: "S&P 500",
    name: "S&P 500 Index",
    kind: "index",
    description:
      "A market-cap-weighted index of 500 large-cap U.S. equities, widely treated as the benchmark for U.S. stock market performance.",
    price: "5,847.12",
    change: "+0.41%",
    direction: "up",
    open: "5,823.84",
    high52: "6,019.45",
    low52: "4,938.32",
    searchTerms: ["S&P", "S&P 500", "SPX", "broad market"],
  },
  {
    slug: "ndx",
    symbol: "NASDAQ",
    name: "NASDAQ Composite",
    kind: "index",
    description:
      "Index of more than 3,000 common equities listed on the Nasdaq stock exchange, weighted heavily toward technology.",
    price: "19,236.40",
    change: "+0.62%",
    direction: "up",
    open: "19,118.22",
    high52: "20,012.10",
    low52: "15,983.40",
    searchTerms: ["Nasdaq", "NDX", "tech index"],
  },
  {
    slug: "dji",
    symbol: "DOW",
    name: "Dow Jones Industrial Average",
    kind: "index",
    description:
      "A price-weighted index of 30 prominent U.S. companies, one of the oldest stock indices still tracked.",
    price: "42,118.04",
    change: "+0.18%",
    direction: "up",
    open: "42,042.51",
    high52: "43,206.78",
    low52: "37,488.20",
    searchTerms: ["Dow", "Dow Jones", "DJIA"],
  },
  {
    slug: "rut",
    symbol: "R2K",
    name: "Russell 2000",
    kind: "index",
    description:
      "Index of 2,000 small-cap U.S. companies, often watched as a barometer of domestic economic health.",
    price: "2,304.55",
    change: "-0.27%",
    direction: "down",
    open: "2,310.78",
    high52: "2,442.74",
    low52: "1,932.61",
    searchTerms: ["Russell", "Russell 2000", "small cap"],
  },
  {
    slug: "vix",
    symbol: "VIX",
    name: "CBOE Volatility Index",
    kind: "index",
    description:
      "Measures the market's 30-day expectation of S&P 500 volatility, derived from option prices. Known as the 'fear gauge.'",
    price: "13.42",
    change: "-1.84%",
    direction: "down",
    open: "13.67",
    high52: "30.18",
    low52: "11.86",
    searchTerms: ["VIX", "volatility", "fear gauge"],
  },
  {
    slug: "us10y",
    symbol: "US10Y",
    name: "U.S. 10-Year Treasury Yield",
    kind: "rate",
    description:
      "Yield on the benchmark 10-year U.S. Treasury note. Widely watched as a measure of long-term interest rates and risk-free return.",
    price: "4.31%",
    change: "+0.03",
    direction: "up",
    open: "4.28%",
    high52: "4.94%",
    low52: "3.62%",
    yieldPct: "4.31%",
    searchTerms: ["10-year Treasury", "10Y", "treasury yield", "Fed"],
  },
  {
    slug: "dxy",
    symbol: "DXY",
    name: "U.S. Dollar Index",
    kind: "fx",
    description:
      "Measures the U.S. dollar against a basket of six major currencies, weighted heavily toward the euro.",
    price: "104.27",
    change: "-0.12%",
    direction: "down",
    open: "104.40",
    high52: "108.18",
    low52: "100.42",
    searchTerms: ["dollar", "DXY", "dollar index"],
  },
  {
    slug: "gold",
    symbol: "GOLD",
    name: "Gold Futures",
    kind: "commodity",
    description:
      "Front-month COMEX gold futures contract, the benchmark for institutional gold pricing.",
    price: "$2,684.30",
    change: "+0.85%",
    direction: "up",
    open: "$2,661.78",
    high52: "$2,798.40",
    low52: "$2,012.18",
    searchTerms: ["gold", "precious metals"],
  },
  {
    slug: "wti",
    symbol: "WTI",
    name: "WTI Crude Oil",
    kind: "commodity",
    description:
      "Front-month NYMEX West Texas Intermediate crude oil futures, the U.S. benchmark for light sweet crude.",
    price: "$72.18",
    change: "-1.22%",
    direction: "down",
    open: "$73.07",
    high52: "$87.65",
    low52: "$64.20",
    searchTerms: ["WTI", "crude oil", "oil", "energy"],
  },
  {
    slug: "btc",
    symbol: "BTC",
    name: "Bitcoin",
    kind: "crypto",
    description:
      "The largest cryptocurrency by market capitalization. BTC trades 24/7 against the U.S. dollar across global exchanges.",
    price: "$87,420",
    change: "+1.24%",
    direction: "up",
    open: "$86,340",
    high52: "$98,820",
    low52: "$53,440",
    searchTerms: ["Bitcoin", "BTC", "crypto"],
  },
  {
    slug: "eth",
    symbol: "ETH",
    name: "Ethereum",
    kind: "crypto",
    description:
      "The second-largest cryptocurrency, native to the Ethereum smart contract platform.",
    price: "$3,287",
    change: "+2.04%",
    direction: "up",
    open: "$3,222",
    high52: "$4,094",
    low52: "$2,180",
    searchTerms: ["Ethereum", "ETH", "crypto"],
  },
  {
    slug: "nvda",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    kind: "stock",
    sector: "Technology · Semiconductors",
    description:
      "Designs graphics processing units and AI accelerators. The dominant supplier of compute hardware to the AI buildout.",
    price: "$134.82",
    change: "+1.41%",
    direction: "up",
    open: "$132.94",
    high52: "$152.89",
    low52: "$86.62",
    marketCap: "$3.31T",
    pe: "65.4",
    searchTerms: ["Nvidia", "NVDA"],
  },
  {
    slug: "aapl",
    symbol: "AAPL",
    name: "Apple Inc.",
    kind: "stock",
    sector: "Technology · Consumer Electronics",
    description:
      "Designs and sells iPhones, Macs, services, and accessories. Largest U.S. company by market capitalization for much of the past decade.",
    price: "$237.18",
    change: "-0.34%",
    direction: "down",
    open: "$237.99",
    high52: "$260.10",
    low52: "$164.08",
    marketCap: "$3.57T",
    pe: "37.2",
    searchTerms: ["Apple", "AAPL", "iPhone"],
  },
  {
    slug: "msft",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    kind: "stock",
    sector: "Technology · Software",
    description:
      "Cloud, productivity software, and gaming. The largest enterprise software vendor and a primary backer of OpenAI.",
    price: "$448.20",
    change: "+0.62%",
    direction: "up",
    open: "$445.42",
    high52: "$468.35",
    low52: "$385.80",
    marketCap: "$3.32T",
    pe: "35.9",
    searchTerms: ["Microsoft", "MSFT"],
  },
  {
    slug: "googl",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    kind: "stock",
    sector: "Technology · Internet",
    description:
      "Parent company of Google. Search, advertising, cloud, YouTube, and Waymo.",
    price: "$181.04",
    change: "+0.94%",
    direction: "up",
    open: "$179.36",
    high52: "$199.94",
    low52: "$130.66",
    marketCap: "$2.24T",
    pe: "23.8",
    searchTerms: ["Alphabet", "Google", "GOOGL", "GOOG"],
  },
  {
    slug: "tsla",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    kind: "stock",
    sector: "Consumer Discretionary · Automotive",
    description:
      "Designs and sells electric vehicles, energy storage, and solar products. Leader in U.S. EV market share.",
    price: "$418.32",
    change: "-2.15%",
    direction: "down",
    open: "$427.50",
    high52: "$488.54",
    low52: "$138.80",
    marketCap: "$1.34T",
    pe: "108.6",
    searchTerms: ["Tesla", "TSLA", "Musk"],
  },
];

export function getSymbol(slug: string): MarketSymbol | null {
  return MARKETS.find((m) => m.slug === slug.toLowerCase()) ?? null;
}

export function kindLabel(k: MarketSymbol["kind"]): string {
  switch (k) {
    case "index":
      return "Index";
    case "stock":
      return "Equity";
    case "rate":
      return "Rate";
    case "fx":
      return "Currency";
    case "commodity":
      return "Commodity";
    case "crypto":
      return "Cryptocurrency";
  }
}
