from pydantic import BaseModel

class CostOfLivingBase(BaseModel):
    state: str
    city: str
    cost: float

class CostOfLivingCreate(CostOfLivingBase):
    pass

class CostOfLiving(CostOfLivingBase):
    id: int
    
    class Config:
        orm_mode = True