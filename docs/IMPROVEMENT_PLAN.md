# Fliesen Weber — Improvement Plan

**Prepared:** 2026-05-21  
**Scope:** `index.html`, `style.css`, all `.js` files  
**Reference benchmark:** Elektromeister Ritz demo + general best practices

---

## Priority 1 — Schema.org: Build from Scratch (45 min)

**What's wrong:** Zero structured data exists on this site. No JSON-LD at all. This is the biggest single SEO gap — Google cannot understand who this business is, where it operates, or what rating it has.

**How to implement:**

Add the following `<script type="application/ld+json">` block inside `<head>` of `index.html`:

```json
{
  "@context": "https://schema.org",
  "@type": "FlooringStore",
  "name": "Fliesen Weber",
  "description": "Meisterbetrieb für Fliesen und Bodenbeläge in Koblenz. Badsanierung, Küche, Wohnbereich und Außenflächen.",
  "url": "https://fliesen-weber-koblenz.de",
  "telephone": "+49 151 29755134",
  "email": "fliesen.weber.koblenz@gmail.com",
  "foundingDate": "1987",
  "priceRange": "€€",
  "openingHours": "Mo-Fr 07:30-17:00",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Musterstraße 1",
    "addressLocality": "Koblenz",
    "postalCode": "56068",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.3568,
    "longitude": 7.5979
  },
  "areaServed": ["Koblenz", "Neuwied", "Andernach", "Lahnstein", "Bonn", "Wiesbaden"],
  "founder": {
    "@type": "Person",
    "name": "Weber",
    "jobTitle": "Meister Fliesenlegerhandwerk"
  },
  "employee": {
    "@type": "Person",
    "name": "Weber",
    "jobTitle": "Meister Fliesenlegerhandwerk"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "80",
    "bestRating": "5"
  }
}
```

**After adding:** Test with Google Rich Results Test. Expect LocalBusiness card eligibility.

---

## Priority 2 — Fix Missing contactForm.js (15 min)

**What's wrong:** `index.html` loads `<script src="contactForm.js">` at line 1256, but the file does not exist in the root directory. It exists only inside `Fliesen_Weber_Demo/`. This causes a silent 404 and the contact form submit button does nothing.

**How to fix:**

1. Copy `Fliesen_Weber_Demo/contactForm.js` to the root `C:\RAIS_VAULT\Websites\Fliesen_Weber\` directory.
2. Open it and verify the demo disclaimer message is correct.
3. Test the form — fill all required fields and click "Nachricht senden". Should show the status message.

**Note:** If deploying for a real client, this file needs to be wired to Web3Forms. The `access_key` is already embedded in the form: `d2ed1dac-2a1c-4afe-a43d-2744e56c3fdd`. Just update the form submission URL in contactForm.js from demo mode to `https://api.web3forms.com/submit`.

---

## Priority 3 — Fix Stats Counter Mismatch (10 min)

**What's wrong:** `statsCounter.js` animates the projects counter to `350`, but the stats bar HTML displays "600+". These are the same element — the JS overwrites the HTML text on load. Visitors see the counter animate to 350, then it stops, but the static display says 600+.

**How to fix:**

Open `statsCounter.js` and update the targets object:

```js
// Change:
{ el: '[data-stat="projects"]', target: 350, suffix: '+', ... }

// To:
{ el: '[data-stat="projects"]', target: 600, suffix: '+', ... }
```

Also check the `years` counter: `statsCounter.js` targets `15` years but the site was founded in 1987 (37 years). Update:

```js
// Change:
{ el: '[data-stat="years"]', target: 15, ... }

// To:
{ el: '[data-stat="years"]', target: 37, ... }
```

---

## Priority 4 — Add Founder Voice / Expert Quote Section (45 min)

**What's missing:** Ritz has a dark quote section with Franz Ritz's philosophy — it's one of the most personal and trust-building parts of that site. Weber has no founder voice anywhere. The site is technically credible but impersonal.

**Where to add:** Between the `#ablauf` (workflow) section and the `#faq` section.

**HTML to add:**

```html
<section class="py-14 md:py-20 bg-primary text-white">
  <div class="container mx-auto px-4">
    <div class="max-w-2xl mx-auto text-center">
      <p class="text-xs font-bold tracking-widest uppercase text-white/40 mb-6">Meister Weber</p>
      <blockquote class="text-xl md:text-2xl font-bold leading-relaxed text-white mb-6">
        "Bevor ich einen Preis nenne, schaue ich mir das Objekt an. Fliesen auf Fliesen ist manchmal möglich — 
        und manchmal eine Zeitbombe. Das sagt man am Telefon nicht, das sieht man vor Ort."
      </blockquote>
      <p class="text-sm font-bold tracking-wider uppercase text-white/40">
        Meister Fliesenlegerhandwerk · Koblenz · seit 1987
      </p>
    </div>
  </div>
</section>
```

Adjust the quote text to fit the real owner's personality once client details are provided.

---

## Priority 5 — Extract Inline Calculator JavaScript (30 min)

**What's wrong:** ~140 lines of calculator JavaScript are embedded directly in `index.html` (the `<script>` block starting around line 650). The file `calculator.js` exists but is a 62-byte placeholder comment. This makes `index.html` harder to maintain and the logic impossible to reuse.

**How to fix:**

1. Cut the entire IIFE calculator block from `index.html` (the section from `<script>` to the closing `</script>` that contains `const state = { step, projekt, flaeche, material, extras }`).
2. Paste into `calculator.js`, replacing the placeholder comment.
3. Ensure the `<script src="calculator.js">` tag is already in `index.html` (it is, at line 1255).
4. Test: open the page, step through all 4 calculator steps, verify price output renders.

**Note:** The inline script block also fires the Calendly loader on link click. That logic is separate (lines ~1262-1311) and should stay inline or move to `site.js` — do not accidentally delete it.

---

## Priority 6 — Expand FAQ Section (30 min)

**What's wrong:** Only 4 FAQ items. Ritz has 6 well-targeted questions that pre-answer common objections. Weber's 4 questions are good but leave gaps that a prospect might use to exit.

**Questions to add (2 recommended):**

**Question 5 — Guarantee / warranty:**
> "Welche Garantie erhalten Sie auf die Arbeit?"  
> Answer: "Wir arbeiten nach VOB mit 4 Jahren Gewährleistung auf handwerkliche Ausführung. Auf verlegtes Material gilt die Herstellergarantie zusätzlich. Beanstandungen nehmen wir direkt an — ohne Diskussion."

**Question 6 — Old tile removal:**
> "Müssen die alten Fliesen immer entfernt werden?"  
> Answer: "Nicht zwingend. Fliesen auf Fliesen ist möglich wenn der Untergrund fest, eben und tragfähig ist. Ob das geht, prüfen wir vor Ort. Wenn es geht, sparen Sie Zeit und Kosten. Wenn nicht, erklären wir warum."

**How to add:** Copy the structure of an existing `<details>` FAQ item and add after the 4th item.

---

## Priority 7 — Material Partner Logos (visual credibility) (45 min)

**What's wrong:** The partners section lists MAPEI, SCHLÜTER, VILLEROY & BOCH, WEDI, WEBER, LITHOFIN as plain text in uppercase. These are internationally recognized brands with strong SVG logos. Using actual logos (not text) increases visual credibility.

**How to implement:**

1. Fetch SVG logos for: Mapei, Schlüter-Systems, Villeroy & Boch, Wedi, Saint-Gobain Weber, Lithofin.
2. Save as `images/partners/mapei.svg`, etc.
3. Replace text items with:

```html
<img src="images/partners/mapei.svg" alt="Mapei" height="32" loading="lazy">
```

Keep a text fallback inside the `<img>` with an `alt` for accessibility.

**Alternative if logos unavailable:** Add a 1px border card around each partner name, giving them more visual weight.

---

## Priority 8 — Add Google Rating Badge to Reviews Section (20 min)

**What's wrong:** Ritz has a styled Google rating badge (white card, Google logo, 4.9 score, star row) that anchors the reviews section. Weber's reviews section just shows the aggregate text "4,9 / 5" without a Google brand marker. Adding the badge makes the rating feel externally verified rather than self-reported.

**How to add:**

In the `#bewertungen` section header, after the H2, add a trust badge block. Reference the Elektromeister Ritz implementation — it uses an inline SVG Google logo inside a bordered card with flex layout. Create a `.google-rating-badge` CSS class and add the badge before the carousel.

The Google "G" SVG code can be copied from the Ritz `index.html` stats bar section.

---

## Priority 9 — Tailwind CDN → Production CSS (1-2 hours)

**What's wrong:** The site loads Tailwind from `cdn.tailwindcss.com`. The CDN version:
- Loads the entire ~3MB Tailwind stylesheet
- Runs the JIT compiler in the browser (CPU cost on every load)
- Is not recommended by Tailwind for production use

**Option A — Tailwind CLI build (recommended):**

1. Install: `npm init -y && npm install tailwindcss --save-dev`
2. Create `tailwind.config.js` with the color config currently in the inline `<script id="tailwind-config">` block.
3. Create `input.css` with `@tailwind base; @tailwind components; @tailwind utilities;`
4. Build: `npx tailwindcss -i ./input.css -o ./dist/output.css --minify`
5. Replace the CDN `<script>` tags with `<link rel="stylesheet" href="dist/output.css">`
6. Also remove the inline `<script id="tailwind-config">` block from HTML

**Option B — Convert to pure CSS (simpler for small teams):**

The site already has `style.css` with CSS variables. Most Tailwind utility classes used here could be replaced with a handful of layout classes. This removes the Tailwind dependency entirely.

**Recommended:** Option A if the team is comfortable with npm. Option B if this is a single-file delivery to a client.

---

## Priority 10 — Hero Headline Typography (15 min)

**What's missing:** The H1 is rendered entirely in Inter. Adding a serif or display font for the headline creates more premium visual weight — particularly relevant for a craft/Meisterbetrieb positioning.

**How to implement:**

1. Add Playfair Display to the existing Google Fonts `<link>`:

```
&family=Playfair+Display:ital,wght@0,700;0,900;1,700
```

2. Add a font-family override for the H1:

If using Tailwind: add `font-headline` as a utility (it's already in the Tailwind config as `"Inter, sans-serif"` — update it to `"'Playfair Display', Georgia, serif"`).

If moving to plain CSS: target the hero H1 directly:

```css
.hero h1 { font-family: 'Playfair Display', Georgia, serif; }
```

3. Adjust `letter-spacing` — Playfair at `tracking-tighter` can look too compressed. Test at `tracking-tight` or `tracking-normal`.

---

## Priority 11 — Mobile Menu Accessibility (20 min)

**What's missing:** The hamburger button (`#nav-hamburger`) has no `aria-expanded` state. When a screen reader user activates it, there's no announcement that the menu opened or closed.

**How to fix in the inline script at the bottom of `index.html`:**

```js
const btn = document.getElementById('nav-hamburger');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
  const isOpen = !menu.classList.contains('hidden');
  menu.classList.toggle('hidden');
  btn.setAttribute('aria-expanded', String(!isOpen));
});
```

Also update the HTML button element:

```html
<button id="nav-hamburger" aria-controls="mobile-menu" aria-expanded="false" aria-label="Menü öffnen">
```

---

## Priority 12 — Portfolio Image Alt Text (15 min)

**What's wrong:** All 6 focus carousel images have alt text like `"Referenzbild 1"` or `"Badezimmer · Koblenz"`. These are visible as captions but the `alt` attributes on the `<img>` tags themselves are minimal. For SEO and accessibility, alt text should describe the actual work.

**How to update** (open `index.html`, find `focusCarouselTrack` section):

| Image | Current alt | Improved alt |
|---|---|---|
| project-1.jpg | "Referenzbild 1" | "Verlegte Bodenfliesen in einem Koblenzer Badezimmer, Meisterbetrieb Weber" |
| project-2.jpg | "Referenzbild 2" | "Badsanierung mit großformatigen Wandfliesen, Koblenz" |
| project-3.jpg | "Referenzbild 3" | "Renoviertes Badezimmer mit Natursteinboden, Koblenz" |
| project-4.jpg | "Referenzbild 4" | "Fliesenleger bei der sauberen Verlegung auf einer Baustelle" |
| project-5.jpg | "Referenzbild 5" | "Meisterhandwerk vor Ort — Detailarbeit an Fliesenfuge" |
| project-6.jpg | "Referenzbild 6" | "Fertige Meisterarbeit — Badezimmer Koblenz" |

Update the `<img alt="">` attributes AND the hidden `<p>` caption elements in each slide.

---

## Priority 13 — Go-Live Checklist

Before handing off to a real client, verify:

- [ ] Change `<meta name="robots" content="noindex, nofollow">` to `index, follow`
- [ ] Replace Cookiebot CBID placeholder `DEMO-CBID-PLACEHOLDER` with client's actual ID
- [ ] Replace Calendly URL with client's actual booking link
- [ ] Update contact form Web3Forms access key with client's key
- [ ] Update all placeholder contact details (phone, email, address) in HTML AND schema.org
- [ ] Replace `Kevin Ritz / RAIS` in `impressum.html` and `datenschutz.html` with client info
- [ ] Verify Google Maps iframe coordinates match client's actual address
- [ ] Confirm `contactForm.js` is present in root (Priority 2 above)
- [ ] Run Google Rich Results Test on schema.org

---

## Implementation Order

| # | Task | File(s) | Time |
|---|---|---|---|
| 1 | Fix contactForm.js missing | root folder | 15 min |
| 2 | Fix stats counter mismatch | statsCounter.js | 10 min |
| 3 | Schema.org JSON-LD | index.html | 45 min |
| 4 | Extract inline calculator JS | index.html → calculator.js | 30 min |
| 5 | Add founder quote section | index.html | 45 min |
| 6 | Expand FAQ (2 new questions) | index.html | 30 min |
| 7 | Google rating badge in reviews | index.html + style.css | 20 min |
| 8 | Portfolio image alt text | index.html | 15 min |
| 9 | Mobile menu aria attributes | index.html | 20 min |
| 10 | Material partner logos | images/partners/ + index.html | 45 min |
| 11 | Hero headline font (Playfair) | index.html + style.css/tailwind | 15 min |
| 12 | Tailwind CDN → build | package.json + build setup | 1-2 hours |
| **Total** | | | **~5.5 hours** |
