import { Button, PhoneNumberFormField, SelectFormField } from "massive-base-ui";
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

        <PhoneNumberFormField
          control={formMethods.control}
          label="Phone number input"
          name="phoneNumber"
          placeholder="Enter phone number"
          options={[
            {
              label: "Indonesia",
              value: "+62",
            },
            {
              label: "United States",
              value: "+1",
            },
            {
              label: "United Kingdom",
              value: "+44",
            },
            {
              label: "Australia",
              value: "+61",
            },
            {
              label: "Canada",
              value: "+1",
            },
            {
              label: "Germany",
              value: "+49",
            },
            {
              label: "France",
              value: "+33",
            },
            {
              label: "Japan",
              value: "+81",
            },
            {
              label: "South Korea",
              value: "+82",
            },
            {
              label: "India",
              value: "+91",
            },
            {
              label: "Brazil",
              value: "+55",
            },
            {
              label: "Mexico",
              value: "+52",
            },
            {
              label: "Russia",
              value: "+7",
            },
            {
              label: "Italy",
              value: "+39",
            },
            {
              label: "Spain",
              value: "+34",
            },
            {
              label: "Netherlands",
              value: "+31",
            },
            {
              label: "Sweden",
              value: "+46",
            },
          ]}
        />
      </div>
    </>
  );
}

export default SelectFieldForm;
