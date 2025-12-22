import { SingleValue } from "react-select";
import { FieldsetSelectOption } from "#/components/form/model";

export type DiscoverSearchOption = FieldsetSelectOption & {
  secondLabel: string;
  imageUrl?: string;
  type: "song" | "songwriter";
};

export interface DiscoverSearchInputProps {
  value?: SingleValue<DiscoverSearchOption>;
  onChange?: (value: SingleValue<DiscoverSearchOption>) => void;
  loadOptions?: (inputValue: string) => Promise<DiscoverSearchOption[]>;
  placeholder?: string;
  className?: string;
  defaultOptions?: DiscoverSearchOption[];
  onEnter?: () => void;
}
