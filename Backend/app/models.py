from sqlalchemy import Column, Integer, String, Float
from .database import Base

class CostOfLiving(Base):
    __tablename__ = "cost_of_living"
    
    id = Column(Integer, primary_key=True, index=True)
    state = Column(String, index=True)
    city = Column(String, index=True)
    cost = Column(Float)
