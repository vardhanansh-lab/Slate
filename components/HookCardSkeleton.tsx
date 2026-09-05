export default function HookCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-bg p-6">
      <div className="h-5 w-28 animate-pulse-soft rounded-full bg-tint" />
      <div className="flex flex-col gap-2">
        <div className="h-5 w-full animate-pulse-soft rounded bg-tint" />
        <div className="h-5 w-2/3 animate-pulse-soft rounded bg-tint" />
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="h-4 w-full animate-pulse-soft rounded bg-tint" />
        <div className="h-4 w-5/6 animate-pulse-soft rounded bg-tint" />
        <div className="h-4 w-4/6 animate-pulse-soft rounded bg-tint" />
      </div>
      <div className="h-3 w-1/3 animate-pulse-soft rounded bg-tint" />
      <div className="mt-auto h-10 w-full animate-pulse-soft rounded-xl bg-tint" />
    </div>
  );
}
