from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
import uuid
from src.utils.utils import (ALGORITHM, JWT_SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

fake_user_db = {
    "test_user": {
        "username": "test_user",
        "hashed_password": "$2b$12$eIM1xLQL6Rt9jtUB6.OFeuqntSdywIW3GyP5Y1rsJQWOPPeBg/rde",
        "reset_token": None,
        "reset_token_expiry": None 
    }
}

invalid_tokens = set()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=ALGORITHM)

def authenticate_user(username: str, password: str):
    user = fake_user_db.get(username)
    if not user or not verify_password(password, user["hashed_password"]):
        return None
    return user

def get_current_user(token: str = Depends(oauth2_scheme)):
    if token in invalid_tokens:
        raise HTTPException(status_code=401, detail="Invalid token (logged out)")
    
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user = fake_user_db.get(username)

        if username is None or user is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        return user 

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def invalidate_token(token: str):
    invalid_tokens.add(token)

def request_password_reset(email: str):
 
    user = next((u for u in fake_user_db.values() if u["username"] == email), None)
    if user:
        reset_token = str(uuid.uuid4()) 
        user["reset_token"] = reset_token
        user["reset_token_expiry"] = datetime.now(timezone.utc) + timedelta(minutes=15)
        return {"message": "If the email exists, a password reset link has been sent."}
    
    return {"message": "If the email exists, a password reset link has been sent."}

def validate_reset_token(reset_token: str):
    for user in fake_user_db.values():
        if user["reset_token"] == reset_token:
            if user["reset_token_expiry"] and datetime.now(timezone.utc) > user["reset_token_expiry"]:
                raise HTTPException(status_code=400, detail="Expired reset token")
            return user
    raise HTTPException(status_code=400, detail="Invalid reset token")

def reset_password(reset_token: str, new_password: str):
    user = validate_reset_token(reset_token)
    user["hashed_password"] = get_password_hash(new_password)
    user["reset_token"] = None  
    user["reset_token_expiry"] = None
    return {"message": "Password successfully reset"}
