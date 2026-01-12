let bodySegmentation;
let video;
let segmentation;
let rawText =
  "Our life is what our thoughts make it. The soul becomes dyed with the color of its thoughts. Very little is needed to make a happy life; it is all within yourself. Waste no more time arguing about what a good man should be. Be one. ";
let longText;
let cnv;

function preload() {
  bodySegmentation = ml5.bodySegmentation("SelfieSegmentation", {
    maskType: "person",
  });
}

function setup() {
  cnv = createCanvas(640, 480);
  let cx = (windowWidth - cnv.width) / 2;
  let cy = (windowHeight - cnv.height) / 2;
  cnv.position(cx, cy);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  bodySegmentation.detectStart(video, gotResults);
  pixelDensity(1);
  longText = rawText.repeat(150);

  textFont("monospace");
  textSize(12);
  textLeading(12);
}

function draw() {
  background(255);

  if (segmentation && segmentation.mask) {
    // 1. Flip ONLY the mask image
    push();
    translate(width, 0);
    scale(-1, 1);
    image(segmentation.mask, 0, 0, width, height);
    pop();
    // Now the coordinate system is back to normal!

    // 2. Draw the text normally (readable from left to right)
    fill(0);
    noStroke();

    // The black text will still "disappear" into the black background
    // of the flipped mask, but the letters stay facing the right way.
    text(longText, 0, 0, width, height);
  }
}

function gotResults(result) {
  segmentation = result;
}
