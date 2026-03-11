# Revora Engine™ — Website

Product website for the RCPM (Rotating Cylindrical Piston Machine) technology by PowerBee P.S.A.

## Tech Stack

- **Vanilla HTML/CSS/JS** — no framework, no build step
- **Canvas animations** — 8+ interactive engine visualizations
- **i18n** — 4 languages: Polish, English, Spanish, German
- **Static site** — deployable on any web server or GitHub Pages

## Project Structure

```
revoraengine/
  index.html                — Main HTML (~1700 lines)
  css/
    style.css               — All styles (variables, base, sections, responsive)
  js/
    i18n.js                 — Translation engine + 4 language dictionaries
    animations.js           — Canvas animations (gateway, hero, engine comparisons)
    interactive-demos.js    — 12-stroke visualizer, fuel calculator, power comparison, AKS
    scroll-reveal.js        — IntersectionObserver scroll animations, counters, progress bar
  assets/
    images/                 — Engine renders, prototype photos (placeholders)
    icons/                  — SVG icons
    favicon/                — Favicon SVG
  CNAME                     — Custom domain for GitHub Pages
```

## Development

Open `index.html` directly in a browser, or serve with any static server:

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Deployment

The site is configured for GitHub Pages:

1. Push to `main` branch
2. In repo Settings → Pages → Source: "Deploy from a branch" → `main` / `root`
3. Custom domain: `revoraengine.com` (configured via `CNAME` file)

## Languages

Switch languages using the flag buttons in the navigation bar. Supported:

| Flag | Language | Code |
|------|----------|------|
| 🇵🇱 | Polski   | `pl` |
| 🇬🇧 | English  | `en` |
| 🇪🇸 | Español  | `es` |
| 🇩🇪 | Deutsch  | `de` |

## Patent

RCPM technology is patented in PL, DE, KR, IN — protection until 22.02.2036.
Inventor: Zbigniew Sadlak / IBS München.

---

© 2025 PowerBee P.S.A.
