from sqlalchemy.orm import Session
from src.db.database import SessionLocal, Base, engine
from src.models.entity.user import User, Scope
from src.models.entity.cost_of_living import CostOfLiving
from src.utils.utils import get_hashed_password
from src.config.config import settings

def populate_db():
    db: Session = SessionLocal()

    Base.metadata.create_all(bind=engine)
    
    try:
        basic = Scope(scope_name="basic")
        admin = Scope(scope_name="admin")

        admin_user = User(
            name="admin",
            email="admin@gmail.com",
            password=get_hashed_password(settings["security"]["api_admin_pass"]),
            scopes=[basic, admin],
            is_active=True
        )

        cost1 = CostOfLiving(state="SP", city="São Paulo", cost=1500.00)
        cost2 = CostOfLiving(state="RJ", city="Rio de Janeiro", cost=500.00)
      
        db.add_all([basic, admin, admin_user, cost1, cost2])
        db.commit()

        print("Banco de dados populado com sucesso!")

    except Exception as err:
        print(f"Erro ao popular o banco: {err}")
        db.rollback()
    
    finally:
        db.close()

if __name__ == "__main__":
    populate_db()
