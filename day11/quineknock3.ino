#include <Servo.h>

const int piezoPin = A0;
const int ledPin = 13;
const int servoPin = 9;

const int knockThreshold = 5;
const unsigned long debounceTime = 120;
const unsigned long pauseTime = 3000;

Servo hammer;

int knockCount = 0;
unsigned long lastKnockTime = 0;

bool playing = false;
int playbackCount = 0;
int currentTap = 0;
bool hammerDown = false;
unsigned long lastTapTime = 0;
const unsigned long tapDownTime = 180;
const unsigned long tapUpTime = 180;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  hammer.attach(servoPin);
  hammer.write(90);
}

void loop() {
  unsigned long now = millis();
  int sensorValue = analogRead(piezoPin);

  // ---- Detect knock ----
  if (sensorValue > knockThreshold && (now - lastKnockTime) > debounceTime) {
    knockCount++;
    lastKnockTime = now;

    digitalWrite(ledPin, HIGH);
    delay(40);
    digitalWrite(ledPin, LOW);

    Serial.print("Knock detected: ");
    Serial.println(knockCount);
  }

  // ---- Start playback if silence ----
  if (!playing && knockCount > 0 && (now - lastKnockTime) > pauseTime) {
    playing = true;
    playbackCount = knockCount; // capture
    Serial.print("Total knocks: ");
    Serial.println(playbackCount); // report total
    knockCount = 0;               // reset for next set
    currentTap = 0;
    hammerDown = false;
    lastTapTime = now;
  }

  // ---- Non-blocking servo playback ----
  if (playing && currentTap < playbackCount) {
    if (!hammerDown && now - lastTapTime >= tapUpTime) {
      hammer.write(60);       // down
      hammerDown = true;
      lastTapTime = now;
    } 
    else if (hammerDown && now - lastTapTime >= tapDownTime) {
      hammer.write(100);      // up
      hammerDown = false;
      lastTapTime = now;
      currentTap++;
    }
  }

  // ---- Finish playback ----
  if (playing && currentTap >= playbackCount) {
    playing = false;
    lastKnockTime = now; // reset silence timer
  }
}

