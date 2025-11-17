(function () {
  console.log("resetting connected gamepads");
  globalThis.connectedGamepads = [];

  window.addEventListener("gamepadconnected", handleGamepadConnected);
  window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

  function handleGamepadConnected(e) {
    gamepadHandler(e, true);
  }
  function handleGamepadDisconnected(e) {
    gamepadHandler(e, false);
  }

  function gamepadHandler(event, connected) {
    debugger;
    try {
      console.log(
        "Gamepad connection at index %d: %s. %d buttons, %d axes. %s",
        event.gamepad.index,
        event.gamepad.id,
        event.gamepad.buttons?.length,
        event.gamepad.axes?.length,
        connected
      );
      console.log(event.gamepad);
      const eventGamepad = event.gamepad;
      // Note:
      // gamepad === navigator.getGamepads()[gamepad.index]

      const toStringify = globalThis.connectedGamepads;
      console.log(toStringify);

      const newState = JSON.parse(JSON.stringify(toStringify));

      let t = "unknown";
      if (eventGamepad.id.toLowerCase().includes("joy")) {
        t = "joycon";
      } else if (eventGamepad.id.toLowerCase().includes("xbox")) {
        t = "xbox";
      } else if (eventGamepad.id.toLowerCase().includes("playstation")) {
        t = "playstation";
      }

      console.log(event.gamepad);

      if (connected) {
        console.log(event.gamepad);
        const gamepadData = {
          index: eventGamepad.index,
          type: t,
          col: "red",
          id: eventGamepad.id,
          gamepad: event.gamepad,
        };

        console.log({ newState0gamepad: newState?.[0]?.gamepad });
        newState.push(gamepadData); //TODO specify no  colour here and have the gamepad grab the first available one on render
        console.log({ newState0gamepad: newState?.[0]?.gamepad });
      } else {
        newState.splice(
          newState.findIndex((ns) => ns.id == eventGamepad.index),
          1
        );
      }
      globalThis.connectedGamepads = newState;
    } catch (e) {
      throw new Error("wtf");
    }
  }
})();
