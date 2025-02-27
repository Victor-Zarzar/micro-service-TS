from jose import jwt
from jose.exceptions import JWTError
from datetime import datetime, timezone
from fastapi import Depends, HTTPException, status as st
from fastapi.security import (OAuth2PasswordBearer,
                              SecurityScopes)
from pydantic import ValidationError
from src.schemas.auth import TokenPayload
from src.schemas.user import SystemUser
from src.utils.utils import (ALGORITHM,
                                JWT_SECRET_KEY,
                                JWT_REFRESH_SECRET_KEY)
from src.services.user import UserService


reusable_auth = OAuth2PasswordBearer(tokenUrl="/auth/login",
                                     scheme_name="JWT")

async def get_current_user(security_scopes: SecurityScopes,
                           token: Annotated[str, Depends(reusable_auth)]) -> SystemUser:
    if security_scopes.scopes:
        auth_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        auth_value = "Bearer"

    try:

        if await check_if_jwt_exists(token):
            raise HTTPException(detail="Token expirado.",
                                headers={"WWW-Authenticate": auth_value},
                                status_code=st.HTTP_401_UNAUTHORIZED)

        payload = jwt.decode(token,
                             JWT_SECRET_KEY,
                             algorithms=[ALGORITHM])
        token_data = TokenPayload(**payload)
        
        if datetime.fromtimestamp(token_data.exp, timezone.utc) < datetime.now(timezone.utc):
            raise HTTPException(detail="Token expirado.",
                                headers={"WWW-Authenticate": auth_value},
                                status_code=st.HTTP_401_UNAUTHORIZED)

    except (JWTError, ValidationError):
        raise HTTPException(detail="Erro ao validar credenciais.",
                            headers={"WWW-Authenticate": auth_value},
                            status_code=st.HTTP_403_FORBIDDEN)

    service = UserService()
    user = service.get_user_by_email(token_data.sub)
    #user = get_user(token_data.sub)

    if not user:
        raise HTTPException(detail="Usuário não encontrado.",
                            status_code=st.HTTP_404_NOT_FOUND)

    permission = False

    if "admin" in token_data.scopes:
        permission = True
    else:
        for scope in security_scopes.scopes:
            if scope in token_data.scopes:
                permission = True
                break

    if not permission:
        raise HTTPException(detail="Erro de permissão",
                            headers={"WWW-Authenticate": auth_value},
                            status_code=st.HTTP_401_UNAUTHORIZED)

    system_user = SystemUser(**user.dict())
    return system_user

async def get_current_user_refresh(security_scopes: SecurityScopes,
                                   token: Annotated[str, Depends(reusable_auth)]) -> SystemUser:
    if security_scopes.scopes:
        auth_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        auth_value = "Bearer"

    try:

        if await check_if_jwt_exists(token):
            raise HTTPException(detail="Token expirado.",
                                headers={"WWW-Authenticate": auth_value},
                                status_code=st.HTTP_401_UNAUTHORIZED)

        payload = jwt.decode(token,
                             JWT_REFRESH_SECRET_KEY,
                             algorithms=[ALGORITHM])
        token_data = TokenPayload(**payload)
        
        if datetime.fromtimestamp(token_data.exp) < datetime.utcnow():
            raise HTTPException(detail="Token expirado.",
                                headers={"WWW-Authenticate": auth_value},
                                status_code=st.HTTP_401_UNAUTHORIZED)
    except (JWTError, ValidationError):
        raise HTTPException(detail="Erro ao validar credenciais.",
                            headers={"WWW-Authenticate": auth_value},
                            status_code=st.HTTP_403_FORBIDDEN)

    service = UserService()
    user = service.get_user_by_email(token_data.sub)
    #user = get_user(token_data.sub)

    if not user:
        raise HTTPException(detail="Usuário não encontrado.",
                            status_code=st.HTTP_404_NOT_FOUND)

    permission = False

    if "admin" in token_data.scopes:
        permission = True
    else:
        for scope in security_scopes.scopes:
            if scope in token_data.scopes:
                permission = True
                break

    if not permission:
        raise HTTPException(detail="Erro de permissão",
                            headers={"WWW-Authenticate": auth_value},
                            status_code=st.HTTP_401_UNAUTHORIZED)
    
    system_user = SystemUser(**user.dict())

    return system_user 
