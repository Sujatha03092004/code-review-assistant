from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.llm import review_code

router = APIRouter()

class ReviewRequest(BaseModel):
    code: str
    language: str

class ReviewResponse(BaseModel):
    review: str
    language: str

@router.post("/review", response_model = ReviewResponse)
async def get_code_review(request: ReviewRequest):
    if not request.code.strip():
        raise HTTPException(status_code = 400, detail = "Code cannot be empty")
    review = review_code(request.code, request.language)
    return ReviewResponse(review = review, language = request.language)