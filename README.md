# AI Boss Challenge: Genuary 2026 / AI 老板挑战：一月创作 2026

## Overview / 概览

## note I quickly gave up the challenge of only vanilla javascript.

for most of them I start with my own code then search for something and want to create

something more interesting and turn to ai to help with code

The **AI Boss** has issued a directive for this year's generative art challenge:  
Your task is to participate in **Genuary 2026** by following the AI Boss’ instructions — not your own impulses.  
You will code **only in vanilla JavaScript**, without AI assistance or external libraries, following old-school, explicit coding practices.

**AI 老板**今年下达了指令：  
你必须遵循 AI 老板的要求参与 **一月创作 2026** —— 而非随意发挥。  
任务要求：**只使用原生 JavaScript** 编程，不允许使用 AI 辅助或外部库，严格遵循传统编码方式。

> Key idea: p5.js offers fluency. Vanilla JavaScript offers responsibility. The AI Boss demands that memory, labor, and destruction are handled explicitly in your generative work.  
> 核心理念：p5.js 提供流畅性，原生 JavaScript 提供责任感。AI 老板要求在你的生成作品中明确管理记忆、劳动和破坏。

---

# Vanilla JS / p5.js Cheat Sheet - Complete

A practical reference for generative artists moving from p5.js to vanilla JavaScript, covering drawing, animation, mouse and webcam interaction, Perlin noise, offscreen graphics, and more.

---

## 1. Mental Model Shift

- **p5.js** hides the machinery: global functions, an implicit canvas, and an automatic draw loop.
- **Vanilla JavaScript** exposes everything: you create the canvas, obtain a drawing context, and explicitly manage time, state, and memory.

---

## 2. Canvas vs Context (ctx)

- **Canvas** = the HTML element in the DOM.
- **Context (ctx)** = the drawing API defining how marks are made and storing drawing state.

---

## 3. Setup & Canvas Creation

```javascript
// p5.js
createCanvas(800, 600);

// Vanilla JS
const canvas = document.getElementById("myCanvas");
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext("2d");
```

---

## 4. Drawing Primitives

```javascript
// Line
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(200, 100);
ctx.stroke();

// Rectangle
ctx.fillStyle = "red";
ctx.fillRect(50, 150, 100, 50);

// Ellipse / Circle
ctx.beginPath();
ctx.ellipse(300, 200, 50, 30, 0, 0, Math.PI * 2);
ctx.fillStyle = "blue";
ctx.fill();
ctx.closePath();
```

---

## 5. Stroke, Fill, and State

```javascript
ctx.strokeStyle = "black"; // stroke color
ctx.fillStyle = "orange"; // fill color
ctx.lineWidth = 5; // stroke weight
```

---

## 6. push() / pop() vs save() / restore()

- **p5.js:** push() / pop()
- **Vanilla JS:** ctx.save() / ctx.restore()
- Saves and restores the drawing state (transforms, styles), not pixels.

---

## 7. Animation Loop

```javascript
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // drawing code
  requestAnimationFrame(loop);
}

loop();
```

---

## 8. Clearing the Canvas

- Use `ctx.clearRect(0,0,width,height)` to erase previous pixels.
- Use alpha in `fillStyle` for trails or partial decay effects.

---

## 9. Offscreen Canvas / createGraphics

```javascript
const offscreen = document.createElement("canvas");
offscreen.width = 200;
offscreen.height = 200;
const offCtx = offscreen.getContext("2d");

offCtx.fillStyle = "green";
offCtx.fillRect(0, 0, 200, 200);

// Draw offscreen onto main canvas
ctx.drawImage(offscreen, 100, 100);
```

---

## 10. Mouse Interaction

```javascript
let mouseX = 0,
  mouseY = 0;

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

canvas.addEventListener("mousedown", (e) => {
  console.log("Mouse pressed at", mouseX, mouseY);
});
```

---

## 11. Webcam Input

```html
<video id="webcam" width="320" height="240" autoplay></video>
```

```javascript
const video = document.getElementById("webcam");
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error(err);
  });

// Draw webcam video to canvas
ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
```

---

## 12. Perlin Noise

```javascript
// Using noisejs
const noise = new Noise(Math.random());
let xoff = 0;

function drawNoise() {
  let n = noise.perlin2(xoff, 0);
  let y = ((n + 1) / 2) * canvas.height;
  ctx.fillRect((xoff * 100) % canvas.width, y, 2, 2);
  xoff += 0.01;
}
```

- `noise.perlin2(x, y)` returns values [-1, 1]
- Useful for smooth, organic motion or shapes.

---

## 13. Saving Canvas as Image

```javascript
const dataURL = canvas.toDataURL("image/png");
const link = document.createElement("a");
link.href = dataURL;
link.download = "myArtwork.png";
link.click();
```

---

## 14. AI Boss Philosophy

> Key idea: p5.js offers fluency. Vanilla JavaScript offers responsibility. Generative work in vanilla makes memory, labor, and destruction explicit.
> The AI Boss instructs the art worker to decouple from AI and rely only on the fundamentals.

```


```

### pushing and pulling from github // only pushing to codeberg.

```
git push codeberg main

```

---

# CORE VANILLA JS CHEAT SHEET

_(Mapped to Genuary prompts)_

---

## 0. Absolute base (EVERY DAY)

```js
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;
```

Clear frame:

```js
ctx.clearRect(0, 0, canvas.width, canvas.height);
```

---

## 1. Drawing primitives

**Days:** Jan 1, 5, 12, 20, 21

### Rectangle

```js
ctx.fillStyle = "black";
ctx.fillRect(x, y, w, h);
```

### Circle

```js
ctx.beginPath();
ctx.arc(x, y, r, 0, Math.PI * 2);
ctx.fill();
```

### Line / Path

```js
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();
```

---

## 2. Animation loop (time is explicit)

**Days:** Jan 2, 6, 16, 18, 27

```js
let lastTime = 0;

function animate(time) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  update(dt);
  draw();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

---

## 3. State + interaction

**Days:** Jan 6, 7, 18, 30

```js
let lightOn = false;

document.addEventListener("click", () => {
  lightOn = !lightOn;
});
```

Keyboard:

```js
document.addEventListener("keydown", (e) => {
  if (e.key === " ") paused = !paused;
});
```

---

## 4. Grids + indexing

**Days:** Jan 4, 9, 12, 19, 26

### 2D grid

```js
const cols = 16;
const rows = 16;
const grid = Array.from({ length: rows }, () =>
  Array.from({ length: cols }, () => Math.random() > 0.5)
);
```

### Render grid

```js
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    if (grid[y][x]) {
      ctx.fillRect(x * cellW, y * cellH, cellW, cellH);
    }
  }
}
```

---

## 5. Pixels & low resolution

**Days:** Jan 4, 13, 19

```js
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data; // RGBA array
```

Access pixel:

```js
const i = (y * canvas.width + x) * 4;
const r = data[i];
const g = data[i + 1];
const b = data[i + 2];
```

---

## 6. Camera (self portrait, mirrors)

**Days:** Jan 13

```js
const video = document.createElement("video");

navigator.mediaDevices
  .getUserMedia({
    video: {
      width: { ideal: 320 },
      height: { ideal: 240 },
      facingMode: "user",
    },
    audio: false,
  })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  });
```

Draw camera frame:

```js
ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
```

Mirror:

```js
ctx.save();
ctx.scale(-1, 1);
ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
ctx.restore();
```

---

## 7. Offscreen canvas (shadows, lowres, composition)

**Days:** Jan 4, 15, 23

```js
const off = document.createElement("canvas");
off.width = 100;
off.height = 100;
const offCtx = off.getContext("2d");
```

Draw offscreen → scale up:

```js
ctx.imageSmoothingEnabled = false;
ctx.drawImage(off, 0, 0, canvas.width, canvas.height);
```

---

## 8. Recursion

**Days:** Jan 3, 12, 26

```js
function split(x, y, w, h, depth) {
  if (depth <= 0) {
    ctx.strokeRect(x, y, w, h);
    return;
  }

  split(x, y, w / 2, h / 2, depth - 1);
  split(x + w / 2, y, w / 2, h / 2, depth - 1);
}
```

---

## 9. Fibonacci / sequences

**Days:** Jan 3

```js
function fibonacci(n) {
  let a = 0,
    b = 1;
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
  }
  return a;
}
```

Use as size / spacing.

---

## 10. Polar coordinates

**Days:** Jan 10

```js
const x = cx + r * Math.cos(angle);
const y = cy + r * Math.sin(angle);
```

---

## 11. Noise (simple Perlin-style)

**Days:** Jan 16, 25

```js
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function noise1D(x) {
  const i = Math.floor(x);
  const f = x - i;
  const a = Math.random(); // cache for real noise
  const b = Math.random();
  return lerp(a, b, f);
}
```

(Real Perlin = more bookkeeping — this teaches the idea.)

---

## 12. Transformations & symmetry

**Days:** Jan 17

```js
ctx.save();
ctx.translate(cx, cy);
ctx.rotate(angle);
ctx.scale(-1, 1);
drawShape();
ctx.restore();
```

---

## 13. One line / path memory

**Days:** Jan 18, 20

```js
ctx.beginPath();
points.forEach((p, i) => {
  if (i === 0) ctx.moveTo(p.x, p.y);
  else ctx.lineTo(p.x, p.y);
});
ctx.stroke();
```

---

## 14. DOM only (no canvas)

**Days:** Jan 28

```js
const div = document.createElement("div");
div.style.width = "20px";
div.style.height = "20px";
div.style.background = "black";
document.body.appendChild(div);
```

Grid via CSS:

```css
body {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
}
```

---

## 15. Genetic systems

**Days:** Jan 29

```js
function mutate(value, rate = 0.1) {
  if (Math.random() < rate) {
    return value + (Math.random() - 0.5);
  }
  return value;
}
```

---

## 16. Shader day (minimal setup)

**Days:** Jan 31

```js
const gl = canvas.getContext("webgl");
```

(Everything after this is pain — intentionally.)

---

## Final Art Worker Principle

> p5.js hid **systems**.
> Vanilla JS exposes **mechanisms**.
> This cheat sheet is not about beauty — it’s about control.
