import { type GamepadData } from "../hooks/useGamepad";

export function filterUnknownGamepadDataIfIdSame(gamepads: GamepadData[]) {
  const withoutUnknowns = gamepads.filter((gp) => gp.type != "unknown");
  const indexes = withoutUnknowns.map((wu) => wu.index);
  return gamepads.filter(
    (gp) => withoutUnknowns.includes(gp) || indexes.includes(gp.index)
  );
}

export function filterUnknownGamepadIfIdSame(gamepads: Gamepad[]) {
  const withoutUnknowns = gamepads.filter(
    (gp) =>
      gp.id.includes("joy") ||
      gp.id.includes("xbox") ||
      gp.id.includes("playstation")
  );
  const indexes = withoutUnknowns.map((wu) => wu.index);
  return gamepads.filter(
    (gp) => withoutUnknowns.includes(gp) || indexes.includes(gp.index)
  );
}
