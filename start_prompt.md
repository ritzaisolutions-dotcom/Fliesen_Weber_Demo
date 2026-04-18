### ROLE
You are an expert web developer specializing in professional business websites.

### GOAL
Build a sales demo website for a fictional tile and flooring business (Fliesenleger & Bodenleger) in Koblenz, Germany. 

This demo will be used in sales calls to prove ROI and build trust in my ability to deliver high-quality websites for tradesmen. The website must look professional, modern, and credible — not generic or AI-generated.

### STRUCTURE

**Pages:**
1. **index.html** — Main page with all sections
2. **impressum.html** — Placeholder (I will add eRecht24 content later)
3. **datenschutz.html** — Placeholder (I will add eRecht24 content later)

**Sections on index.html:**

1. **Hero Section**
   - Headline: Professional, trust-building (e.g., "Ihr Meisterbetrieb für Fliesen & Bodenbeläge in Koblenz")
   - Subheadline: Brief value proposition
   - CTA Button: "Kostenlos beraten lassen" or "Jetzt Termin vereinbaren"
   - Background: High-quality tile/flooring image (use placeholder, I will replace with real images)

2. **Services Section**
   - 3-4 service cards:
     - Fliesen verlegen (Bad, Küche, Wohnbereich)
     - Bodenbeläge (Vinyl, Laminat, Parkett)
     - Sanierung & Renovierung
     - Beratung & Planung
   - Each card: Icon (simple SVG or Font Awesome), short description

3. **Price Calculator (Kostenrechner)**
   - **Purpose:** Allow visitors to get a rough price estimate without calling
   - **Inputs:**
     - Anliegen (Dropdown: Badezimmer fliesen, Küche fliesen, Balkon fliesen, Wohnzimmer fliesen, Boden verlegen)
     - Fläche in qm (Number input, min: 5, max: 200)
     - Fliesentyp (Dropdown: Standard €40/qm, Premium €70/qm, Naturstein €90/qm)
     - Zusatzleistungen (Checkboxes: Altbelag entfernen +€15/qm, Abdichtung +€20/qm)
   - **Output:** 
     - Preisspanne anzeigen: "Ihr Projekt kostet voraussichtlich zwischen €X.XXX - €Y.YYY"
     - Disclaimer: "Unverbindliche Schätzung. Finales Angebot nach persönlicher Besichtigung."
   - **Technology:** Pure JavaScript, hardcoded pricing logic (no backend, no admin panel)

4. **Contact Section**
   - Phone number: +49 261 1234567 (fictional)
   - Simple contact form: Name, Email, Telefon, Nachricht, Submit button
   - Form does NOT need to work (just HTML, no backend) — placeholder for now

5. **Footer**
   - Links: Impressum, Datenschutz
   - Copyright: "© 2026 Fliesen Weber - Meisterbetrieb in Koblenz"

### TECHSTACK
- **HTML5** (semantic, clean structure)
- **CSS3** (modern, responsive, mobile-first)
- **Vanilla JavaScript** (for calculator logic only, no frameworks)
- **No PHP, no backend** — fully static site

### DESIGN REQUIREMENTS
- **Style:** Modern, clean, professional — NOT generic AI templates
- **Inspiration:** German Handwerk websites (trustworthy, established, competent)
- **Mobile-responsive** (must look good on phone, tablet, desktop)
- **Fast loading** (optimized CSS, minimal JS)

### BRAND
- **Business Name:** Fliesen Weber
- **Tagline:** "Ihr Meisterbetrieb in Koblenz"
- **Location:** Koblenz, Germany
- **Language:** Fully in German
- **Color Scheme:**
  - Primary (backgrounds, large sections): #F5F5F5 (light gray/cloud)
  - Secondary (buttons, accents): #003DA5 (royal blue)
  - Accent (CTAs, highlights): #E63946 (bright red)
  - Text: #333333 (dark gray for readability)
- **Logo:** Text-based logo using a clean sans-serif font (e.g., "FLIESEN WEBER" in bold, blue)

### DELIVERABLES
1. `index.html` — Complete homepage with all sections
2. `impressum.html` — Placeholder page (just header/footer, empty content area)
3. `datenschutz.html` — Placeholder page (just header/footer, empty content area)
4. `style.css` — All styling in one file
5. `calculator.js` — Price calculator logic

### FIRST STEP
Before building, confirm:
- Is the calculator pricing logic clear? (e.g., Base price = Fläche × Fliesentyp + Zusatzleistungen)
- Should the contact form have any specific fields beyond Name/Email/Phone/Message?
- Any clarifications needed?
