import os

from src.models.entity.user import User, Scope
from src.config.config import settings
from src.db.database import get_session
from src.utils.utils import get_hashed_password

admin_pass = settings["security"]["api_admin_pass"]

def create_default_values():
    basic = Scope(scope_name="basic") 
    admin = Scope(scope_name="admin")
    user_admin = User(name="admin",
                      email="admin@gmail.com",
                      password=get_hashed_password(admin_pass),
                      scopes=[basic, admin],
                      is_active=True)

    try:
        with get_session() as session:
            session.add_all([basic, admin])
            session.add(user_admin)
            session.commit()
            session.close()

            print("Valores de scopes e user admin adicionados")
    except Exception as err:
        print(f"Erro ao tentar criar scopes {err}")
