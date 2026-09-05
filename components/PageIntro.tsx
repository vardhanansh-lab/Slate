export default function PageIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="mb-8 flex flex-col gap-2">
      <h1 className="font-head text-h1 font-semibold text-ink">{title}</h1>
      <p className="max-w-[52ch] text-body text-muted">{description}</p>
    </header>
  );
}
