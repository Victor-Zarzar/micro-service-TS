from fastapi import FastAPI
from src.api.routers import auth
from src.api.routers import costs

app = FastAPI()

app.include_router(costs.router, prefix="/costs", tags=["Costs"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
