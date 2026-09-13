from google import genai
import yfinance as yf
import os

# Connect to Gemini
client = genai.Client(
    api_key=os.environ["GEMINI_API_KEY"]
)

# Ask the user for a stock
company = input(
    "Enter the NSE stock symbol (e.g. RELIANCE, TCS, INFY): "
)

ticker = company.upper() + ".NS"

# Get stock data
stock = yf.Ticker(ticker)
data = stock.history(period="1d")

# Make sure we actually received data
if data.empty:
    print("Could not find stock data. Check the ticker symbol.")
    exit()

latest = data.iloc[-1]

stock_data = f"""
Stock: {company.upper()}

Open: ₹{latest['Open']:.2f}
High: ₹{latest['High']:.2f}
Low: ₹{latest['Low']:.2f}
Close: ₹{latest['Close']:.2f}
Volume: {latest['Volume']}
"""

# Send the financial data to Gemini
prompt = f"""
You are a financial education assistant.

Here is the latest market data for {company.upper()}:

{stock_data}

Explain this data to a beginner.

Explain:
1. What the Open price means
2. What the High means
3. What the Low means
4. What the Close means
5. What Volume means

Do not give a buy or sell recommendation.
"""

response = client.models.generate_content(
    model="gemini-3.6-flash",
    contents=prompt
)

print("\n--- Gemini's Analysis ---\n")
print(response.text)