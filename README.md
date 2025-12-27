# AI Boss Challenge: Genuary 2026 / AI 老板挑战：一月创作 2026

## Overview / 概览

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

### pushing and pulling from github // only pushing to codeberg
