from typing import List
from src.schemas.user import ScopeIn, UserIn, UserInAdmin
from src.models.repository.user import UserRepository
from src.models.entity.user import User, Scope

class UserService():

    def __init__(self) -> None:
        self.repository = UserRepository()

    def add_user(self, user_in: UserIn) -> User:
        try:
            return self.repository.insert_user(user_in)
        except Exception as err:
            raise err

    def get_user_by_email(self, email: str) -> User | None:
        try:
            return self.repository.select_user_by_email(email)
        except Exception as err:
            raise err

    def get_user_by_id(self, id: int) -> User | None:
        try:
            return self.repository.select_user_by_id(id)
        except Exception as err:
            raise err

    def get_all_users(self) -> List[User]:
        try:
            return self.repository.select_all_users()
        except Exception as err:
            raise err

    def patch_user(self, id: int, user_in: UserIn) -> User | None:
        try:
            return self.repository.update_user(id, user_in)
        except Exception as err:
            raise err

    def patch_user_admin(self, id: int, user_in: UserInAdmin) -> User | None:
        try:
            return self.repository.update_user_admin(id, user_in)
        except Exception as err:
            raise err

    def validate_active_user(self, email: str) -> bool:
        try:
            return self.repository.validate_active_user(email)
        except Exception as err:
            raise err

    def change_password_user(self, email: str, password: str) -> bool:
        try:
            return self.repository.change_password_user(email, password)
        except Exception as err:
            raise err

    def add_scope(self, scope_in: ScopeIn) -> Scope | None:
        try:
            return self.repository.insert_scope(scope_in)
        except Exception as err:
            raise err

    def get_scope(self, id: int) -> Scope | None:
        try:
            return self.repository.select_scope(id)
        except Exception as err:
            raise err

    def get_all_scopes(self) -> List[Scope]:
        try:
            return self.repository.select_all_scopes()
        except Exception as err:
            raise err

    def delete_scope(self, id: int) -> bool:
        try:
            return self.repository.delete_scope(id)
        except Exception as err:
            raise err

    def change_user_scopes(self, id: int, scopes_in: List[Scope]) -> bool:
        try:
            return self.repository.change_user_scopes(id, scopes_in)
        except Exception as err:
            raise err

    def get_scopes_from_user(self, id: int) -> List[str]:
        try:
            return self.repository.get_scopes_from_user(id)
        except Exception as err:
            raise err

