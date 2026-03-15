import { useNavigate } from "react-router-dom";

const examples = [
  "Hotel in Rome for 3 nights under 160 EUR",
  "Stay in Istanbul near the center for 2 adults",
  "Quiet hotel in Vienna with breakfast and free cancellation",
];

const ExampleChips = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {examples.map((text) => (
        <button
          key={text}
          onClick={() => navigate(`/results?q=${encodeURIComponent(text)}`)}
          className="text-sm text-muted-foreground bg-card hover:bg-muted px-4 py-2 rounded-full transition-colors duration-200 border border-border"
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export default ExampleChips;
