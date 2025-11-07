import { useState, useCallback, useMemo } from "react";

export const LogoDemo = ({ type = "domain" }) => {
  const DEFAULT_VALUES = {
    domain: "logo.dev",
    name: "Shopify",
    crypto: "BTC",
    ticker: "AAPL",
  };

  const PLACEHOLDERS = {
    domain: "Enter a domain...",
    name: "Enter a brand name...",
    crypto: "Enter a crypto symbol...",
    ticker: "Enter a stock ticker...",
  };

  const LABELS = {
    domain: "company domain",
    name: "brand name",
    crypto: "cryptocurrency symbol",
    ticker: "stock ticker",
  };

  const [input, setInput] = useState("");
  const [displayValue, setDisplayValue] = useState(DEFAULT_VALUES[type] || DEFAULT_VALUES.domain);
  const [imageError, setImageError] = useState(false);

  // Extract and normalize input based on lookup type
  const normalizeInput = useCallback(
    (value) => {
      if (!value) return "";

      let cleaned = value.trim();

      // For domain type, handle URLs and domains
      if (type === "domain") {
        // Remove protocol if present
        cleaned = cleaned.replace(/^https?:\/\//, "");
        // Remove www. if present
        cleaned = cleaned.replace(/^www\./, "");
        // Remove path and query params
        cleaned = cleaned.split("/")[0].split("?")[0];
        // Basic domain validation - check if it contains a dot
        if (cleaned.includes(".")) {
          return cleaned.toLowerCase();
        }
        // If no dot, assume it's a company name and add .com
        if (cleaned.length > 0) {
          return `${cleaned.toLowerCase()}.com`;
        }
      }

      // For name type, URL encode spaces and special characters
      if (type === "name") {
        return encodeURIComponent(cleaned);
      }

      // For crypto and ticker, just uppercase and trim
      if (type === "crypto" || type === "ticker") {
        return cleaned.toUpperCase();
      }

      return cleaned;
    },
    [type]
  );

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setInput(value);

      const normalized = normalizeInput(value);
      if (normalized) {
        setDisplayValue(normalized);
        setImageError(false);
      } else if (value === "") {
        setDisplayValue(DEFAULT_VALUES[type] || DEFAULT_VALUES.domain);
      }
    },
    [normalizeInput, type]
  );

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // Build URL based on lookup type
  const imageUrl = useMemo(() => {
    const baseUrl = "https://img.logo.dev";
    const token = "live_6a1a28fd-6420-4492-aeb0-b297461d9de2";
    const params = "format=webp&retina=true&size=128";

    if (type === "domain") {
      return `${baseUrl}/${displayValue}?token=${token}&${params}`;
    }

    return `${baseUrl}/${type}/${displayValue}?token=${token}&${params}`;
  }, [displayValue, type]);

  return (
    <div className="not-prose my-8 rounded-2xl border border-zinc-950/10 dark:border-white/10 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 p-8 shadow-sm">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Logo Display */}
        <div
          className="flex justify-center"
          role="img"
          aria-label={`${LABELS[type]} logo preview`}
        >
          <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 inline-flex items-center justify-center">
            <img
              alt={`${displayValue} logo`}
              width="128"
              height="128"
              src={imageUrl}
              onError={handleImageError}
              className="rounded-lg"
              loading="lazy"
              key={displayValue}
            />
          </div>
        </div>
        {/* Search Input */}
        <div className="relative">
          <label htmlFor="logo-input" className="sr-only">
            Enter {LABELS[type]}
          </label>
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            id="logo-input"
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder={PLACEHOLDERS[type] || PLACEHOLDERS.domain}
            aria-describedby={imageError ? "image-error" : undefined}
            className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border border-zinc-950/10 dark:border-white/20 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950/20 dark:focus:ring-white/20 transition-all"
          />
          {imageError && (
            <p id="image-error" className="sr-only">
              Logo not found for {displayValue}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
