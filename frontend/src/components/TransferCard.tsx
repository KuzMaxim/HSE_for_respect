import { Car } from "lucide-react";

interface TransferCardProps {
  type: string;
  price: number;
}

const TransferCard = ({ type, price }: TransferCardProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <Car className="w-5 h-5 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Transfer</span>
      </div>
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-medium text-foreground">{type}</h3>
        <p className="text-2xl font-semibold text-foreground">{price}</p>
        <p className="text-xs text-muted-foreground">estimated price</p>
      </div>
      <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mt-4">
        View details
      </button>
    </div>
  );
};

export default TransferCard;
