let buildings = [];
        let baseLineY;
        let capture;
        let words = ["PROGRESS", "STRENGTH", "INNOVATION", "STRUCTURE", "VISION", "LABOUR"];
        let displayWords = [];
        let currentBuildingIndex = 0;
        let animationSpeed = 0.03;

        function setup() {
            createCanvas(windowWidth * 1, windowHeight * 1);
            const constraints = {
                video: {
                    facingMode: "environment",
                    width: { ideal: 360 },
                    height: { ideal: 640 }
                },
                audio: false
            };
            // Initialize Webcam
            capture = createCapture(VIDEO, constraints);
            capture.size(width/2, height/2);
            capture.hide();

            colorMode(HSB, 360, 255, 255, 255);
            angleMode(DEGREES);
            baseLineY = height * 0.85;
            pixelDensity(1);
            generateCity();
        }

        function generateCity() {
            buildings = [];
            displayWords = [];
            currentBuildingIndex = 0;
            let numberOfBuildings = 8;
            
            // Generate Buildings
            for (let i = 0; i < numberOfBuildings; i++) {
                 let bHeight = random(height * 0.4, height * 0.65);
                let bWidth = random(width * 0.08, width * 0.18);
                
                let angleLimit = map(bHeight, 100, height * 0.8, 8, 25);
                let maxAngle = random(angleLimit * 0.6, angleLimit);
                let totalLines = floor(map(bHeight, 100, height, 15, 40));
                let topY = baseLineY - bHeight;

                buildings.push({
                    x: random(width * 0.1, width * 0.9),
                    y: topY,
                    totalLines: totalLines,
                    bHeight: bHeight,
                    bWidth: bWidth,
                    maxAngle: maxAngle,
                    buildProgress: 0
                });
            }
            
            // Generate Random Floating Text
            for (let i = 0; i < 5; i++) {
                displayWords.push({
                    text: random(words),
                    x: random(width * 0.1, width * 0.9),
                    y: random(height * 0.05, height * 0.2),
                    size: random(32, 48),
                    opacity: random(150, 255)
                });
            }
            
            // Back to front sorting
            buildings.sort((a, b) => b.bHeight - a.bHeight); 
        }

        function draw() {
            // Background is the webcam feed
            tint(200, 50, 100); 
           // DISTORTION FIX: Center and scale (Cover logic)
            push();
            background(0);
            imageMode(CENTER);
            let scale = Math.max(width / capture.width, height / capture.height);
            let valW = capture.width * scale;
            let valH = capture.height * scale;
            image(capture, width / 2, height / 2, valW, valH);
            pop();
            noTint();
            
            drawFloatingText();

            // Ground Plane
            stroke(120, 255, 255, 100);
            strokeWeight(2);
            line(0, baseLineY, width, baseLineY);

            // Animate building growth sequentially
            if (currentBuildingIndex < buildings.length) {
                let b = buildings[currentBuildingIndex];
                if (b.buildProgress < 1) {
                    b.buildProgress += animationSpeed;
                } else {
                    b.buildProgress = 1;
                    currentBuildingIndex++;
                }
            }

            for (let b of buildings) {
                drawBuilding(b);
            }
        }

        function drawFloatingText() {
            textAlign(CENTER, CENTER);
            textFont('monospace');
            for (let w of displayWords) {
                fill(120, 255, 255, w.opacity);
                noStroke();
                textSize(w.size);
                text(w.text, w.x, w.y);
                w.opacity = random(150, 255); // Flicker
            }
        }

        function drawBuilding(b) {
            if (b.buildProgress <= 0) return;

            push();
            let linesToShow = floor(b.totalLines * b.buildProgress);
            if (linesToShow < 1 && b.buildProgress > 0) linesToShow = 1;
            
            let spacing = b.bHeight / b.totalLines;
            let leftPoints = [];
            let rightPoints = [];
            let centerPoints = [];

            // Draw floors from bottom up
            for (let i = b.totalLines; i >= b.totalLines - linesToShow; i--) {
                let currentCenterY = b.y + (i * spacing);
                let currentAngle = map(i, 0, b.totalLines, b.maxAngle, -b.maxAngle);
                let vertOffset = tan(currentAngle) * b.bWidth;

                let leftX = b.x - b.bWidth;
                let rightX = b.x + b.bWidth;
                let outerY = currentCenterY + vertOffset;

                let alpha = map(i, 0, b.totalLines, 255, 100);
                stroke(120, 255, 255, alpha); 
                strokeWeight(4); 

                line(b.x, currentCenterY, leftX, outerY);
                line(b.x, currentCenterY, rightX, outerY);

                leftPoints.unshift({x: leftX, y: outerY});
                rightPoints.unshift({x: rightX, y: outerY});
                centerPoints.unshift({x: b.x, y: currentCenterY});
            }

            // Outer Structure Highlights (only for the current height)
            if (centerPoints.length > 1) {
                strokeWeight(6); 
                stroke(120, 255, 255, 255);
                
                // Spine
                line(centerPoints[0].x, centerPoints[0].y, centerPoints[centerPoints.length-1].x, centerPoints[centerPoints.length-1].y);
                // Sides
                line(leftPoints[0].x, leftPoints[0].y, leftPoints[leftPoints.length-1].x, leftPoints[leftPoints.length-1].y);
                line(rightPoints[0].x, rightPoints[0].y, rightPoints[rightPoints.length-1].x, rightPoints[rightPoints.length-1].y);
            }

            pop();
        }

        function mousePressed() {
            generateCity();
        }

        function windowResized() {
            resizeCanvas(windowWidth * 0.9, windowHeight * 0.8);
            baseLineY = height * 0.85;
            generateCity();
        }