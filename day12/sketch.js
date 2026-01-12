var video;
var vScale = 24; // The size of each input box
var slider;
var cols, rows;
var boxes = [];
let txt =["马"]
function setup() {
  noCanvas();
  pixelDensity(1);

  // 1. Calculate how many boxes fit the screen
  cols = floor(windowWidth / vScale);
  rows = floor(windowHeight / vScale);

  // 2. Setup Video
  video = createCapture(VIDEO);
  video.size(cols, rows);
  video.hide(); // Hide the actual video feed

  /*slider = createSlider(0, 255, 77);
  slider.style('position', 'fixed');
  slider.style('bottom', '10px');
  slider.style('left', '10px');
  slider.style('z-index', '100');*/

  // Inside setup()
  slider = createSlider(0, 255, 77);

  // Position it at the bottom center
  slider.style("position", "fixed");
  slider.style("bottom", "40px");
  slider.style("left", "50%");
  slider.style("transform", "translateX(-50%)"); // Perfect centering
  slider.style("z-index", "1000"); // Keep it above the "boxes"

  // 3. Force the container to be full screen and remove gaps
  var container = select("#mirror");
  if (!container) {
    container = createDiv();
    container.id("mirror");
  }
  container.style("line-height", "0"); // Removes vertical gaps between rows
  container.style("font-size", "0"); // Removes horizontal gaps between inputs

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var box = createInput("我");
      box.parent(container);

      // Box size based on vScale
      box.style("width", vScale + "px");
      box.style("height", vScale + "px");
      box.style("padding", "0px");
      box.style("margin", "0px");
      box.style("border", "none"); // Remove borders for a "cleaner" look
      box.style("text-align", "center");
      box.style("font-size", vScale * 0.6 + "px"); // Scale font with box size
      box.style("box-sizing", "border-box");

      boxes.push(box);
    }
    // No linebreaks needed if container has correct width and line-height
  }
}

function draw() {
  video.loadPixels();

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      // Mirroring logic (horizontal flip)
      var index = (cols - x - 1 + y * cols) * 4;

      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var bright = (r + g + b) / 3;

      var threshold = slider.value();
      var checkIndex = x + y * cols;
      const cb = boxes[checkIndex];

      if (cb) {
        if (bright > threshold) {
          cb.value("");
          cb.style("background-color", "white");
        } else {
          cb.value(random(txt));
          cb.style("background-color", "#ff0000");
        }
      }
    }
  }
}