
import axios from "axios";

const API_URL = "http://localhost:8000";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export async function planTrip(query) {
	try {
		const response = await api.post("/plan", { query });
		return response.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.detail || "Ошибка запроса к серверу"
		);
	}
}
