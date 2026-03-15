import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FlightCard from "@/components/FlightCard";
import HotelCard from "@/components/HotelCard";
import TransferCard from "@/components/TransferCard";
import TripCardSkeleton from "@/components/TripCardSkeleton";

import { planTrip } from "../api";


// Дефолтные значения для fallback
const defaultHotel = {
  name: "No hotel found",
  location: "-",
  price: "-",
  rating: 0,
  features: [],
};
const defaultFlight = {
  date: "-",
  airline: "-",
  price: "-",
};
const defaultTransfer = {
  type: "-",
  price: "-",
};

function parseQuery(q: string) {
  const chips: string[] = [];
  const lower = q.toLowerCase();

  const cities = ["paris", "rome", "istanbul", "vienna", "london", "barcelona", "berlin", "tokyo"];
  for (const city of cities) {
    if (lower.includes(city)) {
      chips.push(city.charAt(0).toUpperCase() + city.slice(1));
      break;
    }
  }

  const guestMatch = q.match(/(\d+)\s*adult/i);
  if (guestMatch) chips.push(`${guestMatch[1]} adults`);

  const budgetMatch = q.match(/(\d+)\s*(eur|usd|\$|€)/i);
  if (budgetMatch) chips.push(`Up to ${budgetMatch[1]} ${budgetMatch[2].toUpperCase()}`);

  const nightMatch = q.match(/(\d+)\s*night/i);
  if (nightMatch) chips.push(`${nightMatch[1]} nights`);

  if (lower.includes("breakfast")) chips.push("Breakfast");
  if (lower.includes("free cancellation")) chips.push("Free cancellation");
  if (lower.includes("center") || lower.includes("centre")) chips.push("City center");
  if (lower.includes("quiet")) chips.push("Quiet");

  return chips.length > 0 ? chips : ["Custom search"];
}

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<any>(null);
  const [hotels, setHotels] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const chips = parseQuery(query);

  useEffect(() => {
    setLoading(true);
    setError("");
    setPlan(null);
    setHotels([]);
    if (!query) {
      setLoading(false);
      return;
    }
    planTrip(query)
      .then((data) => {
        setPlan(data.plan);
        setHotels(data.hotels?.data || []);
      })
      .catch((err) => {
        setError(err.message || "Ошибка запроса");
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 px-6 md:px-12 max-w-6xl mx-auto w-full py-8">
        {/* Back & Edit */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit search
          </button>
        </div>

        {/* Query summary */}
        {query && (
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-3">Search results for</p>
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="text-sm bg-card text-foreground px-4 py-1.5 rounded-full border border-border"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Trip card */}
        {loading ? (
          <div className="rounded-2xl border-2 border-primary bg-background p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TripCardSkeleton />
              <TripCardSkeleton />
              <TripCardSkeleton />
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <div className="rounded-2xl border-2 border-primary bg-background p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="pt-4 md:pt-0">
                <FlightCard {...defaultFlight} />
              </div>
              <div className="pt-4 md:pt-0 md:pl-6">
                <HotelCard {...(hotels[0] ? {
                  name: hotels[0].hotel_name || hotels[0].name || defaultHotel.name,
                  location: hotels[0].address || hotels[0].location || defaultHotel.location,
                  price: hotels[0].price_breakdown?.gross_price ? `€${hotels[0].price_breakdown.gross_price}` : defaultHotel.price,
                  rating: hotels[0].review_score ? Math.round(hotels[0].review_score) : defaultHotel.rating,
                  features: hotels[0].hotel_amenities ? hotels[0].hotel_amenities.map((a:any)=>a.name) : defaultHotel.features,
                } : defaultHotel)} />
              </div>
              <div className="pt-4 md:pt-0 md:pl-6">
                <TransferCard {...defaultTransfer} />
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total estimated</p>
                <p className="text-2xl font-semibold text-foreground">{hotels[0]?.price_breakdown?.gross_price ? `€${hotels[0].price_breakdown.gross_price}` : "-"}</p>
              </div>
              {hotels[0]?.url && (
                <a
                  href={hotels[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground text-sm font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity duration-200"
                >
                  Book now
                </a>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Results;
