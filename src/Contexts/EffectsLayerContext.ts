import { createContext, useContext } from "react";

export const FXContext = createContext(null);

export const useFX = () => {
  const value = useContext(FXContext);

  return value;
};
