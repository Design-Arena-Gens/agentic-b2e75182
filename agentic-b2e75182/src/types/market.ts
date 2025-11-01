export interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number | null;
  price_change_percentage_24h_in_currency: number | null;
  price_change_percentage_7d_in_currency: number | null;
  high_24h: number | null;
  low_24h: number | null;
  market_cap: number | null;
  total_volume: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  ath_change_percentage: number | null;
}

export type TradeSignalLabel =
  | "Strong Buy"
  | "Buy"
  | "Hold"
  | "Sell"
  | "Strong Sell";

export type RiskBand = "Low" | "Moderate" | "Elevated" | "High" | "Extreme";

export interface EnrichedSignal {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  high24h: number;
  low24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number | null;
  totalSupply: number | null;
  signal: TradeSignalLabel;
  confidence: number;
  risk: RiskBand;
  momentumScore: number;
  volatilityScore: number;
  valueScore: number;
  narrative: string;
  horizon: "Intraday" | "Swing" | "Position";
  generatedAt: string;
}

export interface MarketResponse {
  timestamp: string;
  coins: EnrichedSignal[];
}
