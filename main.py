print("Program started!")

from google import genai
import os

print("Creating Gemini client...")

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

print("Sending request to Gemini...")

response = client.models.generate_content(
    model="gemini-3.6-flash",
    contents="Explain what a stock's P/E ratio means to a beginner."
)

print("Gemini responded!")
print(response.text)