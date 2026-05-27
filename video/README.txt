Aktive Dateien
--------------
hero-loop.mp4          → Hero-Hintergrund auf index.html (autoplay, muted, loop)
images/hero/hero-poster.webp → Standbild bis Video lädt

Quellen (Veo-Exporte, nicht löschen bis Go-Live)
--------------
source/hero-veo-wide.mp4   → Weitwinkel: Fliesenleger im Bad (für Hero genutzt)
source/hero-veo-detail.mp4 → Nahaufnahme: Fliese einlegen, Nivellierclips (Referenz/B-Roll)

Neues Veo-Video einbinden
--------------
1. Wide-Shot nach source/hero-veo-wide.mp4 kopieren
2. ffmpeg -i video/source/hero-veo-wide.mp4 -c:v libx264 -crf 26 -an -movflags +faststart video/hero-loop.mp4
3. Poster: ffmpeg -i video/hero-loop.mp4 -ss 00:00:01.5 -frames:v 1 -update 1 images/hero/hero-poster.jpg
           ffmpeg -i images/hero/hero-poster.jpg -q:v 82 images/hero/hero-poster.webp
