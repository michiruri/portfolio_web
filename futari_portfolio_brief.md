# Project Brief: Futari (B2C SaaS for Couples)
This document provides a technical analysis, feature breakdown, and technology assessment of **Futari** to guide the portfolio agent in integrating it into the personal portfolio site.

---

## 1. Project Meta & Elevator Pitch

* **Product Name**: Futari (meaning "two people" / "couple" in Japanese)
* **Tagline**: Collaborative planning built for couples
* **Segment**: B2C SaaS (sibling to the B2B SaaS Triage)
* **Studio Ownership**: Owned and operated by **Ri Software Solutions**
* **Status**: `In Development` (Active pre-release staging)
* **Live Demo Staging URL**: [https://futari-ri.web.app](https://futari-ri.web.app)

### Elevator Pitch
> Futari is a secure, multi-tenant B2C couples application for shared planning, cycle tracking, daily memories, and everyday coordination. Built with the same enterprise-grade architectural rigor as Triage, it is carefully tuned for private, personal use rather than business operations.

---

## 2. Core Languages & Tech Stack

The technologies and languages utilized across both **Futari** and your **Web Portfolio** are aligned for seamless, high-performance web development.

### Languages Used
1. **TypeScript (Primary)**: Enforces static typing across the entire Svelte 5 frontend, utility stores, and Firebase Cloud Functions backend.
2. **JavaScript (ES6+)**: Used for configuration files (Vite, Svelte, ESLint) and auxiliary tooling.
3. **HTML / TSX / Svelte Syntax**: Defines UI layouts, component structures, and DOM templates.
4. **CSS / Tailwind CSS**: Custom design systems (Tailwind CSS v4) compiled directly into high-efficiency stylesheet bundles.

### Futari Architecture Stack
* **Frontend**: Svelte 5 (utilizing reactive **Runes** like `$state`, `$derived`, `$effect`), TypeScript, Vite 8, Tailwind CSS v4.
* **Mobile Bridge**: Capacitor 8 (bridging the web-first application into native iOS and Android packages, incorporating plugins like `@capacitor/camera`).
* **BaaS (Backend)**: Firebase Suite (Firestore, Firebase Auth, Firebase Hosting, Cloud Storage).
* **Payment/Billing**: Lemon Squeezy (subscription management, recurring payments, and secure webhook handler).
* **Backend Services**: Node 20 Firebase Cloud Functions for transaction management, referrals, and tier updates.
* **Integrations**: `html5-qrcode` (for QR code pairing during couple onboarding) and Web Push notifications.

### Web Portfolio Stack (for reference)
* **Framework**: Next.js 16 (React 19)
* **Styling**: Tailwind CSS v4 + Base UI (React)
* **Icons & Components**: Lucide React + Custom Shadcn components
* **Deployment**: Firebase Hosting

---

## 3. Detailed Feature Analysis

Futari's feature set is designed around collaborative, private touchpoints for couples:

1. **Daily Cozy Diary (`DiaryTab.svelte`)**: 
   * A private daily reflection diary unlocking at 6:00 PM local time.
   * **Anticipation Guard**: A partner's entry is hidden/blurred until *both* users have submitted their entry for the day.
   * Supports uploading one image per day to document special moments.
2. **Period & Cycle Tracker (`CycleTab.svelte`)**:
   * Collaborative symptom logging and cycle phase calendar prediction.
   * Built to encourage open discussion, visual planning, and empathetic support.
3. **Shared Wishlists & Claims (`WishlistTab.svelte`)**:
   * Partners add desired items to a list.
   * **Surprise Mechanic**: Items can be silently "claimed" by one partner (e.g., for gifts/surprises) without revealing who claimed it to the recipient, syncing state in real-time.
4. **Real-time Whiteboard (`WhiteboardTab.svelte`)**:
   * A shared canvas for real-time sketching, doodling, and virtual sticky notes.
5. **Interactive Couple Games (`GamesTab.svelte`)**:
   * Light-hearted, real-time shared games (like Tic-Tac-Toe and matching puzzles) to encourage connection.
6. **Chores, Budgets & Dates**:
   * Core household tools for splitting chores (`ChoresTab.svelte`), managing budgets (`BudgetTab.svelte`), and keeping details on upcoming dates (`DatesTab.svelte`).

---

## 4. Engineering & Architectural Highlights

The portfolio agent should highlight these professional-grade details:

* **Strict Multi-Tenancy**: Data isolation is enforced at the query and rules level using a shared `householdId`. Security rules (`firestore.rules`) block cross-tenant leakage.
* **Firestore Protection & Query Guard**: Includes a client-side API guard (`firestore-guard.svelte.ts`) and a local caching layer (`firestore-cache.ts` / `firestore-idle.svelte.ts`) that stops runaway reads/writes, manages offline operations, and reduces Firebase billings.
* **Svelte 5 Runes Pattern**: Modern reactive state management using Svelte's compiler-driven `$state`, `$derived`, and `$effect` instead of legacy stores, allowing fast visual updates.
* **Micro-SaaS Billing Engine**: Integrated cloud functions (`lemon-squeezy-webhook.ts`) that process webhook transactions to toggle features based on the household's subscription tier (`household-tier.ts` / `subscription.ts`).
* **Seamless QR Onboarding**: Integrates QR-code generation and webcam scanning (`html5-qrcode`) to pair devices and immediately establish a shared household.
