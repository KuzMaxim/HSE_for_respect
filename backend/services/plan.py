import re, json, os
import requests
from config import GEMINI_API_KEY, RAPID_API_KEY


def parse_hotels(city: str, checkin: str, checkout: str, budget: int):
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
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "booking-com15.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json()

# Поиск отелей через Gemini (LLM)
def search_hotels(city: str, checkin: str, checkout: str, budget: int):
    """
    Использует Google Gemini для генерации списка подходящих отелей по запросу пользователя.
    Возвращает JSON: {"hotels": [{"name": ..., "address": ..., "price": ..., "rating": ..., "features": [...], ...}, ...]}
    """
    url = f"https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    headers = {"Content-Type": "application/json"}
    prompt = (
        f"Найди наиболее подходящий отель в городе {city} на даты с {checkin} по {checkout} с бюджетом до {budget} рублей. "
        "Для этого отеля укажи только эти поля: name (название), location (адрес), price (цена за весь период), rating (от 0 до 5), features (список удобств). "
        "Верни только JSON вида: {\"name\":...,\"location\":...,\"price\":...,\"rating\":...,\"features\":[]}"
    )
    data = {
        "contents": [
            {"parts": [
                {"text": prompt}
            ]}
        ]
    }
    resp = requests.post(url, headers=headers, json=data)
    result = resp.json()
    try:
        text = result["candidates"][0]["content"]["parts"][0]["text"]
        return json.loads(text[7:-3])
    except Exception:
        print("Gemini hotel search error", result["candidates"][0]["content"]["parts"][0]["text"])
        return {}


# Google Gemini (парсинг запроса)
def parse_user_query(query: str):
    url = f"https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    headers = {
        "Content-Type": "application/json"
    }
    prompt = (
        "Ты помощник по планированию путешествий. "
        "Извлеки город, даты и бюджет из запроса пользователя. "
        "Верни только JSON с ключами: city, checkin, checkout, budget. "
        "Пример: {\"city\": \"Москва\", \"checkin\": \"2024-06-01\", \"checkout\": \"2024-06-07\", \"budget\": 100000}"
    )
    data = {
        "contents": [
            {"parts": [
                {"text": prompt + "\nЗапрос пользователя: " + query}
            ]}
        ]
    }
    resp = requests.post(url, headers=headers, json=data)
    result = resp.json()
    try:
        text = result["candidates"][0]["content"]["parts"][0]["text"]
        match = re.search(r"\{[\s\S]*?\}", text)
        if match:
            return json.loads(match.group(0))
        return {}
    except Exception:
        print("Gemini parse error", result)
        return {}


async def plan_trip_service(query: str):
    url = f"https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    headers = {"Content-Type": "application/json"}
    prompt = (
        "Ты помощник по планированию путешествий. "
        "Пользователь вводит запрос на естественном языке, например: 'Составь мне тур в Сочи на 10-15 июня с бюджетом 50000'. "
        "1. Извлеки из запроса город (city), даты (checkin, checkout) и бюджет (budget, число в рублях). "
        "2. Подбери самый подходящий рейс из Москвы в этот город на эти даты с этим бюджетом. "
        "Для этого рейса укажи только эти поля: date, airline, price."
        "3. Подбери самый подходящий отель в этом городе на эти даты с этим бюджетом. "
        "Для этого отеля укажи только эти поля: name (название), location (адрес), price (цена за весь период), rating (от 0 до 5), features (список удобств). "
        "Верни только JSON вида: {\"plan\":{\"city\":...,\"checkin\":...,\"checkout\":...,\"budget\":...}, "
        "\"hotel\": {\"name\":...,\"location\":...,\"price\":...,\"rating\":...,\"features\":[]}, "
        "\"flight\": {\"date\":...,\"airline\":...,\"price\":...}}}"
        "\nЗапрос пользователя: " + query
    )
    data = {
        "contents": [
            {"parts": [
                {"text": prompt}
            ]}
        ]
    }
    resp = requests.post(url, headers=headers, json=data)
    result = resp.json()
    try:
        text = result["candidates"][0]["content"]["parts"][0]["text"]
        return json.loads(text[7:-3])
    except Exception:
        print("Gemini plan_trip_service error", result["candidates"][0]["content"]["parts"][0]["text"])
        return {}
