let cam;
let tileSize; // will compute dynamically
let tilesX, tilesY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  // Webcam capture (mirrored)
  cam = createCapture(VIDEO, {
    //facingMode: "environment",
    flipped: true,
    audio: false,
  });
  cam.size(320, 240);
  cam.hide();

  computeTileSize();
}

function draw() {
  background(255);

  for (let y = 0; y < height; y += tileSize) {
    for (let x = 0; x < width; x += tileSize) {
      // Map canvas coordinates to webcam coordinates
      let sx = int(map(x, 0, width, 0, cam.width - tileSize));
      let sy = int(map(y, 0, height, 0, cam.height - tileSize));

      image(
        cam,
        x,
        y,
        tileSize,
        tileSize, // destination on canvas
        sx,
        sy,
        tileSize,
        tileSize, // source from camera
      );
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  computeTileSize();
}

// Compute tile size so they stay square and evenly fill the screen
function computeTileSize() {
  // Choose approximately 15 tiles across the smaller dimension
  let minDim = min(windowWidth, windowHeight);
  let desiredTiles = 15;
  tileSize = floor(minDim / desiredTiles);
}
