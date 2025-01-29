from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from src.services.auth_service import authenticate_user, create_access_token, get_current_user

router = APIRouter()

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        return {"error": "Invalid credentials"}
    token = create_access_token({"sub": user["username"]})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/protected-route")
async def protected_route(user: str = Depends(get_current_user)):
    return {"message": f"Hello {user}, you're authorized!"}
