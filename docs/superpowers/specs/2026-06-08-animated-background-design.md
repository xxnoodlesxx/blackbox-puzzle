# Animated Background — Design Spec
Date: 2026-06-08

## Overview

Replace the static CSS grid background with a canvas-based animated grid that slowly shifts color based on the player's current score.

## Visual Behaviour

### Grid Animation
- A `<canvas>` element sits fixed behind all views (`position: fixed; inset: 0; z-index: -1`)
- The grid scrolls slowly in a diagonal direction (~0.3px per frame)
- Intersection nodes pulse with a soft glow (random phase offsets, independent timing)
- Rare scanline flashes: a single horizontal line briefly brightens (probability ~3% per frame)
- Animation runs via `requestAnimationFrame`; canvas resizes on `window.resize`

### Color System
Grid color interpolates across three stops based on `scoreRatio = calculateScore() / 10000`:

| scoreRatio | Color   | Hex      |
|------------|---------|----------|
| 1.0        | Grün    | #00ff41  |
| 0.5        | Orange  | #ff8800  |
| 0.0        | Rot     | #ff4444  |

Linear RGB interpolation between adjacent stops. The color applies to all grid lines, node glows, and scanline flashes.

### Per-Screen Behaviour
- **Startscreen**: `scoreRatio = 1.0` (green) — no game in progress
- **Spielscreen**: `scoreRatio` recalculated live each frame via `calculateScore()`
- **Endscreen**: color frozen at `state.finalScore / 10000` from the moment the game ended

## Implementation

### `index.html`
Add `<canvas id="bg-canvas"></canvas>` as the first child of `<body>`, before all view divs.

### `style.css`
Remove `background-image` (the static CSS grid lines) from `body`. Keep `background: var(--bg)` as the solid base color.

### `app.js`
Add a self-contained `initBgCanvas()` function (~60 lines) called once on page load. It:
1. Sizes the canvas to `window.innerWidth × window.innerHeight`
2. Adds a `resize` listener to re-size and recompute grid nodes
3. Runs a `requestAnimationFrame` loop that:
   - Computes `scoreRatio` (returns 1.0 when no game is running)
   - Interpolates the RGB color from the three stops
   - Draws scrolling grid lines, pulsing nodes, occasional scanline flash

No new files. No new dependencies. `calculateScore()` and `state` are already in scope.

## Constraints
- Canvas must not interfere with clicks/interactions on views above it (`pointer-events: none`)
- Must stay performant: target 60fps on a mid-range laptop
- Color must not be jarring — transitions are smooth because score changes gradually
