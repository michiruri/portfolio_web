# Portfolio Agent Brief — Indie / Solo Dev Identity

> **LEGAL COMPLIANCE NOTE (Updated October 2026):** All previous studio and corporate entity mentions have been completely removed across the portfolio site to focus on an independent **Solo / Indie Developer** identity.

**Target repo:** Personal portfolio site (Firebase Hosting)  
**Live URL:** https://raileymitchellcapitis.web.app  
**Owner:** Railey Mitchell Capitis (Solo Indie Developer)  

This brief guides work in the **portfolio website window/repo**. Match the existing portfolio visual language (typography, spacing, dark/light behavior, motion) without introducing a conflicting design system.

---

## Goals (summary)

1. Establish an independent **Solo / Indie Developer** brand crafting custom SaaS products.
2. Feature **Futari** as the primary flagship independent SaaS product with an interactive multi-screen showcase.
3. Keep hero → product → work → skills → experience → achievements → contact flow coherent; portfolio reads as *solo builder & independent products*, not only personal CV.

---

## 1. Hero & identity hierarchy

### Target structure

```
Railey Mitchell Capitis              ← H1
Solo Indie Developer                 ← role line
Crafting personal, customizable web apps
[Pangasinan, PH · Solo Indie Developer]
```

### Copy

- **Supporting:** “I design, build, and ship multi-tenant B2C SaaS on Svelte 5, Next.js, Firebase, Google Cloud, and Gemini Enterprise Agent Platform.”

### Visual

- Small pill/badge near hero: `Solo Indie Developer`
- Footer: `© 2026 Railey Mitchell Q. Capitis · Solo Indie Developer` with links to products.

### SEO / meta

```html
<title>Railey Mitchell Q. Capitis — Solo Indie Developer</title>
<meta name="description" content="Solo indie developer crafting personal, highly customizable web apps. Building and shipping full-stack products with Next.js, TypeScript, and cloud-native architecture — zero corporate bloat." />
<meta property="og:title" content="Railey Mitchell Q. Capitis · Solo Indie Developer" />
```

---

## 2. Featured Product Section

Section id: `#products`.

### Section header

```
Solo Founder & Developer
Featured Product
An independent software platform conceived, engineered, and shipped single-handedly. Just a broke solo developer against the world, crafting every layer from scratch.
```

### Flagship Product — **Futari**

- **Name:** Futari
- **Tagline:** Your cozy shared space for couples
- **Segment:** B2C SaaS
- **Status:** `Pre-launch`
- **Stack:** Svelte 5 · Firebase · Ri AI · Tailwind CSS v4 · TypeScript · Vite
- **Primary CTA:** Pre-launch Access (`https://futari-ri.web.app`)
- **Interactive Viewport:** Real screenshot preview tabs (Landing Experience, Shared Space & Calendar, Ri AI Companion, Themes & Customization) with System Blueprint & Specs dossier modal.

---

## 3. Interactive Works & Projects

Section id: `#projects`.

- **Some Typing Game:** Space typing arcade game built from scratch in vanilla JavaScript with HTML5 Canvas physics, escalating boss encounters, and real-time Firestore leaderboard.

---

## 4. Design consistency checklist

Before marking done, verify:

- [ ] Typography scale matches existing portfolio (same font families, weight hierarchy)
- [ ] Dark/light mode: readable with high contrast and smooth transitions
- [ ] Focus states and link contrast pass WCAG AA on CTAs
- [ ] All external links: `target="_blank"` + `rel="noopener noreferrer"`
- [ ] Responsive: layouts adapt cleanly across mobile, tablet, and desktop
