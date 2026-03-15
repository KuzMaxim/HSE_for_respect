import { Star, MapPin, Building } from "lucide-react";

interface HotelCardProps {
  name: string;
  location: string;
  price: string;
  rating: number;
  features: string[];
}

const HotelCard = ({ name, location, price, rating, features }: HotelCardProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <Building className="w-5 h-5 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Hotel</span>
      </div>
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-medium text-foreground">{name}</h3>
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <MapPin className="w-3.5 h-3.5" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? "text-primary fill-primary" : "text-muted"}`}
            />
          ))}
          <span className="ml-1.5 text-sm text-muted-foreground">{rating}.0</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {features.map((f) => (
            <span key={f} className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {f}
            </span>
          ))}
        </div>
        <div className="pt-2">
          <p className="text-2xl font-semibold text-foreground">{price}</p>
          <p className="text-xs text-muted-foreground">per night</p>
        </div>
      </div>
      <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mt-4">
        View details
      </button>
    </div>
  );
};

export default HotelCard;
