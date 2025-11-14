import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.tsx";
import {
  joyConMappings,
  joyConToAgnosticMappings,
} from "./utils/controller.ts";
import { playNote } from "./utils/notes.ts";

const gamepads = {};
globalThis.gamepads = gamepads;

function gamepadHandler(event, connected) {
  const gamepad = event.gamepad;
  // Note:
  // gamepad === navigator.getGamepads()[gamepad.index]

  if (connected) {
    gamepads[gamepad.index] = gamepad;
  } else {
    delete gamepads[gamepad.index];
  }

  setInterval(interactWithButtons, 1000);
}

window.addEventListener("gamepadconnected", (e) => {
  console.log(
    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index,
    e.gamepad.id,
    e.gamepad.buttons.length,
    e.gamepad.axes.length
  );
  gamepadHandler(e, true);
});
window.addEventListener("gamepaddisconnected", (e) => {
  console.log(
    "Gamepad disconnected from index %d: %s",
    e.gamepad.index,
    e.gamepad.id
  );
  gamepadHandler(e, false);
});

function interactWithButtons() {
  const gamepads = navigator.getGamepads();
  if (!gamepads) {
    return;
  }
  const gp = gamepads[1];

  if (!gp) return;

  console.log("gamepad connected: ", gp.id);

  const buttons = gp?.buttons;
  const pressed = [];

  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    if (btn.pressed) {
      pressed.push(i);
    }
  }

  for (let index of pressed) {
    console.log(index, " button is pressed");
    const buttonPressed = joyConMappings[index];
    console.log("button pressed: ", buttonPressed);
    const btn = joyConToAgnosticMappings[buttonPressed];
    console.log("mapped to agnostic button: ", btn);
    console.assert(btn >= 0 && btn < 13, "button mapping out of range", btn);
    const noteToPlay = notesToPlay[btn];
    if (noteToPlay) {
      playNote(noteToPlay);
    }
  }
}

//TODO map this to the current key
const notesToPlay = {
  0: "C4",
  1: "D4",
  2: "E4",
  3: "F4",
  4: "G4",
  5: "A4",
  6: "B4",
  7: "C5",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
