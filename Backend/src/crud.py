from sqlalchemy.orm import Session
from . import models, schemas

def get_cost(db: Session, cost_id: int):
    return db.query(models.CostOfLiving).filter(models.CostOfLiving.id == cost_id).first()

def create_cost(db: Session, cost: schemas.CostOfLivingCreate):
    db_cost = models.CostOfLiving(**cost.dict())
    db.add(db_cost)
    db.commit()
    db.refresh(db_cost)
    return db_cost

def delete_cost(db: Session, cost_id: int):
    db_cost = get_cost(db, cost_id)
    if db_cost:
        db.delete(db_cost)
        db.commit()
    return db_cost
