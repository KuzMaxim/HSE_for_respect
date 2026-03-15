from fastapi import APIRouter
from pydantic import BaseModel
from services.plan import plan_trip_service

router = APIRouter()

class PlanRequest(BaseModel):
    query: str

@router.post("/plan")
async def plan_trip(req: PlanRequest):
    return await plan_trip_service(req.query)
