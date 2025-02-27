from sqlalchemy.orm import Session
from src.models.entity.cost_of_living import CostOfLiving
from src.schemas import CostOfLivingCreate

def get_cost(db: Session, cost_id: int) -> CostOfLiving | None:
    return db.query(CostOfLiving).filter(CostOfLiving.id == cost_id).first()

def create_cost(db: Session, cost: CostOfLivingCreate) -> CostOfLiving:
    db_cost = CostOfLiving(**cost.dict())
    db.add(db_cost)
    db.commit()
    db.refresh(db_cost)
    return db_cost

def delete_cost(db: Session, cost_id: int) -> bool:
    db_cost = get_cost(db, cost_id)
    if db_cost:
        db.delete(db_cost)
        db.commit()
        return True
    return False
