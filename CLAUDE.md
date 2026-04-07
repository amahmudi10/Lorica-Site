# Lorica Website

Public marketing website for Lorica — a rugged wearable wrist device that enables hands-free voice control via the user's smartphone.

**Live URL:** hosted on GitHub Pages (main branch, root folder)  
**Repo:** public, separate from the private Lorica hardware/firmware repo (kept locally)

---

## File Structure

```
Lorica-Website/
├── index.html          # Consumer landing page
├── business.html       # Business/enterprise subpage
├── css/
│   └── styles.css      # All styling — single file, no imports
├── js/
│   └── tracking.js     # GA4 event tracking + Formspree email forms
└── images/
    └── Modern fitness trackers in vibrant colors.png
```

No build step. No framework. Pure HTML/CSS/JS.

---

## Pages

### index.html — Consumer landing page
- Nav: logo left, "Lorica for Business →" link right
- Hero: headline, subhead, reveal-on-click email signup form
- Why Lorica: 4 cards in 2x2 grid (Live Translation, 2-Week Battery, Phone Connectivity, Built to Last)
- How It Works: 3 numbered steps (Speak → Your Phone Does the Work → Hear the Response)
- Built for people who move: 3 persona cards (adventurers, travelers, field workers). Workers card has a "Lorica for Business →" link.
- Footer CTA: reveal-on-click email signup form

### business.html — Enterprise subpage
- Hero with reveal-on-click email form
- Problem strip (3 pain points)
- 6 benefit cards (2x3 grid)
- Durability section: 6 stat cards in 3x2 grid with specific figures (IP68, MIL-STD-810H, 2-week battery, etc.)
- 4 industry cards (Construction, Logistics, Emergency Services, Manufacturing)
- How It Works: 3 steps
- Footer CTA with reveal-on-click email form

---

## Third-Party Integrations

| Service | Purpose |
|---------|---------|
| Google Analytics 4 (`G-K3F2VCWHW0`) | Page views, event tracking |
| Formspree | Email capture (both pages, 4 forms total) — form ID in your Formspree dashboard |

GA snippet is inline in each HTML file's `<head>`. tracking.js is loaded at the end of `<body>` on both pages.

---

## tracking.js — What It Tracks

**Email forms (Formspree — form ID in your Formspree dashboard):**
- `hero` — index.html hero button
- `footer` — index.html footer CTA
- `business-hero` — business.html hero button
- `business-footer` — business.html footer CTA

Each form is hidden by default. The CTA button is clicked → button hides → form reveals. On submit, fires `gtag('event', 'email_signup', { source, page })`.

**Other events:**
- `business_page_click` — any click on a `[href="business.html"]` link
- `scroll_depth` — fires at 25 / 50 / 75 / 100% scroll depth on every page

---

## Design System

| Token | Value |
|-------|-------|
| Accent / teal | `#5a9fad` |
| Dark background | `#0f1117` |
| Font | Inter (Google Fonts) |
| Border radius | `12px` cards, `8px` inputs |

All styles live in `css/styles.css`. No CSS variables — colors are hardcoded. Dark background sections use `.email-form--dark` for the form input styling.

---

## Branch Workflow

- `development` — active work branch
- `main` — production (GitHub Pages serves from here)
- Merge development → main to deploy

---

## Key Patterns

**Reveal-on-click email form:**
```html
<button class="btn-primary" id="hero-cta-btn">Get Early Access</button>
<div id="hero-form-wrap" style="display:none;">
  <p class="form-success" id="hero-form-success">You're on the list. We'll be in touch.</p>
  <form class="email-form" id="hero-form">
    <input type="email" name="email" placeholder="Enter your email" required />
    <button type="submit" class="btn-primary">Notify Me</button>
  </form>
</div>
```
Wired in tracking.js via `revealForm(btnId, wrapId)` and `setupForm(formId, successId, label)`.

**Adding a new CTA form:** add the HTML above with unique IDs, then add two lines in tracking.js:
```js
revealForm('your-btn-id', 'your-wrap-id');
setupForm('your-form-id', 'your-success-id', 'label-for-analytics');
```
