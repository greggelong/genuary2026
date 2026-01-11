# Physical Quine (Arduino + Servo + Piezo)

## Overview

This project is a small physical system that behaves like a **quine**.
In software, a quine is a program that outputs its own source code.
Here, the idea is translated into the physical world.

A human provides an initial set of taps. The system listens, counts them, and then reproduces the same number of taps using a servo. Those servo taps can be sensed again by the piezo, becoming the next input. The output of the system is also its next instruction, forming a feedback loop.

## How It Works

1. A thin, round piezo disk senses physical taps.
2. The Arduino reads and counts taps until there is a pause.
3. After a pause, the servo taps the same number of times.
4. Those servo taps can be detected by the piezo.
5. The cycle can continue, with each output becoming the next input.

The system uses **non-blocking code** based on `millis()` so that the piezo can keep listening even while the servo is moving. This allows the feedback loop to function without the program freezing during delays.

## Circuit Description

### Piezo Sensor

- A flat, round piezo disk is used as a vibration sensor.
- One side of the piezo is connected to **A0** on the Arduino.
- The other side is connected to **GND**.
- A **1 MΩ resistor** is connected between A0 and GND to stabilize the signal and safely bias the analog input.

### Servo

- An SG90 servo is connected to a digital pin (typically **D9**).
- The servo is powered by an **external 5–6 V supply**.
- The servo ground and Arduino ground are tied together to form a common ground.

### LED (Optional)

- An LED on **D13** blinks when a tap is detected.
- This provides a visual indication that the piezo has registered a knock.

## Notes on Fragility

This system is intentionally fragile.
If the servo vibrates the piezo too strongly, if connections are loose, or if power is unstable, the feedback loop can break down. This instability is part of the behavior and reflects the physical limits of translating self-reference into hardware.

## Tools and Help

The project was developed using Arduino and a basic servo motor.
AI assistance was used during development, particularly for structuring non-blocking code that allows simultaneous sensing and actuation.

## Concept

Physical Quine translates the idea of a quine from software into a physical system. A human initiates the work by tapping a pattern. The system listens, counts, and reproduces the taps using a servo. These mechanical taps can be sensed again, becoming the next input in a feedback loop where output and instruction are the same action.

Within this loop, obeying orders becomes equivalent to giving orders. The system does not store commands; it generates them through repetition. Small mechanical and electrical instabilities can interrupt the cycle, revealing the fragile conditions required for physical self-reference.

This project explores recursion and self-reference outside of software.
Instead of code printing itself, physical actions reproduce themselves.
The machine listens to its own output and treats it as instruction.
