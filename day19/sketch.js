let video;
let gridSize = 16;
let cellSize;
let pixels = [];
let brightness = []; // Store brightness values
let shimmerSound;
let lastSoundTime = 0;
let soundCooldown = 500; // milliseconds between sound triggers
let darkThresholdSlider;
let countThresholdSlider;

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("sketch-container");

  cellSize = width / gridSize;
  ellipseMode(CENTER);

  // Load shimmering sound
  shimmerSound = loadSound("shim.mp3");

  // Initialize webcam capture
  video = createCapture(VIDEO, { flipped: true });
  video.size(gridSize, gridSize);
  video.hide();
  noStroke();

  // Initialize pixel array
  pixels = new Array(gridSize * gridSize).fill(0);
  brightness = new Array(gridSize * gridSize).fill(0);

  // Get slider from HTML and update display
  darkThresholdSlider = document.getElementById("darkThresholdSlider");
  darkThresholdSlider.addEventListener("input", function () {
    document.getElementById("threshold-value").textContent = this.value;
  });

  countThresholdSlider = document.getElementById("countThresholdSlider");
  countThresholdSlider.addEventListener("input", function () {
    document.getElementById("count-value").textContent = this.value;
  });
}

function draw() {
  background(200);

  // Get pixels from the 16x16 webcam feed
  video.loadPixels();

  // Extract brightness values from each pixel
  for (let i = 0; i < video.pixels.length; i += 4) {
    // Calculate which grid position this pixel belongs to
    let pixelIndex = i / 4;

    // Get RGBA values
    let r = video.pixels[i];
    let g = video.pixels[i + 1];
    let b = video.pixels[i + 2];
    let a = video.pixels[i + 3];

    // Store all 4 values as array
    pixels[pixelIndex] = [r, g, b, a];

    // Calculate and store brightness once
    brightness[pixelIndex] = (r + g + b) / 3;
  }

  // Draw grid based on pixel brightness
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let index = row * gridSize + col;
      let b = brightness[index];

      // Map brightness to color
      fill(b);
      //stroke(100);
      //strokeWeight(1);

      // Draw cell - darker ellipses are bigger
      let x = col * cellSize + cellSize / 2;
      let y = row * cellSize + cellSize / 2;
      let size = map(b, 0, 255, cellSize, 0);
      ellipse(x, y, size, size);
    }
  }

  // Check if there are many dark ellipses
  let darkCount = 0;
  let brightnessTreshold = parseInt(darkThresholdSlider.value);
  for (let i = 0; i < brightness.length; i++) {
    if (brightness[i] < brightnessTreshold) {
      darkCount++;
    }
  }

  // Trigger sound if dark count exceeds threshold and cooldown has passed
  let countThreshold = parseInt(countThresholdSlider.value);
  if (darkCount > countThreshold && millis() - lastSoundTime > soundCooldown) {
    if (shimmerSound.isLoaded()) {
      console.log(
        "Sound triggered! Dark count:",
        darkCount,
        "Count threshold:",
        countThreshold,
        "Brightness threshold:",
        brightnessTreshold,
      );
      shimmerSound.play();
      lastSoundTime = millis();
    }
  }
}
