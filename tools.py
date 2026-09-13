import yfinance as yf


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

if __name__ == "__main__":
    result = get_stock_data("RELIANCE.NS")
    print(result)