export default function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-xl border border-error/20 bg-error-soft px-6 py-8">
      <p className="text-body text-ink">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-xl border border-border bg-bg px-4 py-2.5 text-body font-medium text-ink transition-colors hover:bg-tint/50 active:bg-tint/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Try again
      </button>
    </div>
  );
}
