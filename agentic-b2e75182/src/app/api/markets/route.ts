import { NextResponse } from "next/server";

import { buildSignal } from "@/lib/signalEngine";
import type { MarketCoin, MarketResponse } from "@/types/market";

const COINGECKO_ENDPOINT =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h,24h,7d&sparkline=false";

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 25;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limitParam = Number(url.searchParams.get("limit") ?? DEFAULT_LIMIT);
  const limit = Number.isNaN(limitParam)
    ? DEFAULT_LIMIT
    : Math.max(1, Math.min(limitParam, MAX_LIMIT));

  try {
    const response = await fetch(`${COINGECKO_ENDPOINT}&per_page=${limit}&page=1`, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      throw new Error(`Upstream error ${response.status}`);
    }

    const payload: MarketCoin[] = await response.json();
    const timestamp = new Date().toISOString();
    const coins = payload.map((coin) => buildSignal(coin, timestamp));

    const result: MarketResponse = {
      timestamp,
      coins,
    };

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, max-age=30",
      },
    });
  } catch (error) {
    console.error("Failed to fetch market data", error);
    return NextResponse.json(
      {
        error: "Unable to compile market signals right now. Please retry shortly.",
      },
      { status: 502 }
    );
  }
}
