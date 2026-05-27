# Veo-Prompts – Fliesen Weber

Nach Export Dateien ersetzen:

- `images/compare/bad-before.webp`
- `images/compare/bad-after.webp`
- `video/source/hero-veo-wide.mp4` → daraus `video/hero-loop.mp4` bauen (siehe `video/README.txt`)
- `video/source/hero-veo-detail.mp4` → Nahaufnahme (Archiv, nicht als Hero)
- `images/hero/hero-poster.webp` (Frame aus `hero-loop.mp4`)

**Hinweis:** Veo-Videos nicht in `images/` speichern – nur unter `video/source/`.

## Prompt 1 – Vorher (Badezimmer)

```
Photorealistic interior photograph, German apartment bathroom BEFORE renovation, same fixed camera angle: straight-on view of full bathroom from doorway, eye level 1.5m. Small bathroom approx 6m2, 1980s-2000s condition: dated beige wall tiles with dark grout stains, old bathtub with chipped enamel, plastic shower hose, yellowed silicone joints, brown water spots, dim warm ceiling light, no plants, no luxury. Slightly cluttered: old towel on rack, simple mirror cabinet. Muted natural colors, realistic shadows, documentary style, high detail, sharp focus, 16:10 aspect ratio. Empty room, no people. NOT modern, NOT finished, NOT hotel style.
```

Negative: `modern luxury bathroom, marble, walk-in shower only, finished renovation, bright spa, people, faces, text overlay, logo, watermark, fisheye, cartoon, CGI look, two different room layouts`

## Prompt 2 – Nachher (Referenz: Vorher-Bild)

```
Photorealistic interior photograph, EXACT SAME bathroom room and camera angle as reference image: straight-on from doorway, eye level 1.5m, same window position, same room proportions. AFTER professional tile renovation by German master tiler: new large-format light grey porcelain wall tiles, clean white grout lines, new modern bathtub or shower area with glass screen, fresh white silicone, new chrome fixtures, LED ceiling light, spotless floor tiles. Bright but natural daylight from window, premium craftsman finish, realistic, high detail, 16:10, no people, no text, no watermark. Same architecture as before photo, only upgraded surfaces and fixtures.
```

## Prompt 3 – Hero-Video (6–8 s Loop)

```
Cinematic documentary video, German tile installer at work on residential bathroom floor, medium-wide shot. Professional craftsman age 40-55, work clothes: dark blue work pants, grey t-shirt, knee pads, no visible brand logos. Kneeling and precisely laying large format porcelain floor tiles, using tile leveling clips, rubber mallet, measuring, applying thinset. Clean focused movements, dust particles in warm side light from window. Shallow depth of field, slow smooth camera dolly slightly right, realistic job site, not staged advertising. Color grade: natural, trustworthy, slight warm tone matching craftsman website. 6 seconds, seamless loop, no talking, no text, no subtitles, no faces looking at camera, hands and tiles in focus. Photorealistic, 24fps feel.
```

## ffmpeg (nach Export)

```powershell
ffmpeg -i hero-veo.mp4 -c:v libx264 -crf 23 -an -movflags +faststart video/hero-loop.mp4
ffmpeg -i video/hero-loop.mp4 -ss 00:00:01 -vframes 1 images/hero/hero-poster.webp
```
