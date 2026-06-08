# Animated Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static CSS grid background with a canvas-based animated grid that shifts color from green → orange → red based on remaining score.

**Architecture:** A single `<canvas id="bg-canvas">` element sits fixed behind all views. An `initBgCanvas()` function in `app.js` runs a `requestAnimationFrame` loop that draws the scrolling grid and computes the current color from `calculateScore() / 10000`. The CSS static grid on `body` is removed.

**Tech Stack:** Vanilla JS Canvas 2D API, CSS, no new dependencies.

---

### Task 1: Add canvas element to HTML and wire CSS

**Files:**
- Modify: `index.html` — add canvas as first child of `<body>`
- Modify: `style.css:19-28` — remove `background-image` lines from `body`, add canvas rule

- [ ] **Step 1: Add canvas to `index.html`**

Open `index.html`. Insert `<canvas id="bg-canvas"></canvas>` as the very first child of `<body>`, before `<!-- VIEW: START -->`:

```html
<body>
  <canvas id="bg-canvas"></canvas>

  <!-- VIEW: START -->
  <div id="view-start"></div>
  ...
```

- [ ] **Step 2: Remove static grid from `style.css` and add canvas rule**

In `style.css`, replace the `body` block's `background-image` and `background-size` lines:

Before:
```css
body {
  background: var(--bg);
  color: var(--green);
  font-family: var(--font);
  min-height: 100vh;
  background-image:
    linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

After:
```css
body {
  background: var(--bg);
  color: var(--green);
  font-family: var(--font);
  min-height: 100vh;
}

#bg-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
```

- [ ] **Step 3: Open the app in a browser and verify**

Open `index.html` directly in a browser (file:// or a local server). The start screen should show with a plain dark background — no grid, no errors in the console.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add bg-canvas element, remove static CSS grid"
```

---

### Task 2: Implement `initBgCanvas()` in `app.js`

**Files:**
- Modify: `app.js` — add `initBgCanvas()` function and call it from `DOMContentLoaded`

- [ ] **Step 1: Add `initBgCanvas()` before the `DOMContentLoaded` listener**

In `app.js`, find the line `document.addEventListener('DOMContentLoaded', () => {` (line ~834) and insert the following function directly above it:

```js
function initBgCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  const CELL = 40;
  let nodes = [];
  let offset = 0;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    nodes = [];
    for (let x = 0; x <= canvas.width + CELL; x += CELL) {
      for (let y = 0; y <= canvas.height + CELL; y += CELL) {
        if (Math.random() > 0.65) {
          nodes.push({ x, y, phase: Math.random() * Math.PI * 2, speed: 0.4 + Math.random() * 0.8 });
        }
      }
    }
  }
  window.addEventListener('resize', resize);
  resize();

  // Interpolate between green → orange → red based on ratio 0..1
  function scoreColor(ratio) {
    // ratio 1.0 = green, 0.5 = orange, 0.0 = red
    let r, g, b;
    if (ratio >= 0.5) {
      const t = (ratio - 0.5) / 0.5; // 1.0 at green, 0.0 at orange
      r = Math.round(0x00 + (0xff - 0x00) * (1 - t)); // 0 → 255
      g = Math.round(0xff + (0x88 - 0xff) * (1 - t)); // 255 → 136
      b = 0x00;
    } else {
      const t = ratio / 0.5; // 1.0 at orange, 0.0 at red
      r = 0xff;
      g = Math.round(0x88 * t);         // 136 → 0
      b = Math.round(0x44 * (1 - t));   // 0 → 68
    }
    return `rgb(${r},${g},${b})`;
  }

  function getScoreRatio() {
    if (!state.globalStartTime) return 1; // start screen: full green
    if (state.finalScore !== null && state.finalScore !== undefined) {
      return Math.min(1, state.finalScore / ESCAPE_ROOM_CONFIG.scoring.startPoints);
    }
    return Math.min(1, calculateScore() / ESCAPE_ROOM_CONFIG.scoring.startPoints);
  }

  function draw() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    offset = (offset + 0.3) % CELL;
    const t = Date.now() / 1000;
    const ratio = getScoreRatio();
    const color = scoreColor(ratio);

    // Grid lines
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.06;
    ctx.lineWidth = 0.5;
    for (let x = -CELL + offset; x <= w + CELL; x += CELL) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += CELL) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Pulsing nodes
    nodes.forEach(n => {
      const glow = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * n.speed + n.phase));
      const nx = n.x + offset;
      ctx.globalAlpha = glow * 0.7;
      ctx.beginPath();
      ctx.arc(nx, n.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      const grad = ctx.createRadialGradient(nx, n.y, 0, nx, n.y, 8);
      grad.addColorStop(0, color);
      grad.addColorStop(1, 'transparent');
      ctx.globalAlpha = glow * 0.15;
      ctx.beginPath();
      ctx.arc(nx, n.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    // Occasional scanline flash
    if (Math.random() > 0.97) {
      const y = Math.floor(Math.random() * h);
      ctx.globalAlpha = 0.04 + Math.random() * 0.03;
      ctx.fillStyle = color;
      ctx.fillRect(0, y, w, 1);
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}
```

- [ ] **Step 2: Call `initBgCanvas()` from `DOMContentLoaded`**

Find:
```js
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  render();
});
```

Replace with:
```js
document.addEventListener('DOMContentLoaded', () => {
  initBgCanvas();
  loadState();
  render();
});
```

- [ ] **Step 3: Verify in browser**

Open the app. Check:
- Start screen: animated green grid visible
- Start a game: grid continues animating
- As time passes (or after using hints/making errors), grid color shifts toward orange/red
- End screen: color is frozen at the final score color
- No console errors

- [ ] **Step 4: Commit**

```bash
git add app.js
git commit -m "feat: animated canvas background with score-based color shift"
```
