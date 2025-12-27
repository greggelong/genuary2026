const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
const video = document.getElementById("webcam");
const density = "Ñ@#W$9876543210?!abc;:+=-,._            ";

// 1. Off-screen Graphics (Buffer)
const offscreen = document.createElement("canvas");
const offCtx = offscreen.getContext("2d");

let width, height;

async function setup() {
  width = canvas.width = offscreen.width = window.innerWidth;
  height = canvas.height = offscreen.height = window.innerHeight;

  // 2. Web Cam Setup
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    console.error("Webcam access denied", err);
  }

  draw();
}

function draw() {
  requestAnimationFrame(draw);

  // 1. Clear the screen
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  // 2. Mirror and draw video to offscreen buffer
  offCtx.save();
  offCtx.translate(width, 0);
  offCtx.scale(-1, 1);
  offCtx.drawImage(video, 0, 0, width, height);
  offCtx.restore();

  // 3. Get the pixel data
  const imgData = offCtx.getImageData(0, 0, width, height);
  const pixels = imgData.data;

  // 4. Set text style
  const resolution = 12; // How many pixels to skip (font size)
  ctx.font = `${resolution}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "black";

  // 5. Loop through the grid
  for (let y = 0; y < height; y += resolution) {
    for (let x = 0; x < width; x += resolution) {
      const i = (y * width + x) * 4;
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];

      // Calculate brightness (0 to 255)
      const avg = (r + g + b) / 3;

      // Map brightness to the density string index
      // Formula: (brightness / 255) * (length - 1)
      const charIndex = Math.floor((avg / 255) * (density.length - 1));
      const char = density[charIndex];

      // Draw the character
      ctx.fillText(char, x, y);
    }
  }
}
setup();
