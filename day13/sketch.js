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
  pixelDensity(1);
  let cx = (windowWidth - cnv.width) / 2;
  let cy = (windowHeight - cnv.height) / 2;
  cnv.position(cx, cy);
  video = createCapture(VIDEO);
  video.size(160, 120); // video size is small but same ratio
  video.hide();
  bodySegmentation.detectStart(video, gotResults);

  longText = rawText.repeat(150);

  textFont("monospace");
  textSize(12);
  textLeading(12);
}

function draw() {
  background(255);

  if (segmentation && segmentation.mask) {
    // flip so it is mirrored
    push();
    translate(width, 0);
    scale(-1, 1);
    // draw small segmentation mask to whole canvas, same ratio
    image(segmentation.mask, 0, 0, width, height);
    pop();
    // text
    fill(0);
    noStroke();
    // draw text box over entire canvas in parts over black will not show
    text(longText, 0, 0, width, height);
  }
}

function gotResults(result) {
  segmentation = result;
}
