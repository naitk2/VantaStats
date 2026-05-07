# VantaStats

🌑 A premium, ultra-dark custom lobby scoreboard. Engineered for speed, minimal UI, and zero-latency state management. Track the W, ignore the noise.

> Built for the sweats. This isn't just a scoreboard; it's a statement. Designed for gamers who need a clean, lag-free way to track their custom lobby dominance. No more “wait, what was the score?”—just pure, unadulterated data tracking. Built with focus, caffeine, and a refusal to use basic buttons.

## Features

- **Two-team scoreboard:** Emerald Team Alpha vs. Violet Team Omega cards with glassmorphism panels and neon borders.
- **Instant controls:** Large `+` and `−` controls update score and kills immediately from a single JavaScript state object.
- **Dynamic naming:** Click either team name to rename the squad for the current lobby.
- **Winner overlay:** Reaching match point opens a celebratory winner dialog with score and kill context.
- **Nuclear reset:** One button clears scores and kills for the next round.
- **Persistent state:** Local storage keeps names, scores, kills, and match point alive across refreshes.
- **Responsive layout:** The UI scales from desktop command centers to phone screens.

## Run locally

Open `index.html` in any modern browser, or serve the directory with a static server:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Tech stack

- Semantic HTML5
- CSS3 Grid/Flexbox with responsive glassmorphism styling
- Vanilla JavaScript state management with `localStorage`
