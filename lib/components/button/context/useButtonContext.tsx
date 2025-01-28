import { createContext, useContext } from "react";

type ButtonContext = {
  isExtraSmall: boolean;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isPrimary: boolean;
  isSecondary: boolean;
  isError: boolean;
  isSolid: boolean;
  isLight: boolean;
  isNoBackground: boolean;
  isOutline: boolean;
  isLink: boolean;
};

export const buttonContext = createContext<ButtonContext | undefined>({
  isExtraSmall: false,
  isSmall: false,
  isMedium: true,
  isLarge: false,
  isPrimary: true,
  isSecondary: false,
  isError: false,
  isSolid: true,
  isLight: false,
  isNoBackground: false,
  isOutline: false,
  isLink: false,
});

export function useButtonContext() {
  const context = useContext(buttonContext);

  if (!context) {
    throw new Error("useButtonContext must be used within a ButtonProvider");
  }

  return context;
}
