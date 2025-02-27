from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.repositories import cost_of_living
from src.schemas import CostOfLiving, CostOfLivingCreate
from src.db.database import get_db
from src.services.auth_service import get_current_user

router = APIRouter()

@router.post("/", response_model=CostOfLiving)
def create_cost(
    cost: CostOfLivingCreate,
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    return cost_of_living.create_cost(db=db, cost=cost)

@router.get("/{cost_id}", response_model=CostOfLiving)
def read_cost(
    cost_id: int,
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    db_cost = cost_of_living.get_cost(db, cost_id=cost_id)
    if db_cost is None:
        raise HTTPException(status_code=404, detail="Cost not found")
    return db_cost

@router.delete("/{cost_id}")
def delete_cost(
    cost_id: int,
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    success = cost_of_living.delete_cost(db, cost_id=cost_id)
    if not success:
        raise HTTPException(status_code=404, detail="Cost not found")
    return {"detail": "Cost deleted"}
