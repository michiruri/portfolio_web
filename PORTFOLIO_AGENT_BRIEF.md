# Portfolio Agent Brief — Ri Software Solutions Rebrand

**Target repo:** Personal portfolio site (Firebase Hosting)  
**Live URL:** https://raileymitchellcapitis.web.app  
**Owner:** Railey Mitchell Capitis · **Ri Software Solutions**  
**Do not edit:** `email_anti-spam_policy_*.plan.md` or Triage repo email code unless explicitly asked.

This brief is for an agent working in the **portfolio website window/repo**. Implement all items below in one cohesive pass. Match the existing portfolio visual language (typography, spacing, dark/light behavior, card radius, motion) — do not introduce a conflicting design system.

---

## Goals (summary)

1. Establish **Ri Software Solutions** as the product studio / company you own (not a footnote).
2. Add a **Products** section with cards for Ri SS SaaS products.
3. Replace the **stealth startup** treatment with **Triage** as a public, fully visible flagship product.
4. Add **Futari** as a second Ri SS SaaS product card.
5. Keep hero → work → about → contact flow coherent; portfolio should read as *founder + studio*, not only personal CV.

---

## 1. Hero & identity hierarchy

### Current problem
Portfolio likely leads with personal name only; company ownership is easy to miss.

### Target structure

```
[ Ri Software Solutions ]          ← studio wordmark / sub-brand strip
Railey Mitchell Capitis              ← H1
Founder & Lead Engineer              ← role line
Building AI-native SaaS for operations teams
[Pangasinan, PH · Ri Software Solutions]
```

### Copy (use or adapt)

- **Studio tagline:** “Ri Software Solutions — AI products for modern operations”
- **Personal line:** “Railey Mitchell Capitis · Founder & Lead Engineer”
- **Supporting:** “I design, build, and ship multi-tenant SaaS on Firebase, Next.js, and Vertex AI.”

### Visual

- Reuse portfolio accent color for Ri SS badge (if Triage purple `#8B5CF6` exists in tokens, align or document the mapping).
- Small pill/badge near hero: `Ri Software Solutions`
- Footer: `© 2026 Ri Software Solutions` with link to Triage landing if applicable.

### SEO / meta

```html
<title>Railey Mitchell Capitis — Founder, Ri Software Solutions</title>
<meta name="description" content="Founder & Lead Engineer at Ri Software Solutions. Builder of Triage and Futari — AI-native SaaS products." />
<meta property="og:title" content="Ri Software Solutions · Railey Mitchell Capitis" />
```

---

## 2. New section: Ri Software Solutions Products

Insert after hero (or replace generic “Projects” if redundant). Section id: `#products` or `#studio`.

### Section header

```
Ri Software Solutions
Products
AI-native SaaS built and operated by the studio.
```

### Product card grid (2 columns desktop, 1 mobile)

Each card shares one component pattern:

| Element | Spec |
|--------|------|
| Badge | `Ri Software Solutions · Product` |
| Logo/icon | Product mark or lucide-style icon in brand tint |
| Title | Product name (H3) |
| One-liner | ≤ 120 chars |
| Tags | 3–4 stack pills (e.g. Next.js, Firebase, Vertex AI) |
| Status pill | `Live` · `Alpha` · `In Development` |
| CTAs | Primary external link + optional “Case study” anchor |

---

### Card A — **Triage** (replace stealth startup)

**Remove entirely:**
- Blur overlays, lock icons, “stealth” / “hidden” / redacted copy
- Disabled or teaser-only CTAs that hide the product name
- Any “coming soon” mask on what is now public

**Card content:**

| Field | Value |
|-------|-------|
| Name | **Triage** |
| Tagline | Surgical precision for modern customer support |
| Description | Multi-tenant AI service desk: ticket triage, agent workflows, digest email policy, routing, analytics, and client portal. |
| Status | `Alpha` (or `Co-Development` if matching landing slots) |
| Tags | `Next.js` · `Firebase` · `Vertex AI` · `Postmark` |
| Primary CTA | **Visit Triage** → Triage app URL or landing (same as Triage repo: production landing / app host) |
| Secondary CTA | **Co-Dev Program** → pricing/anchor on Triage landing if available |

**Visual:** Full-color card, no blur. Use Triage brand purple accent on border or icon. Optional screenshot or abstract dashboard mock in card media slot.

**Cross-link:** Triage landing footer already links to this portfolio — ensure reciprocal link “Founder's Portfolio” still works.

---

### Card B — **Futari**

Add as a first-class Ri SS product (same card component as Triage).

| Field | Value |
|-------|-------|
| Name | **Futari** |
| Tagline | *(Agent: use existing Futari copy from repo if present; otherwise)* “Collaborative planning for teams that move fast” |
| Description | *(Adapt from Futari repo/README if available)* SaaS product under Ri Software Solutions. Position as sibling to Triage, not a personal side project. |
| Status | `In Development` or `Alpha` — match Futari repo truth |
| Tags | Infer from Futari stack (e.g. Firebase, React, etc.) |
| Primary CTA | Futari app URL or GitHub/demo link |
| Secondary | “Learn more” → in-page detail or external docs |

**If Futari has stealth/hidden UI in portfolio today:** apply same treatment as Triage — make visible, remove blur, honest status pill.

**Ownership line on card footer:** `Ri Software Solutions`

---

### Optional Card C — placeholder

Only if layout looks unbalanced with two cards:

- “More products in pipeline” muted card, no fake product names.

---

## 3. Migrate “Stealth Startup” → Triage

### Find & replace checklist

Search portfolio codebase for:

- `stealth`, `hidden`, `blur`, `redacted`, `classified`, `locked`, `[REDACTED]`
- Project slug/id referencing stealth startup

### Migration rules

1. Rename project entry in data/config/JSON to `triage`.
2. Swap all stealth assets for Triage branding (logo, colors, screenshots).
3. Remove CSS: `filter: blur()`, `pointer-events: none` on product cards, opacity locks.
4. Update nav label: **Triage** under Products or Work.
5. Update any “Featured project” carousel to lead with Triage.

---

## 4. About section — dual voice

Split or interleave:

**Personal (I):** engineering background, philosophy, stack depth.  
**Studio (We):** Ri Software Solutions — Pangasinan, Philippines; B2B SaaS; compliance-minded builds; products Triage & Futari.

Suggested closing line:

> “I founded Ri Software Solutions to ship focused AI tools for support and operations teams—without enterprise bloat.”

---

## 5. Navigation updates

Suggested nav items:

```
About · Products · Triage · Futari · Contact
```

Or grouped:

```
About · Products ▾ · Contact
              ├ Triage
              └ Futari
```

Ensure mobile menu includes Products section anchors.

---

## 6. Design consistency checklist

Before marking done, verify:

- [ ] Typography scale matches existing portfolio (same font families, weight hierarchy)
- [ ] Card border-radius, shadow, and hover match existing project cards
- [ ] Spacing rhythm (section padding, grid gap) unchanged unless improving Products grid only
- [ ] Dark mode: product cards readable; no blur artifacts left
- [ ] Focus states and link contrast pass WCAG AA on CTAs
- [ ] All external links: `target="_blank"` + `rel="noopener"`
- [ ] No broken images after stealth asset removal
- [ ] Responsive: cards stack cleanly ≤768px

### Reference design tokens (Triage landing alignment)

If portfolio lacks tokens, optionally align:

| Token | Value |
|-------|-------|
| Brand | `#8B5CF6` |
| Brand muted bg | `#8B5CF618` |
| Radius | match portfolio `--radius` or `12px–16px` |
| Uppercase labels | `10px`, `tracking-widest`, `font-weight: 800` (if portfolio uses similar) |

Do not clone entire Triage landing — **harmonize**, don’t duplicate.

---

## 7. Files to inspect (portfolio repo)

Agent should search the portfolio repo for:

```
**/projects*.{json,ts,tsx,js}
**/data/**
**/*stealth*
**/*futari*
**/*triage*
**/index.html
**/App.{tsx,jsx}
**/components/**/Project*
**/components/**/Work*
```

Document which files were changed in the PR/commit message.

---

## 8. Content blocks (copy-paste ready)

### Products section intro

> **Ri Software Solutions** builds AI-native SaaS for customer support and team operations. Every product below is designed, developed, and operated by the studio.

### Triage elevator pitch

> Triage is an AI-powered service desk for teams that need fast triage, clear agent workflows, and controlled notification cost—multi-tenant, Firebase-backed, with surgical email policy and Vertex-powered assistance.

### Futari elevator pitch (default if no repo copy)

> Futari is a Ri Software Solutions product focused on collaborative team workflows. Built with the same engineering standards as Triage: secure multi-tenant architecture and pragmatic AI where it helps.

---

## 9. Acceptance criteria

1. Visitor understands within **5 seconds** that Railey owns **Ri Software Solutions**.
2. **Triage** appears as a normal, clickable product — zero stealth/blur UI.
3. **Futari** appears as Ri SS product #2 with correct links and status.
4. Products section uses **consistent cards**; layout fits existing portfolio design.
5. Meta tags and footer reflect Ri Software Solutions ownership.
6. No regressions: contact form, resume download, analytics, Firebase deploy config still work.

---

## 10. Out of scope (unless user asks)

- Triage app email system (handled in Triage repo)
- Lemon Squeezy / billing integration on portfolio
- Rewriting Triage landing.html in portfolio repo

---

## 11. Suggested commit message

```
feat(portfolio): Ri Software Solutions studio brand, Triage + Futari product cards

- Hero/footer studio ownership for Ri Software Solutions
- Replace stealth startup with public Triage card
- Add Futari as Ri SS SaaS product
- Products section with consistent card design
```

---

## Reference links

| Resource | URL |
|----------|-----|
| Portfolio (live) | https://raileymitchellcapitis.web.app |
| Triage landing (reference) | Triage repo `landing.html` / production host |
| Founder line on Triage landing | “Founder & Lead Engineer, Ri Software Solutions” |

---

*Brief generated for cross-window agent handoff from Triage repo. Update Futari URLs/descriptions once Futari repo paths are confirmed.*
