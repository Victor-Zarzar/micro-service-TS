import secrets
import random
from datetime import datetime, timedelta, timezone
from typing import Union, Any
from jose import jwt
import re
from passlib.context import CryptContext
from src.config.config import settings
from src.models.entity.user import User
from src.models.entity.token import Token 

SECRET_KEY = "your_secret_key_here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 1440
JWT_SECRET_KEY = settings["security"]["jwt_secret_key"]
EMAIL_REGEX = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')

password_context = CryptContext(schemes=['bcrypt'], deprecated="auto")


def get_hashed_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_pass: str) -> bool:
    return password_context.verify(password, hashed_pass)


def create_access_token(subject: Union[str, Any], list_scopes: list[str], expires_delta: int = None) -> str:
    if expires_delta is not None:
        expires_delta = datetime.now(timezone.utc) + expires_delta
    else:
        expires_delta = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode = {
        'exp': expires_delta,
        'sub': str(subject),
        'scopes': list_scopes
    }
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, ALGORITHM)
    return encoded_jwt


def create_refresh_token(subject: Union[str, Any], list_scopes: list[str], expires_delta: int = None) -> str:
    if expires_delta is not None:
        expires_delta = datetime.now(timezone.utc) + expires_delta
    else:
        expires_delta = datetime.now(timezone.utc) + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)

    to_encode = {
        'exp': expires_delta,
        'sub': str(subject),
        'scopes': list_scopes
    }
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, ALGORITHM)
    return encoded_jwt


def generate_token() -> str:
    return secrets.token_urlsafe(64)


def generate_token_passchange() -> str:
    return ''.join([str(random.randint(0, 9)) for _ in range(6)])


async def init_confirmation_process(user: User) -> None:
    """
    Inicia o processo de confirmação de e-mail. Armazena o token no banco de dados
    e aciona a tarefa de envio de e-mail.
    """
    token = generate_token()

    # Armazenar o token no banco de dados
    confirmation_token = Token(user_id=user.id, token=token, type="email_confirmation")
    confirmation_token.save()

    # Enviar e-mail com o token
    from tasks.tasks import send_email
    await send_email(user.email, token)


async def init_changepass_process(user: User) -> None:
    """
    Inicia o processo de troca de senha. Armazena o token no banco de dados
    e aciona a tarefa de envio de e-mail.
    """
    token = generate_token_passchange()

    # Armazenar o token no banco de dados
    pass_change_token = Token(user_id=user.id, token=token, type="password_change")
    pass_change_token.save()

    # Enviar e-mail com o token
    from tasks.tasks import send_email_changepass
    await send_email_changepass(user.email, token)


def is_email_valid(email: str) -> bool:
    if re.fullmatch(EMAIL_REGEX, email):
        domain = email.split("@")[1]
        if domain == 'gmail.com':
            return True
    return False
