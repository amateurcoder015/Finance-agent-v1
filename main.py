from google import genai
from google.genai import types
import os

from tools import get_stock_data, search_web


client = genai.Client(
    api_key=os.environ["GEMINI_API_KEY"]
)


tools = [
    get_stock_data,
    search_web
]


question = input("What would you like to know about a stock? ")


prompt = f"""
You are a financial research assistant focused on Indian stocks.

The user asked:

"{question}"

You have access to two tools:

1. get_stock_data
   - Use this when you need current or recent stock market data.
   - It requires an NSE ticker such as RELIANCE.NS or TCS.NS.

2. search_web
   - Use this when you need recent news, announcements, events,
     or other information from the web.

Common NSE ticker mappings:

Reliance Industries -> RELIANCE.NS
Tata Consultancy Services -> TCS.NS
Infosys -> INFY.NS
HDFC Bank -> HDFCBANK.NS
ICICI Bank -> ICICIBANK.NS
Tata Motors -> TATAMOTORS.NS
ITC -> ITC.NS
State Bank of India -> SBIN.NS

Decide which tools are necessary to answer the user's question.

You may use one or both tools.

After gathering the information, provide a clear explanation
for a beginner.

Do not give a buy or sell recommendation.
"""


response = client.models.generate_content(
    model="gemini-3.6-flash",
    contents=prompt,
    config=types.GenerateContentConfig(
        tools=tools
    )
)


print("\n--- Finance Agent ---\n")
print(response.text)