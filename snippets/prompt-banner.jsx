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
            <svg
              viewBox="0 0 466.73 532.09"
              className="size-4 block dark:hidden"
              role="img"
              aria-label="Cursor logo"
            >
              <path
                fill="#26251e"
                d="M457.43,125.94L244.42,2.96c-6.84-3.95-15.28-3.95-22.12,0L9.3,125.94c-5.75,3.32-9.3,9.46-9.3,16.11v247.99c0,6.65,3.55,12.79,9.3,16.11l213.01,122.98c6.84,3.95,15.28,3.95,22.12,0l213.01-122.98c5.75-3.32,9.3-9.46,9.3-16.11v-247.99c0-6.65-3.55-12.79-9.3-16.11h-.01ZM444.05,151.99l-205.63,356.16c-1.39,2.4-5.06,1.42-5.06-1.36v-233.21c0-4.66-2.49-8.97-6.53-11.31L24.87,145.67c-2.4-1.39-1.42-5.06,1.36-5.06h411.26c5.84,0,9.49,6.33,6.57,11.39h-.01Z"
              />
            </svg>
            <svg
              viewBox="0 0 466.73 532.09"
              className="size-4 hidden dark:block"
              role="img"
              aria-label="Cursor logo"
            >
              <path
                fill="#edecec"
                d="M457.43,125.94L244.42,2.96c-6.84-3.95-15.28-3.95-22.12,0L9.3,125.94c-5.75,3.32-9.3,9.46-9.3,16.11v247.99c0,6.65,3.55,12.79,9.3,16.11l213.01,122.98c6.84,3.95,15.28,3.95,22.12,0l213.01-122.98c5.75-3.32,9.3-9.46,9.3-16.11v-247.99c0-6.65-3.55-12.79-9.3-16.11h-.01ZM444.05,151.99l-205.63,356.16c-1.39,2.4-5.06,1.42-5.06-1.36v-233.21c0-4.66-2.49-8.97-6.53-11.31L24.87,145.67c-2.4-1.39-1.42-5.06,1.36-5.06h411.26c5.84,0,9.49,6.33,6.57,11.39h-.01Z"
              />
            </svg>
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
