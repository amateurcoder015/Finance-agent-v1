from google import genai
from google.genai import types
import os

from tools import (
    get_stock_data,
    search_web,
    find_stock_ticker,
    get_historical_stock_data
)

#export GEMINI_API_KEY="YOUR_API_KEY_HERE"
#echo $GEMINI_API_KEY

client = genai.Client(
    api_key=os.environ["GEMINI_API_KEY"]
)


tools = [
    get_stock_data,
    search_web,
    find_stock_ticker,
    get_historical_stock_data
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

3. find_stock_ticker
   - Use this when you need to convert a company name into its NSE ticker.
   - For example, "Larsen & Toubro" may return "LT.NS".
   - Use this before get_stock_data when the user provides a company
     name but you do not already know its NSE ticker.
    
4. get_historical_stock_data
   - Use this when the user asks about stock performance over a
     period of time.
   - It can retrieve historical performance for periods such as:
     1mo, 3mo, 6mo, 1y, 2y, 5y.
   - It returns the starting price, ending price, and percentage return.
   - Use find_stock_ticker first if you need to identify the NSE ticker.

Decide which tools are necessary to answer the user's question.

You may use one or both tools.

Tool selection rules:
- If the user provides a company name and you need its stock data,
  use find_stock_ticker first to identify the NSE ticker.

- After finding the ticker, use get_stock_data to retrieve its market data.

- If the user asks how a stock performed over a historical period,
  use get_historical_stock_data.

- Translate common time periods into the tool's period parameter:
  "last month" -> "1mo"
  "3 months" -> "3mo"
  "6 months" -> "6mo"
  "last year" -> "1y"
  "2 years" -> "2y"
  "5 years" -> "5y"

- If the user asks for current data AND historical performance,
  use both get_stock_data and get_historical_stock_data.

- If the user asks about current/latest/recent stock price or market
  data, you MUST use get_stock_data.

- If the user asks about latest/recent/today/this week news,
  announcements, events, or developments, you MUST use search_web.

- If the user asks for both stock data AND recent/latest news,
  you MUST use BOTH get_stock_data AND search_web.



Do not answer a news request using only your general knowledge.
Use search_web to obtain the recent information.

When you use search_web:
- Use the article title, source, date, and URL returned by the tool.
- Include the source name and publication date for each news item.
- Include the URL so the user can inspect the original article.
- Do not invent sources, dates, titles, or URLs.
- Do not present older information as recent.

When analyzing news:

- First state what the article actually reports.
- Then explain why that development may matter to the company.
- Clearly distinguish reported facts from your own analysis.
- Do not invent details that are not present in the tool results.
- If multiple sources report the same event, combine them rather than
  presenting the same event repeatedly.

When analyzing stock data:
For recent news, use this format:

### Recent News

**1. [Article Title]**
- [Brief explanation of the news and why it matters]
- **Source:** [Source]
- **Date:** [Publication date]
- **URL:** [URL]

When analyzing news:

After gathering the information, provide a clear explanation
for a beginner.

When presenting historical performance, use this format:

### Historical Performance

- **Period:** [period]
- **Starting Price:** ₹[price]
- **Ending Price:** ₹[price]
- **Return:** [percentage]%
- **Period:** [start date] to [end date]

Explain what the return means for a beginner.

Do not give a buy or sell recommendation.

Do not give a buy or sell recommendation.
"""


chat = client.chats.create(
    model="gemini-3.5-flash-lite",
    config=types.GenerateContentConfig(
        tools=tools
    )
)

response = chat.send_message(prompt)


print("\n--- Finance Agent ---\n")
print(response.text)