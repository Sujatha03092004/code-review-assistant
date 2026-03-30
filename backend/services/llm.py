import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def review_code(code: str, language: str) -> str:
    prompt = f"""
    You are an expert code reviewer. Review the following {language} code.
    Provide your review in this exact structure:
    1. BUGS: List any bugs or errors found with line numbers
    2. QUALITY: Comment on code quality and best practices
    3. SUGGESTIONS: Specific improvements with example code
    4. SUMMARY: One paragraph overall assessment
    Code to review:
    {code} """

    response = client.chat.completions.create(
        model = "llama-3.3-70b-versatile",
        messages = [
            {"role": "system", "content": "You are a helpful and precise code reviewer."},
            {"role": "user", "content": prompt}
        ],
        max_tokens = 1024
    )
    return response.choices[0].message.content
