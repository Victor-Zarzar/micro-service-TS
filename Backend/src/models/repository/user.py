from typing import List
from sqlmodel import Session
from sqlalchemy.exc import NoResultFound, SQLAlchemyError
from sqlalchemy.orm import selectinload
from src.db.database import get_session
from src.schemas.user import UserIn, ScopeIn, UserInAdmin
from src.models.entity.user import User, Scope, UserScopes
from src.utils.utils import get_hashed_password

class UserRepository():

    def __init__(self) -> None:
        pass

    def insert_user(self, user_in: UserIn) -> User:

        session = get_session()

        try:
            user = User(**user_in.dict())
            user.password = get_hashed_password(user.password)

            scope = self.get_scope("basic", session)

            if scope:
                user.scopes.append(scope)

            session.add(user)
            session.commit()
            session.refresh(user)
        except SQLAlchemyError as err:
            print(f"Error adding new user: {err}")
            raise err
        finally:
            session.close()

        return user

    def select_user_by_email(self, email: str) -> User | None:

        session = get_session()

        try:
            user = session.query(User).filter(User.email == email).options(
                selectinload(User.scopes)
            ).first()
        except (SQLAlchemyError, NoResultFound) as err:
            print(f"Error adding new user: {err}")
            raise err
        finally:
            session.close()

        return user

    def select_user_by_id(self, id: int) -> User | None:

        session = get_session()

        try:
            user = session.query(User).filter(User.id == id).options(
                selectinload(User.scopes)
            ).first()
        except (SQLAlchemyError, NoResultFound) as err:
            print(f"Error adding new user: {err}")
            raise err
        finally:
            session.close()

        return user

    def select_all_users(self) -> List[User]:

        session = get_session()

        try:
            users = session.query(User).options(
                selectinload(User.scopes)
            ).all()
        except SQLAlchemyError as err:
            print(f"Error on select all users: {err}")
            raise err
        finally:
            session.close()

        return users

    def update_user(self, id: int, user_in: UserIn) -> User | None:

        session = get_session()

        try:
            user = session.query(User).filter(User.id == id).first()
            data = user_in.dict(exclude_unset=True)

            for key, value in data.items():
                setattr(user, key, value)

            session.add(user)
            session.commit()
            session.refresh(user)
        except (SQLAlchemyError, NoResultFound) as err:
            print(f"Error on update user: {err}")
            raise err
        finally:
            session.close()

        return user

    def update_user_admin(self, id: int, user_in_admin: UserInAdmin) -> User | None:

        session = get_session()

        try:
            data = user_in_admin.dict(exclude_unset=True)
            scopes = data['scopes']

            del data['scopes']
            user_in = UserIn(**data)

            if user_in.password:
                user_in.password = get_hashed_password(user_in.password)

            new_scopes = []
            for scope in scopes:
                new_scopes.append(self.get_scope(scope, session))

            print(new_scopes)
            print(user_in)

            scope_changed = self.change_user_scopes(id, new_scopes, session)

            if scope_changed:
                self.update_user(id, user_in)

            user = self.select_user_by_id(id)
        except (SQLAlchemyError, NoResultFound) as err:
            print(f"Error on update user admin: {err}")
            return None
        finally:
            session.close()

        return user

    def validate_active_user(self, email: str) -> bool:
        
        session = get_session()

        try:
            user = session.query(User).filter(User.email == email).first()
            user.is_active = True

            session.add(user)
            session.commit()
            session.refresh(user)
        except (SQLAlchemyError, NoResultFound) as err:
            print(f"Error on active user: {err}")
            return False
        finally:
            session.close()

        return True

    def change_password_user(self, email: str, password: str) -> bool:

        session = get_session()

        try:
            user = session.query(User).filter(User.email == email).first()
            user.password = get_hashed_password(password)
            session.add(user)
            session.commit()
            session.refresh(user)
        except (SQLAlchemyError, NoResultFound) as err:
            print(f"Error on change user password: {err}")
            return False
        finally:
            session.close()

        return True

    def insert_scope(self, scope_in: ScopeIn) -> Scope:

        session = get_session()

        try:
            scope = Scope(**scope_in.dict())
            session.add(scope)
            session.commit()
            session.refresh(scope)
        except SQLAlchemyError as err:
            print(f"Error on add new scope: {err}")
            raise err
        finally:
            session.close()

        return scope

    def select_scope(self, id: int) -> Scope | None:

        session = get_session()

        try:
            scope = session.query(Scope).filter(Scope.id == id).first()
        except (SQLAlchemyError, NoResultFound) as err:
            print(f"Error on find scope: {err}")
            return None
        finally:
            session.close()

        return scope

    def select_all_scopes(self) -> List[Scope]:

        session = get_session()

        try:
            scopes = session.query(Scope).all()
        except (SQLAlchemyError, NoResultFound) as err:
            print(f"Error on find scope: {err}")
            raise err
        finally:
            session.close()

        return scopes

    def delete_scope(self, id: int) -> bool:

        session = get_session()

        try:
            deleted = session.query(Scope).filter(Scope.id == id).delete()
            session.commit()
        except (SQLAlchemyError, NoResultFound) as err:
            print(f"Error on delete scope: {err}")
            return False
        finally:
            session.close()

        return True if deleted else False

    def change_user_scopes(self, id: int, scopes_in: List[Scope], session: Session) -> bool:

        try:
            deleted = session.query(UserScopes).filter(UserScopes.user_id == id).delete()
            session.commit()
            for scope in scopes_in:
                user_scope = UserScopes(user_id=id, scope_id=scope.id)
                session.add(user_scope)
            session.commit()
        except (SQLAlchemyError, NoResultFound) as err:
            print(f"Err on change user scopes: {err}")
            return False

        return True if deleted else False

    def get_scopes_from_user(self, id: int) -> List[str]:

        session = get_session()

        try:
            user = session.query(User).filter(User.id == id).options(
                selectinload(User.scopes)
            ).first()
        except (SQLAlchemyError, NoResultFound) as err:
            print(f"Error on find scopes from user: {err}")
            raise err
        finally:
            session.close()

        return [scope.scope_name for scope in user.scopes]

    def get_scope(self, scope_name: str, session: Session) -> Scope | None:
        
        try:
            scope = session.query(Scope).filter(Scope.scope_name == scope_name).first()
        except (SQLAlchemyError) as err:
            raise err
        
        return scope
