from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src import crud, models, schemas
from src.db.database import get_db

router = APIRouter(
    prefix="/costs",
    tags=["costs"],
)

@router.post("/", response_model=schemas.CostOfLiving)
def create_cost(cost: schemas.CostOfLivingCreate, db: Session = Depends(get_db)):
    return crud.create_cost(db=db, cost=cost)

@router.get("/{cost_id}", response_model=schemas.CostOfLiving)
def read_cost(cost_id: int, db: Session = Depends(get_db)):
    db_cost = crud.get_cost(db, cost_id=cost_id)
    if db_cost is None:
        raise HTTPException(status_code=404, detail="Cost not found")
    return db_cost

@router.delete("/{cost_id}")
def delete_cost(cost_id: int, db: Session = Depends(get_db)):
    db_cost = crud.delete_cost(db, cost_id=cost_id)
    if db_cost is None:
        raise HTTPException(status_code=404, detail="Cost not found")
    return {"detail": "Cost deleted"}
