from google import genai
import yfinance as yf
import os

# Connect to Gemini
client = genai.Client(
    api_key=os.environ["GEMINI_API_KEY"]
)

# Get Reliance stock data
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

# Give the data to Gemini
prompt = f"""
You are a financial education assistant.

Here is the latest stock data for Reliance Industries:

{stock_data}

Explain this data to a beginner.
Explain what today's Open, High, Low, Close and Volume mean.
Do not give a buy or sell recommendation.
"""

response = client.models.generate_content(
    model="gemini-3.6-flash",
    contents=prompt
)

print(response.text)