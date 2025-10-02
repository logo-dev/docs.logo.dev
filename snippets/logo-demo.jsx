import { useState, useCallback, useMemo } from "react";

export const LogoDemo = () => {
  const [domain, setDomain] = useState("");
  const [displayDomain, setDisplayDomain] = useState("logo.dev");
  const [imageError, setImageError] = useState(false);

  // Extract domain from various inputs (company name, URL, domain)
  const extractDomain = useCallback((input) => {
    if (!input) return "";

    // Remove protocol if present
    let cleaned = input.replace(/^https?:\/\//, "");

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

    return "";
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setDomain(value);

      const extracted = extractDomain(value);
      if (extracted) {
        setDisplayDomain(extracted);
        setImageError(false);
      }
    },
    [extractDomain]
  );

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // Memoize the image URL to prevent unnecessary recalculations
  const imageUrl = useMemo(
    () =>
      `https://img.logo.dev/${displayDomain}?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&format=webp&retina=true&size=128`,
    [displayDomain]
  );

  return (
    <div className="not-prose my-8 rounded-2xl border border-zinc-950/10 dark:border-white/10 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 p-8 shadow-sm">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Logo Display */}
        <div
          className="flex justify-center"
          role="img"
          aria-label="Company logo preview"
        >
          <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 inline-flex items-center justify-center">
            <img
              alt={`${displayDomain} logo`}
              width="128"
              height="128"
              src={imageUrl}
              onError={handleImageError}
              className="rounded-lg"
              loading="lazy"
              key={displayDomain}
            />
          </div>
        </div>
        {/* Search Input */}
        <div className="relative">
          <label htmlFor="domain-input" className="sr-only">
            Enter company domain
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
            id="domain-input"
            type="text"
            value={domain}
            onChange={handleInputChange}
            placeholder="Enter a domain..."
            aria-describedby={imageError ? "image-error" : undefined}
            className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border border-zinc-950/10 dark:border-white/20 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950/20 dark:focus:ring-white/20 transition-all"
          />
          {imageError && (
            <p id="image-error" className="sr-only">
              Logo not found for {displayDomain}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
