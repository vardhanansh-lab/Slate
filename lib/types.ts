import type { Archetype } from "./archetypes";

export type ShotLabel = "Hook" | "Demo" | "CTA";

export interface ShotBeat {
  label: ShotLabel;
  description: string;
}

export interface HookVariant {
  archetype: Archetype;
  hookLine: string;
  shots: ShotBeat[];
  castingNote: string;
  generationPrompt: string;
}

export interface ScrapeSuccess {
  success: true;
  context: string;
  title?: string;
  image?: string;
}

export interface ScrapeFailure {
  success: false;
  message: string;
}

export type ScrapeResult = ScrapeSuccess | ScrapeFailure;

export interface GenerateHooksRequest {
  productContext: string;
}

export interface GenerateHooksSuccess {
  success: true;
  variants: HookVariant[];
}

export interface GenerateHooksFailure {
  success: false;
  message: string;
}

export type GenerateHooksResponse = GenerateHooksSuccess | GenerateHooksFailure;

export type UpscaleFactor = 2 | 4;

export interface EnhanceSuccess {
  success: true;
  outputUrl: string;
}

export interface EnhanceFailure {
  success: false;
  message: string;
}

export type EnhanceResponse = EnhanceSuccess | EnhanceFailure;
