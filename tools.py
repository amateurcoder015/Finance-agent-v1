import yfinance as yf
from ddgs import DDGS
from datetime import datetime, timedelta


def get_stock_data(ticker: str):
    """Get the latest available stock market data for an NSE stock."""

    stock = yf.Ticker(ticker)

    # Use a larger period so the tool can find the
    # most recent trading day even if today's data is unavailable.
    data = stock.history(period="5d")

    if data.empty:
        return f"No stock data found for {ticker}"

    latest = data.iloc[-1]

    return {
        "ticker": ticker,
        "date": str(data.index[-1].date()),
        "open": round(float(latest["Open"]), 2),
        "high": round(float(latest["High"]), 2),
        "low": round(float(latest["Low"]), 2),
        "close": round(float(latest["Close"]), 2),
        "volume": int(latest["Volume"]),
    }

def search_web(query: str, recent_days: int = 7):
    """Search for recent news about a company or financial topic."""

    results = DDGS().news(
        f'"{query}"',
        max_results=8
    )

    cutoff_date = datetime.now().astimezone() - timedelta(days=recent_days)

    cleaned_results = []

    query_words = query.lower().split()

    for result in results:
        article_date = datetime.fromisoformat(
            result["date"].replace("Z", "+00:00")
        )

        text = (
            result["title"] + " " +
            result["body"]
        ).lower()

        # Make sure the article is recent
        if article_date < cutoff_date:
            continue

        # Make sure the article actually mentions the company
        if not all(word in text for word in query_words):
            continue

        cleaned_results.append({
            "date": result["date"],
            "source": result["source"],
            "title": result["title"],
            "summary": result["body"],
            "url": result["url"]
        })

    return cleaned_results

def find_stock_ticker(company_name: str):
    """Find the NSE ticker symbol for a company."""

    search_query = f"{company_name} NSE ticker Yahoo Finance"

    results = DDGS().text(
        search_query,
        max_results=5
    )

    for result in results:
        title = result["title"]
        body = result["body"]

        if "Yahoo Finance" in title and ".NS" in title:
            ticker_start = title.find("(") + 1
            ticker_end = title.find(".NS") + 3

            return title[ticker_start:ticker_end]

    return f"Could not find NSE ticker for {company_name}"


def get_historical_stock_data(ticker: str, period: str = "1mo"):
    """Get historical stock prices for an NSE stock."""

    stock = yf.Ticker(ticker)

    data = stock.history(period=period)

    if data.empty:
        return f"No historical stock data found for {ticker}"

    start_price = float(data["Close"].iloc[0])
    end_price = float(data["Close"].iloc[-1])

    return {
        "ticker": ticker,
        "period": period,
        "start_date": str(data.index[0].date()),
        "end_date": str(data.index[-1].date()),
        "start_price": round(start_price, 2),
        "end_price": round(end_price, 2),
        "return_percent": round(
            ((end_price - start_price) / start_price) * 100,
            2
        ),
    }

def get_stock_fundamentals(ticker: str):
    """Get key fundamental metrics for an NSE stock."""

    stock = yf.Ticker(ticker)

    info = stock.info

    return {
        "ticker": ticker,
        "company_name": info.get("longName"),
        "market_cap": info.get("marketCap"),
        "pe_ratio": info.get("trailingPE"),
        "forward_pe": info.get("forwardPE"),
        "52_week_high": info.get("fiftyTwoWeekHigh"),
        "52_week_low": info.get("fiftyTwoWeekLow"),
        "dividend_yield": info.get("dividendYield"),
        "revenue": info.get("totalRevenue"),
        "profit": info.get("netIncomeToCommon"),
    }

