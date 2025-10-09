import React, { useMemo } from "react";

import { ButtonIcon } from "#/components/button/ButtonIcon";
import { Spinner } from "#/components/spinner";

import { buttonContext } from "#/components/button/context/useButtonContext";
import { cn } from "#/utils";
import { ButtonDropZone } from "#/components/button/ButtonDropZone";
import {
  ButtonFileInput,
  ButtonFileInputContext,
} from "#/components/button/ButtonFileInput";
import {
  ButtonDropdown,
  ButtonDropdownItem,
} from "#/components/button/ButtonDropdown";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: "extra-small" | "small" | "medium" | "large";
  color?: "primary" | "secondary" | "error";
  variant?: "solid" | "light" | "no-background" | "outline" | "link";
  isDisabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}

interface ButtonComponent {
  (props: Readonly<ButtonProps>): React.JSX.Element;
  Icon: typeof ButtonIcon;
  DropZone: typeof ButtonDropZone;
  FileInput: typeof ButtonFileInput;
  Dropdown: typeof ButtonDropdown & { Item: typeof ButtonDropdownItem };
}

export const Button: ButtonComponent = function Button({
  children,
  onClick,
  className,
  size = "medium",
  color = "primary",
  variant = "solid",
  type = "button",
  isDisabled = false,
  isLoading = false,
}: Readonly<ButtonProps>) {
  const isExtraSmall = size === "extra-small";
  const isSmall = size === "small";
  const isMedium = size === "medium";
  const isLarge = size === "large";

  const isPrimary = color === "primary";
  const isSecondary = color === "secondary";
  const isError = color === "error";

  const isSolid = variant === "solid";
  const isLight = variant === "light";
  const isNoBackground = variant === "no-background";
  const isOutline = variant === "outline";
  const isLink = variant === "link";

  const spinnerSizes = {
    large: 24,
    medium: 20,
    small: 16,
    "extra-small": 12,
  };

  const spinnerColors = isSolid ? "neutral" : color;

  const [isDragging, setIsDragging] = React.useState(false);
  const [fileInputTrigger, setFileInputTrigger] = React.useState<
    (() => void) | null
  >(null);

  const registerTrigger = React.useCallback(
    (trigger: () => void) => setFileInputTrigger(() => trigger),
    [],
  );
  const unregisterTrigger = React.useCallback(
    () => setFileInputTrigger(null),
    [],
  );

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (fileInputTrigger) {
      fileInputTrigger();
    } else if (onClick) {
      onClick(event);
    }
  };

  const fileInputContextValue = useMemo(
    () => ({ registerTrigger, unregisterTrigger }),
    [registerTrigger, unregisterTrigger],
  );

  const value = useMemo(
    () => ({
      isError,
      isExtraSmall,
      isSmall,
      isMedium,
      isLarge,
      isPrimary,
      isSecondary,
      isSolid,
      isLight,
      isNoBackground,
      isOutline,
      isLink,
      isLoading,
      isDragging,
      setIsDragging,
    }),
    [
      isError,
      isExtraSmall,
      isSmall,
      isMedium,
      isLarge,
      isPrimary,
      isSecondary,
      isSolid,
      isLight,
      isNoBackground,
      isOutline,
      isLink,
      isLoading,
      isDragging,
      setIsDragging,
    ],
  );

  return (
    <buttonContext.Provider value={value}>
      <ButtonFileInputContext.Provider value={fileInputContextValue}>
        <button
          type={type}
          disabled={isDisabled || isLoading}
          onClick={handleButtonClick}
          className={cn(
            "flex cursor-pointer items-center justify-center rounded-md whitespace-nowrap outline-hidden duration-200 disabled:cursor-auto disabled:opacity-50 disabled:shadow-none",
            {
              "!text-b2-500 h-[3rem] gap-2 px-4": isLarge,
              "!text-b3-500 h-10 gap-1 px-4": isMedium,
              "!text-b4-500 h-8 gap-1 px-3": isSmall,
              "!text-small-text-500 h-7 gap-1 px-2": isExtraSmall,
              "bg-primary-600 hover:bg-primary-700 hover:shadow-button-primary-solid disabled:hover:bg-primary-600 text-neutral-0":
                isSolid && isPrimary,
              "bg-secondary-900 hover:bg-secondary-950 hover:shadow-button-secondary-solid disabled:hover:bg-secondary-900 text-neutral-0":
                isSolid && isSecondary,
              "bg-error-600 hover:bg-error-700 hover:shadow-button-error-solid disabled:hover:bg-error-600 text-neutral-0":
                isSolid && isError,
              "bg-primary-50 border-primary-600/20 hover:bg-primary-600 hover:border-primary-600 disabled:hover:bg-primary-50 hover:disabled:border-primary-600/20 hover:disabled:text-primary-600 text-primary-600 hover:text-neutral-0 border":
                isLight && isPrimary,
              "bg-secondary-50 border-secondary-600/20 hover:bg-secondary-900 hover:border-secondary-900 disabled:hover:bg-secondary-50 hover:disabled:border-secondary-900/20 hover:disabled:text-secondary-900 text-secondary-900 hover:text-neutral-0 border":
                isLight && isSecondary,
              "bg-error-50 border-error-600/20 hover:bg-error-600 hover:border-error-600 disabled:hover:bg-error-50 hover:disabled:border-error-600/20 hover:disabled:text-error-600 text-error-600 hover:text-neutral-0 border":
                isLight && isError,
              "hover:bg-primary-600 hover:disabled:text-primary-600 text-primary-600 hover:text-neutral-0 bg-transparent disabled:hover:bg-transparent":
                isNoBackground && isPrimary,
              "hover:bg-secondary-50 hover:disabled:text-secondary-600 text-secondary-600 bg-transparent disabled:hover:bg-transparent":
                isNoBackground && isSecondary,
              "hover:bg-error-600 hover:disabled:text-error-600 text-error-600 hover:text-neutral-0 bg-transparent disabled:hover:bg-transparent":
                isNoBackground && isError,
              "border-primary-300 hover:shadow-button-primary-outline hover:border-primary-400 hover:disabled:text-primary-600 text-primary-600 hover:text-primary-700 disabled:hover:border-primary-300 border bg-transparent":
                isOutline && isPrimary,
              "border-secondary-500 hover:shadow-button-secondary-outline hover:border-secondary-600 hover:disabled:text-secondary-700 text-secondary-700 hover:text-secondary-800 disabled:hover:border-secondary-500 border bg-transparent":
                isOutline && isSecondary,
              "border-error-300 hover:shadow-button-error-outline hover:border-error-400 hover:disabled:text-error-700 text-error-600 hover:text-error-700 disabled:hover:border-error-300 border bg-transparent":
                isOutline && isError,
            },
            className,
          )}
        >
          {isLoading && (
            <div
              className={cn({
                "mx-4": isLarge,
                "mx-3.5": isMedium,
                "mx-2.5": isSmall,
                "mx-2": isExtraSmall,
              })}
            >
              <Spinner color={spinnerColors} size={spinnerSizes[size]} />
            </div>
          )}

          {isLoading ? <span>Please wait...</span> : children}
        </button>
      </ButtonFileInputContext.Provider>
    </buttonContext.Provider>
  );
} as ButtonComponent;

Button.Icon = ButtonIcon;
Button.DropZone = ButtonDropZone;
Button.FileInput = ButtonFileInput;
Button.Dropdown = ButtonDropdown;
