import os
import requests

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

# booking-com15 API (отели)
def search_hotels(city: str, checkin: str, checkout: str, budget: int):
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

# OpenAI GPT-4 (парсинг запроса)
def parse_user_query(query: str):
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
    try:
        content = result["choices"][0]["message"]["content"]
        return eval(content) if isinstance(content, str) else content
    except Exception:
        return {}

async def plan_trip_service(query: str):
    parsed = parse_user_query(query)
    city = parsed.get("city", "Moscow")
    checkin = parsed.get("checkin", "2024-06-01")
    checkout = parsed.get("checkout", "2024-06-07")
    budget = int(parsed.get("budget", 100000))
    hotels = search_hotels(city, checkin, checkout, budget)
    return {"plan": {"city": city, "checkin": checkin, "checkout": checkout, "budget": budget}, "hotels": hotels}
