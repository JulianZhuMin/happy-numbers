# Happy Numbers 快樂數字

A Cantonese number-learning game for toddlers aged 2–4 (best in landscape on an iPhone or iPad). One page (`index.html`) with inline CSS and JS, no external copyrighted assets. Number buttons are drawn in CSS, sound effects use Web Audio, and voice lines are pre-recorded clips in `audio/` (edge-tts: `zh-HK-HiuGaaiNeural` / `en-US-AnaNeural`).

Play it: https://julianzhumin.github.io/happy-numbers/

## How it works

1. **Intro** — numbers 1–10 are highlighted one by one; each is spoken in Cantonese then English.
2. **Quiz** — all ten numbers stay on screen. A number is called at random (Cantonese + English, no repeats). Tap the matching number.
3. **Correct** — the number hops, colorful bubbles appear, and a cheer plays.
4. **Wrong** — uh-oh, then the next unasked number (the asked number is not repeated).
5. **End** — waving hand + bye-bye, then parent can play again (skips intro) or return to [AstraGarten](https://julianzhumin.github.io/AstraGarten/).

## Offline

A service worker caches the page and audio. Bump `CACHE` in `sw.js` and `APP_VERSION` in `index.html` together on each release.
