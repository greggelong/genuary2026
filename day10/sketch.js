let mx = 1;
let my = 1;

let video;
let mic;
let vol = 0;
let volSmooth = 0;
let audioStarted = false;

// ---- TEXT CONTENT ----
let slogansEN = [
  "THE NOISE IS THE FLOWER",
  "THE SOUND IS THE CURVE",
  "THE SIGNAL BENDS SPACE",
  "LISTENING IS MEASUREMENT",
  "FORM IS A CONSEQUENCE",
  "THE ENVIRONMENT SPEAKS"
];

let slogansZH = [
  "噪音即花",
  "声音即曲线",
  "信号弯曲空间",
  "聆听即测量",
  "形式是结果",
  "环境在发声"
];

let scrollX_EN = 0;
let scrollX_ZH = 0;
let sloganIndex = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  pixelDensity(1);

  strokeWeight(width * 0.03);
  noFill();

  // ---- CAMERA (ENVIRONMENT) ----
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
  noStroke();
  fill(0, 18);
  rect(0, 0, width, height);

  // audio
  vol = mic.getLevel();
  volSmooth = lerp(volSmooth, vol, 0.1);

  mx = map(volSmooth, 0, 0.2, 1, 10, true);
  my = map(abs(volSmooth - vol), 0, 0.05, 1, 10, true);

  // draw figures as light
  blendMode(SCREEN);

  push();
  fig2(width * 0.49, width / 2, height / 2);
  pop();

  push();
  fig(width * 0.49, width / 2, height / 2);
  pop();

  blendMode(BLEND);

  // scrolling text
  drawScrollingText();

  // contrast lock
  fill(0, 30);
  rect(0, 0, width, height);
}

// ---- VIDEO DRAW (CROPPED TO FILL) ----
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

// ---- SCROLLING TEXT ----
function drawScrollingText() {
  textAlign(LEFT, CENTER);
  textSize(width * 0.1);
  noStroke();

  let speed = 1;

  // Chinese (top)
  fill(255,0,0, 220);
  let zh = slogansZH[sloganIndex];
  let zhW = textWidth(zh);
  text(zh, width - scrollX_ZH, height * 0.1);
  scrollX_ZH += speed;
  if (scrollX_ZH > width + zhW + 40) {
    scrollX_ZH = 0;
  }

  // English (bottom)
  fill(255,0,0, 200);
  let en = slogansEN[sloganIndex];
  let enW = textWidth(en);
  text(en, scrollX_EN - enW, height * 0.9);
  scrollX_EN += speed;
  if (scrollX_EN > width + enW + 40) {
    scrollX_EN = 0;
    sloganIndex = (sloganIndex + 1) % slogansEN.length;
  }
}

// ---- AUDIO UNLOCK ----
function mousePressed() {
  if (!audioStarted) {
    userStartAudio();
    mic.start();
    audioStarted = true;
  }
}

function touchStarted() {
  mousePressed();
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
