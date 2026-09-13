import yfinance as yf

stock = yf.Ticker("RELIANCE.NS")

data = stock.history(period="1d")
latest = data.iloc[-1]

stock_data = f"""
Reliance Industries stock data:

Open: ₹{latest['Open']:.2f}
High: ₹{latest['High']:.2f}
Low: ₹{latest['Low']:.2f}
Close: ₹{latest['Close']:.2f}
Volume: {latest['Volume']}
"""

print(stock_data)