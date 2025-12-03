export const PromptBanner = ({
  prompt,
  message = "Use this pre-built prompt to get started faster.",
}) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [prompt]);

  const handleOpenInCursor = useCallback(() => {
    // Cursor Deeplink https://cursor.com/docs/integrations/deeplinks
    const encoded = encodeURIComponent(prompt).replace(/%20/g, "+");
    const url = `cursor://anysphere.cursor-deeplink/prompt?text=${encoded}`;
    window.location.href = url;
  }, [prompt]);

  return (
    <div className="not-prose my-6 rounded-xl border border-zinc-950/10 dark:border-white/10 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <p className="text-sm font-medium text-zinc-950 dark:text-white">
            {message}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleOpenInCursor}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-950/10 dark:border-white/10 text-sm font-medium text-zinc-950 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Open in Cursor"
          >
            <img
              src="/images/cursor-dark.svg"
              alt="Cursor logo"
              className="size-4 block dark:hidden"
              loading="lazy"
              width="16"
              height="16"
            />
            <img
              src="/images/cursor-light.svg"
              alt="Cursor logo"
              className="size-4 hidden dark:block"
              loading="lazy"
              width="16"
              height="16"
            />
            Open in Cursor
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-950 dark:bg-white text-sm font-medium text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all"
            aria-label={copied ? "Copied" : "Copy prompt"}
            aria-live="polite"
          >
            {copied ? "Copied" : "Copy prompt"}
          </button>
        </div>
      </div>
    </div>
  );
};
