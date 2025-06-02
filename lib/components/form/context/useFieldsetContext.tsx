import { createContext, useContext } from "react";

type FieldsetContext = {
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isRequired: boolean;
  isDisabled: boolean;
  isError: boolean;
  isSuccess: boolean;
};

export const fieldsetContext = createContext<FieldsetContext | undefined>(
  undefined,
);

export function useFieldsetContext() {
  const context = useContext(fieldsetContext);

  if (!context) {
    throw new Error(
      "useFieldsetContext must be used within a FieldsetProvider",
    );
  }

  return context;
}
