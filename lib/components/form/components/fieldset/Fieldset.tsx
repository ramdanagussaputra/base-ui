import { useMemo } from "react";

import { FieldsetLabel } from "#/components/form/components/fieldset/FieldsetLabel";
import { FieldsetInput } from "#/components/form/components/fieldset/FieldsetInput";
import { FieldsetIcon } from "#/components/form/components/fieldset/FieldsetIcon";
import { FieldsetMessage } from "#/components/form/components/fieldset/FieldsetMessage";
import { FieldsetCheckbox } from "#/components/form/components/fieldset/FieldsetCheckbox";
import { FieldsetSelect } from "#/components/form/components/fieldset/FieldsetSelect";
import { FieldsetRadio } from "#/components/form/components/fieldset/FieldsetRadio";
import { FieldsetRadioGroup } from "#/components/form/components/fieldset/FieldsetRadioGroup";
import { FieldsetTextArea } from "#/components/form/components/fieldset/FieldsetTextArea";
import { FieldsetAsyncSelect } from "#/components/form/components/fieldset/FieldsetAsyncSelect";
import FieldsetToggle from "#/components/form/components/fieldset/FieldsetToggle";

import { fieldsetContext } from "#/components/form/context/useFieldsetContext";
import { cn } from "#/utils";

export interface FieldsetProps {
  children: React.ReactNode;
  size?: "extra-small" | "small" | "medium" | "large";
  isRequired?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  className?: string;
}

export function Fieldset({
  children,
  className,
  size = "medium",
  isRequired = false,
  isDisabled = false,
  isError = false,
  isSuccess = false,
}: Readonly<FieldsetProps>) {
  const isExtraSmall = size === "extra-small";
  const isSmall = size === "small";
  const isMedium = size === "medium";
  const isLarge = size === "large";

  const contextValue = useMemo(
    () => ({
      isExtraSmall,
      isSmall,
      isMedium,
      isLarge,
      isRequired,
      isSuccess,
      isDisabled,
      isError,
    }),
    [
      isExtraSmall,
      isSmall,
      isMedium,
      isLarge,
      isRequired,
      isDisabled,
      isError,
      isSuccess,
    ],
  );

  return (
    <fieldsetContext.Provider value={contextValue}>
      <fieldset className={cn("flex flex-col gap-1.5", className)}>
        {children}
      </fieldset>
    </fieldsetContext.Provider>
  );
}

Fieldset.Label = FieldsetLabel;
Fieldset.TextInput = FieldsetInput;
Fieldset.Icon = FieldsetIcon;
Fieldset.Message = FieldsetMessage;
Fieldset.Checkbox = FieldsetCheckbox;
Fieldset.Select = FieldsetSelect;
Fieldset.Radio = FieldsetRadio;
Fieldset.RadioGroup = FieldsetRadioGroup;
Fieldset.Textarea = FieldsetTextArea;
Fieldset.AsyncSelect = FieldsetAsyncSelect;
Fieldset.Toggle = FieldsetToggle;
