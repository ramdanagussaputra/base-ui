import {
  Button,
  DatePickerFormField,
  PhoneNumberFormField,
  SelectFormField,
  PassportFormField,
  AsyncSelectSongFormField,
  SelectCreatableFormField,
  Fieldset,
} from "massive-base-ui";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { MenuListProps, components } from "react-select";
import { Add } from "iconsax-react";
import Icon from "#/components/icon/Icon";
import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

function SelectFieldForm() {
  const formMethods = useFormContext();
  const [open, setOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState<any>(null);

  console.log(formMethods.watch("rangeDate"));
  return (
    <>
      <StyleguideSubtitle>Select Input Field</StyleguideSubtitle>

      <div className="space-y-3">
        <DatePickerFormField
          mode="single"
          control={formMethods.control}
          label="Single Date Picker"
          name="singleDate"
          placeholder="DD/MM/YYYY"
        />

        <DatePickerFormField
          mode="multiple"
          control={formMethods.control}
          label="Multiple Date Picker"
          name="multipleDate"
          placeholder="DD/MM/YYYY"
        />

        <DatePickerFormField
          mode="range"
          control={formMethods.control}
          label="Range Date Picker"
          name="rangeDate"
          placeholder="DD/MM/YYYY"
        />

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
          size="small"
        />

        {/* Local calendar demo (self-contained) */}
        <Fieldset>
          <div className="mb-2 flex items-center space-x-2">
            <Button onClick={() => setOpen(true)}>Open Calendar</Button>
            <div className="text-sm text-slate-600">
              {calendarDate ? JSON.stringify(calendarDate) : "No date selected"}
            </div>
          </div>

          {open && (
            <Fieldset.Calendar
              mode={"range"}
              // disabledDate can be passed here if needed
              date={calendarDate}
              onChange={(value: any) => {
                console.log("Calendar onChange:", value);
                setCalendarDate(value);
                // close the calendar after selection
                // setOpen(false);
              }}
              jumpToSelectedDate={true}
              handleClose={() => setOpen(false)}
            />
          )}
        </Fieldset>

        <AsyncSelectSongFormField
          name="select-song"
          control={formMethods.control}
          onChange={(value) => {
            console.log(value);
          }}
          defaultOptions={[
            {
              label: "Kawin Lari",
              secondLabel: "ST12",
              imageUrl: "https://i.pravatar.cc/300",
              value: "option-1",
            },
            {
              label: "Cinta Luar Biasa",
              secondLabel: "ST12",
              imageUrl: "https://i.pravatar.cc/301",
              value: "option-2",
            },
          ]}
          placeholder="Placeholder"
          label="Select Song"
        />

        <SelectCreatableFormField
          label="Creatable Select"
          control={formMethods.control}
          name="creatable-select"
          options={[
            {
              label: "Option 1",
              value: "option-1",
            },
            {
              label: "Option 2",
              value: "option-2",
            },
            {
              label: "Option 3",
              value: "option-3",
            },
          ]}
          onChange={(e) => {
            console.log(e, "change");
          }}
          placeholder="Creatable Select"
          isMultiSelect={true}
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
          maxSelected={2}
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
                    <Icon icon={Add} />
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

        <PassportFormField
          control={formMethods.control}
          name="passportNumber"
          label="Passport Number"
          placeholder="Enter passport number"
          options={[
            { label: "Indonesia", value: "ID" },
            { label: "United States", value: "US" },
            { label: "United Kingdom", value: "GB" },
            { label: "Australia", value: "AU" },
            { label: "Canada", value: "CA" },
            { label: "Germany", value: "DE" },
            { label: "France", value: "FR" },
            { label: "Japan", value: "JP" },
            { label: "South Korea", value: "KR" },
            { label: "Singapore", value: "SG" },
          ]}
          prefixDefaultValue="ID"
          onPrefixChange={(value) => {
            formMethods.setValue("prefixPassport", value);
          }}
        />
      </div>
    </>
  );
}

export default SelectFieldForm;
