from fastapi import APIRouter, Depends
from src.services.auth_service import (
    request_password_reset, reset_password, validate_reset_token
)

router = APIRouter()

@router.post("/auth/reset-password/{email}")
async def request_reset(email: str):
    request_password_reset(email)
    return {"message": "Password reset email sent"}

@router.post("/auth/validate/confirm/{token}")
async def confirm_reset(token: str, new_password: str):
    if not validate_reset_token(token):
        return {"error": "Invalid or expired token"}

    reset_password(token, new_password)
    return {"message": "Password successfully reset"}
