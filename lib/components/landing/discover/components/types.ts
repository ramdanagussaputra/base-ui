import { SingleValue } from "react-select";
import { FieldsetSelectOption } from "#/components/form/model";

export type DiscoverSearchOption = FieldsetSelectOption & {
  secondLabel: string | null;
  imageUrl?: string | null;
  type: "song" | "songwriter";
  onClick?: () => void;
};

export interface DiscoverSearchInputProps {
  value?: SingleValue<DiscoverSearchOption>;
  onChange?: (value: SingleValue<DiscoverSearchOption>) => void;
  loadOptions?: (inputValue: string) => Promise<DiscoverSearchOption[]>;
  placeholder?: string;
  className?: string;
  defaultOptions?: DiscoverSearchOption[];
  onEnter?: (value: string) => void;
  onInputChange?: (newValue: string) => void;
}
