from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.review import router as review_router

app = FastAPI(
    title = "Code Review Assistant",
    description = "AI Powered Code Review API",
    version = "1.0.0"
)

app.add_middleware(CORSMiddleware, allow_origins = ["http://localhost:3000", "https://code-review-assistant-dun.vercel.app/"], allow_credentials = True, allow_methods = ["*"], allow_headers = ["*"], )

app.include_router(review_router, prefix = "/api")

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Code Review Assistant API is running!"}