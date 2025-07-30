import React, { useMemo } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";

import { ButtonIcon } from "#/components/button/ButtonIcon";
import { Spinner } from "#/components/spinner";
import { buttonContext } from "#/components/button/context/useButtonContext";
import { cn } from "#/utils";
import Icon from "../icon/Icon";

const getButtonStyles = (
  variant: "solid" | "light" | "no-background" | "outline" | "link",
  color: "primary" | "secondary" | "error",
  size: "extra-small" | "small" | "medium" | "large",
) => {
  const sizeClasses = {
    large: "!text-b2-500 h-[3rem] gap-2 px-4",
    medium: "!text-b3-500 h-10 gap-1 px-4",
    small: "!text-b4-500 h-8 gap-1 px-3",
    "extra-small": "!text-small-text-500 h-7 gap-1 px-2",
  } as const;

  const variantColorClasses = {
    "solid-primary":
      "bg-primary-600 hover:bg-primary-700 hover:shadow-button-primary-solid disabled:hover:bg-primary-600 text-neutral-0",
    "solid-secondary":
      "bg-secondary-900 hover:bg-secondary-950 hover:shadow-button-secondary-solid disabled:hover:bg-secondary-900 text-neutral-0",
    "solid-error":
      "bg-error-600 hover:bg-error-700 hover:shadow-button-error-solid disabled:hover:bg-error-600 text-neutral-0",
    "light-primary":
      "bg-primary-50 border-primary-600/20 hover:bg-primary-600 hover:border-primary-600 disabled:hover:bg-primary-50 hover:disabled:border-primary-600/20 hover:disabled:text-primary-600 text-primary-600 hover:text-neutral-0 border",
    "light-secondary":
      "bg-secondary-50 border-secondary-600/20 hover:bg-secondary-900 hover:border-secondary-900 disabled:hover:bg-secondary-50 hover:disabled:border-secondary-900/20 hover:disabled:text-secondary-900 text-secondary-900 hover:text-neutral-0 border",
    "light-error":
      "bg-error-50 border-error-600/20 hover:bg-error-600 hover:border-error-600 disabled:hover:bg-error-50 hover:disabled:border-error-600/20 hover:disabled:text-error-600 text-error-600 hover:text-neutral-0 border",
    "no-background-primary":
      "hover:bg-primary-600 hover:disabled:text-primary-600 text-primary-600 hover:text-neutral-0 bg-transparent disabled:hover:bg-transparent",
    "no-background-secondary":
      "hover:bg-secondary-50 hover:disabled:text-secondary-600 text-secondary-600 bg-transparent disabled:hover:bg-transparent",
    "no-background-error":
      "hover:bg-error-600 hover:disabled:text-error-600 text-error-600 hover:text-neutral-0 bg-transparent disabled:hover:bg-transparent",
    "outline-primary":
      "border-primary-300 hover:shadow-button-primary-outline hover:border-primary-400 hover:disabled:text-primary-600 text-primary-600 hover:text-primary-700 disabled:hover:border-primary-300 border bg-transparent",
    "outline-secondary":
      "border-secondary-300 hover:shadow-button-secondary-outline hover:border-secondary-400 hover:disabled:text-secondary-700 text-secondary-700 hover:text-secondary-800 disabled:hover:border-secondary-300 border bg-transparent",
    "outline-error":
      "border-error-300 hover:shadow-button-error-outline hover:border-error-400 hover:disabled:text-error-700 text-error-600 hover:text-error-700 disabled:hover:border-error-300 border bg-transparent",
  } as const;

  const key = `${variant}-${color}` as keyof typeof variantColorClasses;
  return [sizeClasses[size], variantColorClasses[key]].filter(Boolean);
};

interface ButtonDropdownProps {
  children: React.ReactNode;
  buttonText: string;
  size?: "extra-small" | "small" | "medium" | "large";
  color?: "primary" | "secondary" | "error";
  variant?: "solid" | "light" | "no-background" | "outline" | "link";
  isDisabled?: boolean;
  className?: string;
  isLoading?: boolean;
  anchor?:
    | "top"
    | "top start"
    | "top end"
    | "right"
    | "right start"
    | "right end"
    | "bottom"
    | "bottom start"
    | "bottom end"
    | "left"
    | "left start"
    | "left end";
}

interface ButtonDropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isDisabled?: boolean;
}

export function ButtonDropdownItem({
  children,
  onClick,
  className,
  isDisabled = false,
}: Readonly<ButtonDropdownItemProps>) {
  return (
    <MenuItem disabled={isDisabled}>
      <button
        className={cn(
          "group flex w-full items-center px-5 py-2 text-b3-500 text-secondary-800 rounded-md text-left hover:bg-secondary-50 focus:bg-secondary-50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent cursor-pointer",
          className,
        )}
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
      </button>
    </MenuItem>
  );
}

export function ButtonDropdown({
  children,
  buttonText,
  className,
  size = "medium",
  color = "primary",
  variant = "solid",
  isDisabled = false,
  isLoading = false,
  anchor = "bottom start",
}: Readonly<ButtonDropdownProps>) {
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
      isDragging: false,
      setIsDragging: () => {},
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
    ],
  );

  return (
    <buttonContext.Provider value={value}>
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <MenuButton
              disabled={isDisabled || isLoading}
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-md whitespace-nowrap outline-hidden duration-200 disabled:cursor-auto disabled:opacity-50 disabled:shadow-none",
                ...getButtonStyles(variant, color, size),
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

              {isLoading ? (
                <span>Please wait...</span>
              ) : (
                <>
                  <span>{buttonText}</span>
                  <ButtonIcon>
                    <Icon icon={open ? ArrowUp2 : ArrowDown2} />
                  </ButtonIcon>
                </>
              )}
            </MenuButton>

            <MenuItems
              anchor={anchor}
              className={cn(
                "bg-[rgba(253,253,253)] border-secondary-100 z-10 w-56 rounded-lg border p-3 shadow-lg focus:outline-none",
                anchor.includes("top") ? "-mt-2" : "mt-2",
              )}
            >
              {children}
            </MenuItems>
          </>
        )}
      </Menu>
    </buttonContext.Provider>
  );
}

ButtonDropdown.Item = ButtonDropdownItem;
