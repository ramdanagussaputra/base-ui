import React, { useMemo } from "react";

import { ButtonIcon } from "#/components/button/ButtonIcon";
import { Body } from "#/components/typography/Body";
import { SmallText } from "#/components/typography/SmallText";

import { buttonContext } from "#/components/button/context/useButtonContext";
import { cn } from "#/utils";

interface ButtonProps {
  readonly children: React.ReactNode;
  readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  readonly size?: "extra-small" | "small" | "medium" | "large";
  readonly color?: "primary" | "secondary" | "error";
  readonly type?: "solid" | "light" | "no-background" | "outline" | "link";
  readonly isDisabled?: boolean;
  readonly className?: string;
}

type BodySize = "large" | "medium" | "small";
type BodyLevel = "1" | "2" | "3" | "4";

export function Button({
  children,
  onClick,
  className,
  size = "medium",
  color = "primary",
  type = "solid",
  isDisabled = false,
}: ButtonProps) {
  const isExtraSmall = size === "extra-small";
  const isSmall = size === "small";
  const isMedium = size === "medium";
  const isLarge = size === "large";

  const isPrimary = color === "primary";
  const isSecondary = color === "secondary";
  const isError = color === "error";

  const isSolid = type === "solid";
  const isLight = type === "light";
  const isNoBackground = type === "no-background";
  const isOutline = type === "outline";
  const isLink = type === "link";

  const bodyLevel = useMemo(
    () => ({
      large: "2",
      medium: "3",
      small: "4",
    }),
    [],
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
    ],
  );

  return (
    <buttonContext.Provider value={value}>
      <button
        disabled={isDisabled}
        onClick={onClick}
        className={cn(
          "cursor-pointer rounded-md duration-200 disabled:cursor-auto disabled:opacity-50 disabled:shadow-none",
          {
            "h-[3rem] px-4": isLarge,
            "h-10 px-4": isMedium,
            "h-8 px-3": isSmall,
            "h-7 px-2": isExtraSmall,
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
            "border-secondary-300 hover:shadow-button-secondary-outline hover:border-secondary-400 hover:disabled:text-secondary-700 text-secondary-700 hover:text-secondary-800 disabled:hover:border-secondary-300 border bg-transparent":
              isOutline && isSecondary,
            "border-error-300 hover:shadow-button-error-outline hover:border-error-400 hover:disabled:text-error-700 text-error-600 hover:text-error-700 disabled:hover:border-error-300 border bg-transparent":
              isOutline && isError,
          },
          className,
        )}
      >
        {!isExtraSmall && (
          <Body
            as="span"
            level={bodyLevel[size as BodySize] as BodyLevel}
            bold="semibold"
            className={cn(
              "flex items-center justify-center whitespace-nowrap",
              {
                "gap-2": isLarge,
                "gap-1": isMedium || isSmall || isExtraSmall,
              },
            )}
            isColorInherit
          >
            {children}
          </Body>
        )}

        {isExtraSmall && (
          <SmallText
            className="flex items-center justify-center whitespace-nowrap"
            bold="medium"
            isColorInherit
          >
            {children}
          </SmallText>
        )}
      </button>
    </buttonContext.Provider>
  );
}

Button.Icon = ButtonIcon;
