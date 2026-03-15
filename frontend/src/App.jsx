import React, { useState } from "react";
import { planTrip } from "./api";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await planTrip(query);
      setResult(data);
    } catch (err) {
      setError("Ошибка при запросе: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Планировщик путешествий</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Например: Составь мне тур в Сочи на 10-15 июня с бюджетом 50000"
          rows={4}
          style={{ width: "100%" }}
        />
        <button type="submit" disabled={loading || !query.trim()}>
          {loading ? "Запрос..." : "Составить тур"}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {result && (
        <div className="result">
          <h2>План:</h2>
          <pre>{JSON.stringify(result.plan, null, 2)}</pre>
          <h2>Отели:</h2>
          <pre style={{ maxHeight: 300, overflow: "auto" }}>{JSON.stringify(result.hotels, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
