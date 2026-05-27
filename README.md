# Fliesen Weber – Website

Statische Site (HTML/CSS/JS), One-Page `index.html` + Unterseiten.

## Ordner

| Pfad | Inhalt |
|------|--------|
| `index.html` | Startseite mit `#hero`, `#vorher-nachher`, `#termin`, … |
| `leistungen/` | Badsanierung, Fliesenverlegung, Renovierung |
| `images/compare/` | Vorher/Nachher WebP |
| `images/hero/` | Seitenbilder + `hero-poster.webp` |
| `images/portfolio/` | Referenz-WebP |
| `video/hero-loop.mp4` | Hero-Video (aus `video/source/hero-veo-wide.mp4`) |
| `video/source/` | Original-Veo-Dateien (Wide + Detail) |
| `docs/VEO_PROMPTS.md` | Prompts für weitere Exporte |

## Dev-Server

```bash
npm install
npm run dev
```

## Hero-Videos

- **Wide** (`hero-veo-wide.mp4`) → wird zu `hero-loop.mp4` (Website)
- **Detail** (`hero-veo-detail.mp4`) → Nahaufnahme, nur Archiv/Referenz

Keine MP4s in `images/` ablegen – nur unter `video/`.
