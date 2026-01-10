let mx = 1;
let my = 1;

let video;
let mic;
let vol = 0;
let volSmooth = 0;
let audioStarted = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  pixelDensity(1);

  stroke(255);
  strokeWeight(width * 0.03);
  noFill();

  // ---- CAMERA SETUP (environment) ----
  let constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 1280 },
      height: { ideal: 720 }
    },
    audio: false
  };

  video = createCapture(constraints);
  video.hide();

  // ---- MICROPHONE ----
  mic = new p5.AudioIn();
}

function draw() {
  drawVideoFill();

  // temporal fade (motion memory)
  fill(0, 18);
  noStroke();
  rect(0, 0, width, height);

  // get mic volume
  vol = mic.getLevel();
  volSmooth = lerp(volSmooth, vol, 0.1);

  // audio mappings
  mx = map(volSmooth, 0, 0.2, 1, 10, true);
  my = map(abs(volSmooth - vol), 0, 0.05, 1, 10, true);

  // optical blending for figures
  blendMode(SCREEN);

  push();
  fig2(width * 0.49, width / 2, height / 2);
  pop();

  push();
  fig(width * 0.49, width / 2, height / 2);
  pop();

  blendMode(BLEND);

  // contrast lock (stabilizes phone exposure)
  fill(0, 30);
  rect(0, 0, width, height);
}

// ---- VIDEO DRAW (cropped to fill canvas) ----
function drawVideoFill() {
  let videoAspect = video.width / video.height;
  let canvasAspect = width / height;

  let drawW, drawH;

  if (videoAspect > canvasAspect) {
    drawH = height;
    drawW = height * videoAspect;
  } else {
    drawW = width;
    drawH = width / videoAspect;
  }

  tint(220); // slight desaturation
  image(
    video,
    (width - drawW) / 2,
    (height - drawH) / 2,
    drawW,
    drawH
  );
  noTint();
}

// ---- FIGURES ----
function fig(r, px, py) {
  stroke(220, 255, 0, 180);
  translate(px, py);
  beginShape();
  for (let theta = 0; theta < 361; theta++) {
    let x = cos(theta * mx) * r;
    let y = sin(theta * my) * r;
    vertex(x, y);
  }
  endShape();
}

function fig2(r, px, py) {
  stroke(255, 0, 153, 160);
  translate(px, py);
  beginShape();
  for (let theta = 0; theta < 361; theta++) {
    let x = cos(theta) * r * cos(theta * mx);
    let y = sin(theta) * r * cos(theta * mx);
    vertex(x, y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// ---- AUDIO UNLOCK ----
function mousePressed() {
  if (!audioStarted) {
    userStartAudio();
    mic.start();
    audioStarted = true;
    console.log("Audio unlocked");
  }
}

function touchStarted() {
  mousePressed();
  return false;
}
