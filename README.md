# AI Code Review Assistant

AI-powered code review tool available as a **VS Code Extension** and **Web App**.
Select any code, right-click → "Review with AI" to get instant feedback.

## Live Demo
[Web App](https://code-review-assistant-dun.vercel.app)

## Architecture
One backend, three clients:
- VS Code Extension → in-editor reviews
- Next.js Web App → browser-based reviews  
- FastAPI Backend → deployed on Render

## Features
- Select code or upload files (.py .js .ts .java .cpp .go .rs)
- Auto-detects language from file extension
- Structured review: Bugs, Quality, Suggestions, Summary
- Powered by LLaMA 3.3 70B via Groq API (free)

## Tech Stack
| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Next.js + TypeScript + Tailwind CSS |
| Backend    | Python + FastAPI + Uvicorn          |
| AI         | Groq API — LLaMA 3.3 70B Versatile  |
| Extension  | VS Code API + TypeScript            |
| Deployment | Vercel + Render                     |

## Run Locally

### Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

### Frontend
cd frontend
npm install
npm run dev

### Extension
npm install
npm run compile
Press F5 in VS Code