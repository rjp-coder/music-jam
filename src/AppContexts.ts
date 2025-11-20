import { createContext } from "react";
import type { GamepadHookData } from "./hooks/useGamepadData";

export const MusicNoteAnimationsContext = createContext([]);
export const MusicalKeyContext = createContext([]);
export const ConnectedGamepadsContext: React.Context<GamepadHookData> =
  createContext({});
