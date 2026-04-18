# Design System Strategy: Architectural Precision

## 1. Overview & Creative North Star: "The Master’s Grid"
This design system is built upon the concept of **Architectural Precision**. Much like the work of a German *Meisterbetrieb* (Master Craftsman), the UI must reflect mathematical exactness, high-quality materials, and the structural integrity of professional tile-laying. 

We are moving away from the "bubbly" consumer web. Our Creative North Star is **"The Digital Blueprint"**—an editorial approach that treats the screen as a high-end architectural magazine. We achieve a premium feel through sharp 0px corners, aggressive typographic scales, and a "Tonal Layering" system that replaces traditional borders with sophisticated shifts in surface color. The layout should feel "constructed" rather than just "placed."

---

## 2. Colors: Tonal Depth & The No-Line Rule
The palette is rooted in a deep, authoritative Blue (`primary`) and a precise, surgical Red (`tertiary`). To maintain a premium "Gallery" aesthetic, we avoid heavy lines that clutter the visual field.

### The "No-Line" Rule
Explicitly prohibit 1px solid borders for sectioning or card definition. Boundaries must be defined solely through background color shifts or subtle tonal transitions.
- **Surface Transitions:** Place a `surface_container_lowest` (#ffffff) card on a `surface_container` (#eeeeee) section. The contrast is the border.
- **Intentional Asymmetry:** Use color blocks that don't span the full width to create a sense of movement and "tiled" layout.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to define importance:
- **`surface_bright` (#f9f9f9):** The base canvas.
- **`surface_container_low` (#f3f3f3):** Subtle secondary content areas.
- **`surface_container_highest` (#e2e2e2):** High-contrast background for technical data or specifications.

### Signature Textures
To add "soul" to the German Engineering theme, use subtle gradients on primary CTAs. Transition from `primary` (#002975) to `primary_container` (#003da5) at a 45-degree angle. This mimics the light reflecting off a polished porcelain tile.

---

## 3. Typography: Editorial Authority
We use **Inter** exclusively. Its neutral, technical character is perfect for a brand defined by "Precision."

- **Display (display-lg/md):** Use these for massive, high-impact statements (e.g., "MEISTERBETRIEB"). Set with tight letter-spacing (-0.02em) to feel "heavy" and structural.
- **Headlines (headline-lg/md):** The primary storytelling tool. Always in `on_surface`.
- **Labels (label-md/sm):** These are our "Technical Specs." Use All-Caps with generous letter-spacing (+0.1em) to mimic architectural drawings.
- **Body (body-lg):** Keep line-height generous (1.6) to provide the "breathing room" required for a premium experience.

---

## 4. Elevation & Depth: Tonal Layering
In this design system, depth is not about "floating"; it is about "stacking."

### The Layering Principle
Depth is achieved by "stacking" the surface-container tiers. 
- **The Stack:** Place a `surface_container_lowest` (Pure White) card on top of a `surface_container` (Light Grey) background. This creates a sharp, clean lift that feels like a tile sitting on a subfloor.

### Glassmorphism & Depth
For floating navigation or "Quick Action" overlays, use a backdrop-blur (20px) with `surface_variant` at 70% opacity. This allows the colors of the flooring photography to bleed through, softening the "German Engineering" with a touch of modern luxury.

### The "Ghost Border" Fallback
If a border is absolutely required for accessibility (e.g., input fields), use the `outline_variant` (#c4c6d5) at 20% opacity. Never use 100% opaque borders.

---

## 5. Components: The Sharp Edge

### Buttons (0px Radius)
- **Primary:** `primary` background, `on_primary` text. No border. Sharp corners.
- **Secondary:** `surface_container_highest` background. Sharp corners.
- **Action:** For "Emergency" or "Book Now" actions, use the `tertiary` (#660011) to draw immediate attention against the blue.

### Input Fields
Avoid the "box" look. Use a `surface_container_low` background with a 2px bottom-border of `primary`. This mimics a measurement line on a blueprint.

### Cards & Lists
- **Forbidden:** No divider lines between list items.
- **The Solution:** Use 32px or 48px of vertical whitespace (Spacing Scale) to separate content blocks. 
- **Hover State:** On hover, a card should shift from `surface_container_lowest` to `surface_bright` with a very subtle `ambient shadow` (Color: `primary` at 4% opacity, Blur: 40px).

### The "Tile" Grid Component
A custom component for flooring galleries. Images should be edge-to-edge with 0px margins in certain "Hero" layouts to emphasize the "Perfect Fit" of the business’s craftsmanship.

---

## 6. Do’s and Don’ts

### Do:
- **Use "Meister-Level" Whitespace:** If you think there’s enough space, add 20% more.
- **Align to the Grid:** Every element must align to a strict 8px grid. Precision is the brand.
- **Mix Weights:** Use `Inter Extra Bold` for headlines and `Inter Regular` for body to create a high-end editorial contrast.

### Don’t:
- **No Rounds:** Never use `border-radius`. Not on buttons, not on cards, not on images. 
- **No Standard Dropshadows:** Avoid the "fuzzy" look of standard CSS shadows. If it doesn't look like a physical layer, don't use it.
- **No Generic Blue:** Don't default to "Link Blue." Always use our `primary` (#002975) or `on_primary_container` (#98b1ff).
- **No Icon Clutter:** Use icons sparingly. They should be "Line Art" style with 1.5px stroke weight to match the precision of the typography.