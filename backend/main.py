from models.database import *
from fastapi import FastAPI
from contextlib import asynccontextmanager
import uvicorn
import asyncio

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


import os
import requests
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any

app = FastAPI(lifespan=lifespan)

# CORS для фронта (MVP: разрешить все)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

class PlanRequest(BaseModel):
    query: str

# Пример функции для вызова booking-com15 API (отели)
def search_hotels(city: str, checkin: str, checkout: str, budget: int) -> Any:
    url = "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels"
    params = {
        "dest_id": city,
        "search_type": "CITY",
        "arrival_date": checkin,
        "departure_date": checkout,
        "price_min": 1,
        "price_max": budget,
        "adults": 2,
        "room_qty": 1
    }
    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "booking-com15.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json()

# Пример функции для вызова OpenAI GPT-4 (парсинг запроса)
def parse_user_query(query: str) -> dict:
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    messages = [
        {"role": "system", "content": "Ты помощник по планированию путешествий. Извлеки город, даты и бюджет из запроса пользователя. Верни JSON с ключами: city, checkin, checkout, budget."},
        {"role": "user", "content": query}
    ]
    data = {
        "model": "gpt-4",
        "messages": messages,
        "max_tokens": 100,
        "temperature": 0.2
    }
    resp = requests.post(url, headers=headers, json=data)
    result = resp.json()
    print(f"OpenAI API Response: {result}")
    try:
        content = result["choices"][0]["message"]["content"]
        return eval(content) if isinstance(content, str) else content
    except Exception:
        return {}


@app.get("/")
async def root():
    return {"message": "Hello World"}


# Импорт и регистрация роутера планирования
from routes.plan import router as plan_router
app.include_router(plan_router)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)