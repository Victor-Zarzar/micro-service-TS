from fastapi import FastAPI
from app.routers import costs 

app = FastAPI()

app.include_router(costs.router) 

@app.get("/costs/")
async def read_costs():
    return [{"cost": "Foo"}, {"cost": "Bar"}]

@app.post("/costs/")
async def create_cost(cost: dict):
    return {"cost": cost}

@app.patch("/costs/{cost_id}")
async def update_cost(cost_id: int, cost: dict):
    return {"cost_id": cost_id, "updated_cost": cost}

@app.delete("/costs/{cost_id}")
async def delete_cost(cost_id: int):
    return {"message": f"Cost with id {cost_id} has been deleted."}
