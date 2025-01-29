from typing import Annotated
from fastapi import (Security)

from src.models.entity.user import User
from src.services.auth_service import (get_current_user, get_current_user_refresh)

permission_admin = Annotated[User, Security(get_current_user, scopes=["admin"])]
permission_basic = Annotated[User, Security(get_current_user, scopes=["basic"])]
permission_basic_refresh = Annotated[User, Security(get_current_user_refresh, scopes=["basic"])]