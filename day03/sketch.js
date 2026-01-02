let fibstring = "";
let fibarray = [1, 1];
let polySynth, reverb, myPart, score;
let currentIndex = 0;
let scaleNotes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"];
let cnv;
function setup() {
  cnv = createCanvas(800, 494);
  let cx = (windowWidth - cnv.width) / 2;
  let cy = (windowHeight - cnv.height) / 2;
  cnv.position(cx, cy);
  angleMode(DEGREES);

  let cellSize = 40;
  let cols = 20;
  let totalSlots = cols * floor(height / cellSize);

  generateFibToLimit(totalSlots);
  score = fibstring.split("").map(Number);

  reverb = new p5.Reverb();
  polySynth = new p5.PolySynth();
  reverb.process(polySynth, 4, 2);

  let myPhrase = new p5.Phrase(
    "fib",
    (time, d) => {
      let noteToPlay = scaleNotes[d % scaleNotes.length];
      polySynth.play(noteToPlay, 0.4, time, 0.3);
      currentIndex = (currentIndex + 1) % score.length;
    },
    score
  );

  myPart = new p5.Part();
  myPart.addPhrase(myPhrase);
  myPart.setBPM(90);
}

function draw() {
  background(15);

  // 1. DRAW THE GRID
  drawGrid();

  // 2. DRAW THE SPIRAL (Mathematical Logic)
  push();
  noFill();
  stroke(255, 255, 0);
  strokeWeight(4);

  // This calculates how many "steps" of the spiral to draw based on music progress
  let maxSteps = floor(map(currentIndex, 0, score.length, 1, 10));

  // Starting parameters for the 800x494 Golden Rectangle
  let w = 494; // Size of the first square
  let x = 0;
  let y = 0;

  for (let i = 0; i < maxSteps; i++) {
    // Draw the arc based on the current square 'w'
    // The direction and center change every 90 degrees
    if (i % 4 === 0) arc(x + w, y + w, w * 2, w * 2, 180, 270);
    else if (i % 4 === 1) arc(x, y + w, w * 2, w * 2, 270, 360);
    else if (i % 4 === 2) arc(x, y, w * 2, w * 2, 0, 90);
    else if (i % 4 === 3) arc(x + w, y, w * 2, w * 2, 90, 180);

    // Update coordinates to the NEXT smaller golden square
    let nextW = (w * (sqrt(5) - 1)) / 2; // Golden Ratio scaling

    if (i % 4 === 0) x += w;
    else if (i % 4 === 1) {
      x += w - nextW;
      y += w;
    } else if (i % 4 === 2) {
      x -= nextW;
      y += w - nextW;
    } else if (i % 4 === 3) {
      y -= nextW;
    }

    w = nextW; // Shrink for next iteration
  }
  pop();
}

function drawGrid() {
  let cellSize = 40;
  let cols = 20;
  let gap = 2;
  for (let i = 0; i < score.length; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let gx = col * cellSize;
    let gy = row * cellSize;

    if (i <= currentIndex) {
      let digit = score[i];
      let shade = map(digit, 0, 9, 40, 180);
      fill(shade);
      noStroke();
      rect(gx + gap, gy + gap, cellSize - gap * 2, cellSize - gap * 2);
      fill(shade > 120 ? 0 : 255, 150);
      textAlign(CENTER, CENTER);
      text(digit, gx + cellSize / 2, gy + cellSize / 2);
    } else {
      stroke(35);
      noFill();
      rect(gx + gap, gy + gap, cellSize - gap * 2, cellSize - gap * 2);
    }
  }
}

function generateFibToLimit(limit) {
  fibstring = "11";
  let i = 0;
  while (fibstring.length < limit) {
    let nextfib = fibarray[i] + fibarray[i + 1];
    fibarray.push(nextfib);
    fibstring += nextfib;
    i++;
  }
  fibstring = fibstring.substring(0, limit);
}

function mousePressed() {
  userStartAudio();
  if (myPart.isPlaying) myPart.stop();
  else myPart.loop();
}
