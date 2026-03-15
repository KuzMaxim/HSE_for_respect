import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PromptInput = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (query.trim()) {
      navigate(`/results?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center bg-card rounded-full shadow-sm border border-border px-6 py-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Hotel in Paris for 2 nights under 180 EUR..."
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-base outline-none"
        />
        <button
          onClick={handleSubmit}
          className="ml-3 w-10 h-10 flex items-center justify-center rounded-full bg-foreground hover:bg-primary transition-colors duration-200 flex-shrink-0"
          aria-label="Search"
        >
          <ArrowRight className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>
    </div>
  );
};

export default PromptInput;
