from typing import Optional, List
from sqlalchemy.exc import NoResultFound
from pydantic import BaseModel, validator
from fastapi import HTTPException, status as st
from sqlmodel import select, Field

from src.utils.utils import is_email_valid
from src.db.database import get_session
from src.models.entity.user import Scope, User

class ScopeIn(BaseModel):
    scope_name: str

    @validator("scope_name")
    def validate_scope_name(cls, v, field):
        try:
            with get_session() as session:
                query = select(Scope).where(Scope.scope_name == v)
                res = session.exec(query)
                scope = res.one()
                session.close()
                if scope:
                    raise HTTPException(detail=f"Scope {v} existente no banco de dados.",
                                        status_code=st.HTTP_400_BAD_REQUEST)
        except NoResultFound:
            return v

class ScopeOut(BaseModel):
    id: int
    scope_name: str

class UserIn(BaseModel):
    name: str
    email: Optional[str]
    password: Optional[str]

    @validator("email")
    def validate_email(cls, v, field):
        if not is_email_valid(v):
            raise HTTPException(detail="Campo e-mail deve conter um e-mail válido.",
                                status_code=st.HTTP_400_BAD_REQUEST)
        
        try:
            with get_session() as session:
                query = select(User).where(User.email == v)
                res = session.exec(query)
                user = res.one()
                session.close()

                if user:
                    raise HTTPException(detail=f"E-mail existente.",
                                        status_code=st.HTTP_400_BAD_REQUEST)
        except NoResultFound:
            return v

class UserInAdmin(UserIn):
    is_active: Optional[bool]
    scopes: list[str]

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    password: str
    is_active: bool

class UserOutAdmin(UserOut):
    scopes: List[ScopeOut] = []

class UserAuth(BaseModel):
    email: str = Field(..., description="E-mail do usuário.")
    password: str = Field(..., description="Senha do usuário.")

class SystemUser(UserOut):
    password: str
