---
name: Slate
description: Two quiet, disciplined companion tools for AI video ad creation
colors:
  bg: "#FBFCFE"
  ink: "#10131A"
  muted: "#33415C"
  accent: "#2F5FEB"
  tint: "#EAF1FF"
  border: "#DCE4F0"
  error: "#B3261E"
  error-soft: "#FBECEB"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  h1:
    fontFamily: "Space Grotesk, ui-sans-serif, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  h2:
    fontFamily: "Space Grotesk, ui-sans-serif, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  h3:
    fontFamily: "Space Grotesk, ui-sans-serif, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.005em"
  body-lg:
    fontFamily: "Inter, ui-sans-serif, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Inter, ui-sans-serif, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Inter, ui-sans-serif, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
  micro:
    fontFamily: "Inter, ui-sans-serif, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  xxl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  tag:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.accent}"
    rounded: "999px"
    padding: "4px 10px"
---

# Design System: Slate

## 1. Overview

**Creative North Star: "The Shot List"**

Slate is built like a disciplined production tool, not a marketing surface: one thing at a time,
numbered and deliberate, nothing dressed up beyond what it needs. The vocabulary is drawn from
actual film/video production (a slate, a shot list, a take) rather than generic SaaS language, and
that restraint carries all the way through the visual system. There is exactly one place the design
raises its voice — the slate-stripe logomark — and everything else (typography, cards, spacing)
stays quiet and consistent around it.

This system explicitly rejects the generic-AI-tool scaffold: no tiny uppercase tracked eyebrows
above every section, no arrow-suffixed button text, no numbered 01/02/03 markers used as decoration
rather than a real sequence, no identical rounded cards sharing the same soft grey shadow, and no
pale grey-on-white secondary text. Secondary text reads as dark navy, close to ink, never washed
out.

**Key Characteristics:**
- One signature element (the logomark), everything else deliberately quiet
- Flat, hairline-bordered surfaces; no drop shadows anywhere
- A five-color core palette, no decorative gradients
- Real content over empty placeholder space in every preview/example block
- Film/production vocabulary over generic SaaS language

## 2. Colors

A five-color core palette (plus one narrow, justified semantic exception for errors). Nothing else
is used.

### Primary
- **Slate Blue** (#2F5FEB): the single accent. Primary buttons, links, active toggle states, icon
  badges. Used sparingly — it marks the one interactive/brand-colored thing on a given screen, not
  a decorative wash.

### Neutral
- **Cool Paper** (#FBFCFE): page background. Off-white, not pure white — carries a faint cool
  undertone rather than reading as a stark white canvas.
- **Near-Black Ink** (#10131A): primary text and headline color. Near-black, not pure black.
- **Dark Navy Slate** (#33415C): secondary/muted text (descriptions, captions, labels, casting
  notes). Deliberately dark — this is not the pale, washed-out grey that reads as generic AI-tool
  body copy. It's a full step darker than a typical "muted" gray so it stays legible and intentional
  at small sizes.
- **Pale Blue Tint** (#EAF1FF): tag/chip backgrounds, hover fills, icon badge backgrounds. The
  system's one "soft" surface color, always paired with Slate Blue text or icons on top of it.
- **Hairline Blue-Grey** (#DCE4F0): all borders and dividers. The only depth cue in the system —
  surfaces are separated by this hairline, never by a shadow.

### Semantic exception
- **Muted Red** (#B3261E) on **Pale Red Tint** (#FBECEB): error/validation states only. A narrow,
  deliberate exception to the five-color rule — usability requires a distinct error signal, but it
  never appears decoratively.

### Named Rules
**The Five-Color Rule.** The palette is exactly bg / ink / muted / accent / tint / border, plus the
one semantic error exception. No new hues, no gradients, no "just this once" sixth color.

**The Accent Scarcity Rule.** Slate Blue marks the one actionable/branded thing per view — a
primary button, an active state, a link. It is never used as a wash or a background fill on its
own.

## 3. Typography

**Display/Headline Font:** Space Grotesk (with ui-sans-serif, sans-serif fallback)
**Body/UI Font:** Inter (with ui-sans-serif, sans-serif fallback)

**Character:** Space Grotesk carries the structured, slightly technical personality for anything
headline-weight (a grotesk with real character, not a default system sans); Inter handles every
body and UI string as a clean, highly legible workhorse. The pairing is a deliberate contrast, not
two similar geometric sans-serifs stacked on top of each other.

### Hierarchy
- **Display** (600, 56px / 3.5rem, line-height 1.05): landing page hero headline only.
- **Headline (H1)** (600, 32px / 2rem, line-height 1.15): page-level titles ("Plan your hooks",
  "Refine your image").
- **Title (H2)** (600, 22px / 1.375rem, line-height 1.3): panel/section titles ("Plan", "Polish").
- **Subtitle (H3)** (600, 18px / 1.125rem, line-height 1.4): card-level headlines (a hook line
  inside a result card).
- **Body-lg** (400, 17px / 1.0625rem, line-height 1.6): supporting copy under headlines, panel
  descriptions.
- **Body** (400, 15px / 0.9375rem, line-height 1.6): default UI text, form inputs, buttons. Max line
  length 65–75ch for prose.
- **Small** (400, 13px / 0.8125rem, line-height 1.5): secondary labels, links, captions.
- **Micro** (500, 12px / 0.75rem, line-height 1.4): tags, index numbers, fine print.

### Named Rules
**The Named-Scale Rule.** The type scale is these eight named steps (display through micro), not
default Tailwind `text-xl`/`text-2xl` steps used without intention. Every size on the page maps to
one of these roles.

## 4. Elevation

Slate is flat by default and stays flat under interaction. There is no shadow vocabulary — depth
and separation come entirely from the 1px Hairline Blue-Grey border and from the Pale Blue Tint fill
on hover/active states, never from `box-shadow`. This is a deliberate rejection of the
floating-card-with-soft-grey-shadow pattern that saturates generic AI-generated UI.

### Named Rules
**The Flat-By-Default Rule.** No `box-shadow` on cards, buttons, panels, or containers, at rest or
on hover. Separation is a 1px border or nothing. The one exception: a small functional shadow is
permitted on a draggable control that sits directly over photographic content (e.g. the
before/after comparison slider's drag handle), where it aids grabbability rather than decorating a
card.

## 5. Components

### Buttons
- **Shape:** 8px radius (`rounded-lg`).
- **Primary:** Slate Blue background (#2F5FEB), white text, 10px/20px padding. Hover darkens
  slightly (90% opacity), no shadow, no lift.
- **Secondary/Ghost:** Cool Paper background, Ink text, 1px Hairline Blue-Grey border. Hover fills
  with Pale Blue Tint at 50% opacity. Used for "Try again", "Copy prompt", "Start over"-type
  secondary actions.
- **Text link:** Dark Navy Slate text, no underline, hovers to Ink. Used for quiet in-flow actions
  ("Choose a different image").

### Tags / Chips
- **Style:** Pale Blue Tint background, Slate Blue text, fully rounded (999px), 4px/10px padding,
  micro type. Used for archetype labels ("Bold Claim") and index badges.
- **State:** static, no selected/unselected variants needed yet.

### Cards / Panels
- **Corner style:** 8–12px radius depending on size (`rounded-lg` for result cards, `rounded-2xl`
  for the landing page's two-panel container).
- **Background:** Cool Paper (same as page background — cards are not a different shade from the
  page; they're separated by border only).
- **Shadow strategy:** none (see Elevation).
- **Border:** 1px Hairline Blue-Grey, always.
- **Internal padding:** 24px (small cards) to 48px (landing page panels).

### Inputs / Fields
- **Style:** Cool Paper background, 1px Hairline Blue-Grey border, 8px radius.
- **Focus:** border shifts to Slate Blue. No glow, no shadow.
- **Disabled:** 60% opacity.

### Navigation
- **Style:** a single 56px-tall header strip, Cool Paper background, 1px bottom hairline border.
  Contains only the logomark + "Slate" wordmark, left-aligned, linking home. No nav items, no
  eyebrow text.

### Signature Component: The Slate Mark
A small hand-built SVG clapperboard icon (board + angled striped clapper arm, ink-on-paper diagonal
stripes) paired with the "Slate" wordmark in Space Grotesk. This is the one place in the system that
is allowed to be a little literal/illustrative; everything else stays abstract and quiet.

## 6. Do's and Don'ts

### Do:
- **Do** keep secondary text at Dark Navy Slate (#33415C) or darker — never a pale washed-out grey.
- **Do** separate every card/panel/input with a 1px Hairline Blue-Grey border, never a shadow.
- **Do** fill empty preview/example spots with real, specific content (an actual sample image, an
  actual example hook line) instead of an abstract icon-only placeholder.
- **Do** ground copy and iconography in film/video production vocabulary where it fits naturally
  (slate, shot, take) rather than generic SaaS language.
- **Do** use Slate Blue accent sparingly — one primary action or active state per view.

### Don't:
- **Don't** use tiny uppercase tracked eyebrow labels above sections.
- **Don't** suffix button or link text with a literal "→" character; use a small SVG chevron
  element instead if an arrow affordance is needed.
- **Don't** use numbered 01/02/03 markers as pure decoration; only when the numbers represent a real
  sequence.
- **Don't** apply `box-shadow` to cards or buttons, at rest or on hover.
- **Don't** introduce a sixth color outside bg / ink / muted / accent / tint / border (plus the
  error exception).
- **Don't** leave a bordered preview box visually empty — it reads as unfinished, not minimal.
