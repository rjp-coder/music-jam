import { createContext, useContext } from "react";
import type { SpawnParticle } from "../components/EffectsLayer";

export const FXContext = createContext(null);

export const useFX = (): null | { spawnParticle: SpawnParticle } => {
  const value: null | { spawnParticle: SpawnParticle } = useContext(FXContext);

  return value;
};
