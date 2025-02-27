from fastapi import FastAPI
from src.api.routers import auth
from src.api.routers import costs
from src.api.routers import user

app = FastAPI()

app.include_router(costs.router, prefix="/costs", tags=["Costs"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(user.router, prefix="/user", tags=["User"])
