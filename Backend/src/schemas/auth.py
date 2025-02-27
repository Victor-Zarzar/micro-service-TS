from pydantic import BaseModel

class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str

class TokenPayload(BaseModel):
    sub: str = None
    exp: int = None
    scopes: list[str] = []

class ChangePass(BaseModel):
    token: str
    email: str
    password: str

class ChangePassLoged(BaseModel):
    old_password: str
    new_password: str
