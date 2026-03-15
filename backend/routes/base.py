from fastapi import APIRouter, HTTPException, status, Query
from services.base import *

router = APIRouter()


@router.get("/health", status_code=status.HTTP_200_OK)
async def get_health():
    return {"health": "ok"}