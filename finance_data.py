import yfinance as yf

stock = yf.Ticker("RELIANCE.NS")

data = stock.history(period="1d")

latest = data.iloc[-1]

print("Reliance Industries")
print("--------------------")
print(f"Open:   ₹{latest['Open']:.2f}")
print(f"High:   ₹{latest['High']:.2f}")
print(f"Low:    ₹{latest['Low']:.2f}")
print(f"Close:  ₹{latest['Close']:.2f}")
print(f"Volume: {latest['Volume']}")