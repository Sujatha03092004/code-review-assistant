# AI Code Review Assistant

An AI-powered code review tool that analyzes your code and provides 
detailed feedback on bugs, quality, and improvements.

## Live Demo
https://code-review-assistant-dun.vercel.app/

## Tech Stack
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Python, FastAPI
- **AI**: Groq API (llama-3.3-70b-versatile)
- **Deployment**: Vercel + Render

## Features
- Paste code or upload files (.py, .js, .ts, .java, .cpp, .go, .rs)
- Automatic language detection from file extension
- Structured review: Bugs, Quality, Suggestions, Summary
- Supports 7 programming languages

## Run Locally

### Backend
cd backend
py -3.11-64 -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

### Frontend
cd frontend
npm install
npm run dev