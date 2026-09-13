import yfinance as yf
from ddgs import DDGS
from datetime import datetime, timedelta


def get_stock_data(ticker: str):
    """Get the latest stock market data for an NSE stock."""

    stock = yf.Ticker(ticker)
    data = stock.history(period="1d")

    if data.empty:
        return f"No stock data found for {ticker}"

    latest = data.iloc[-1]

    return {
        "ticker": ticker,
        "open": round(float(latest["Open"]), 2),
        "high": round(float(latest["High"]), 2),
        "low": round(float(latest["Low"]), 2),
        "close": round(float(latest["Close"]), 2),
        "volume": int(latest["Volume"]),
    }



def search_web(query: str, recent_days: int = 7):
    """Search for recent news about a company or financial topic."""

    results = DDGS().news(
        query,
        timelimit=f"{recent_days}d",
        max_results=8
    )

    cutoff_date = datetime.now().astimezone() - timedelta(days=recent_days)

    cleaned_results = []

    for result in results:
        article_date = datetime.fromisoformat(
            result["date"].replace("Z", "+00:00")
        )

        if article_date >= cutoff_date:
            cleaned_results.append({
                "date": result["date"],
                "source": result["source"],
                "title": result["title"],
                "summary": result["body"],
                "url": result["url"]
            })

    return cleaned_results