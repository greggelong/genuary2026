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
  pixelDensity(1)

  stroke(255);
  strokeWeight(width*0.03);
  noFill();

  // ---- CAMERA SETUP ----
  let constraints = {
    video: {
      facingMode: "environment", // change to "environment" for rear camera
      width: { ideal: 320 },
      height: { ideal: 720 }
    },
    audio: false
  };

  video = createCapture(constraints);
  video.size(width, height);
  video.hide(); // important: we draw it manually

  // ---- MICROPHONE SETUP ----
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  // draw webcam as background
  image(video, 0, 0, width, height);

  // get mic volume
  vol = mic.getLevel();

  // smooth it so it’s less jittery
  volSmooth = lerp(volSmooth, vol, 0.1);

  // ---- MAPPING MIC TO VALUES ----
  // mx responds directly to volume
  mx = map(volSmooth, 0, 0.2, 1, 10, true);

  // OPTION A: inverse mapping (simple & stable)
  // my = map(volSmooth, 0, 0.2, 10, 1, true);

  // OPTION B: delayed / derived value (more dynamic)
  my = map(abs(volSmooth - vol), 0, 0.05, 1, 10, true);

 
  push();
  fig2(width*0.49, width / 2, height / 2);
  pop();

   push();
  fig(width*0.49, width / 2, height / 2);
  pop();

}

function fig(r, px, py) {
  stroke(220, 255, 0);
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
  stroke(255, 0, 153);
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
  video.size(width, height);
}


function mousePressed() {
  if (!audioStarted) {
    userStartAudio();   // unlocks AudioContext
    mic.start();        // starts microphone
    audioStarted = true;
    console.log("Audio unlocked");
  }
}
function touchStarted() {
  mousePressed();
  return false;
}
