from google import genai
from google.genai import types
import os

from tools import get_stock_data


client = genai.Client(
    api_key=os.environ["GEMINI_API_KEY"]
)


# Give Gemini access to our function
tools = [
    get_stock_data
]


response = client.models.generate_content(
    model="gemini-3.6-flash",
    contents="Use the stock data tool to get the latest data for RELIANCE.NS.",
    config=types.GenerateContentConfig(
        tools=tools
    )
)


print(response)