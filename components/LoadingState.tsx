import HookCardSkeleton from "./HookCardSkeleton";

export default function LoadingState() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 text-body text-muted">
        <span className="h-4 w-4 animate-spin-slow rounded-full border-2 border-border border-t-accent" />
        Writing 8 ad angles...
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <HookCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
