import { Button, SelectFormField } from "massive-base-ui";
import { useFormContext } from "react-hook-form";
import { MenuListProps, components } from "react-select";
import { Add } from "iconsax-react";

import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

function SelectFieldForm() {
  const formMethods = useFormContext();
  return (
    <>
      <StyleguideSubtitle>Select Input Field</StyleguideSubtitle>

      <div className="space-y-3">
        <SelectFormField
          name="select"
          control={formMethods.control}
          label="Single Select"
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
            { label: "Option 3", value: "option-3" },
          ]}
          placeholder="Placeholder"
        />

        <SelectFormField
          name="multiSelect"
          control={formMethods.control}
          label="Multi Select"
          isMultiSelect
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
            { label: "Option 3", value: "option-3" },
          ]}
          placeholder="Placeholder"
        />

        <SelectFormField
          name="customOptionSelect"
          control={formMethods.control}
          label="Custom Option Select"
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
            { label: "Option 3", value: "option-3" },
          ]}
          placeholder="Placeholder"
          selectComponentOptions={{
            MenuList: (props: MenuListProps) => (
              <>
                <components.MenuList {...props}>
                  {props.children}
                </components.MenuList>

                <Button variant="light" className="w-full">
                  <Button.Icon>
                    <Add />
                  </Button.Icon>
                  Add Something
                </Button>
              </>
            ),
          }}
        />
      </div>
    </>
  );
}

export default SelectFieldForm;
