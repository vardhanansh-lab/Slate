export const ARCHETYPES = [
  "Bold Claim",
  "POV / Relatable",
  "Problem-First",
  "Curiosity Gap",
  "Controversial Take",
  "Before/After",
  "Social Proof",
  "Myth-Bust",
] as const;

export type Archetype = (typeof ARCHETYPES)[number];

export const ARCHETYPE_DESCRIPTIONS: Record<Archetype, string> = {
  "Bold Claim": "A strong, slightly provocative statement about the product.",
  "POV / Relatable": "\"POV: you're...\" style, puts the viewer in a relatable moment.",
  "Problem-First": "Opens on a pain point before introducing the product as the fix.",
  "Curiosity Gap": "Withholds information to make the viewer want to know more.",
  "Controversial Take": "A mild contrarian opinion that stops the scroll.",
  "Before/After": "Implies or shows a transformation.",
  "Social Proof": "\"Everyone's switching to...\" / testimonial-style opening.",
  "Myth-Bust": "\"You've been told X, but actually...\" framing.",
};
