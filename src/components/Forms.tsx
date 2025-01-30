import { Eye } from "iconsax-react";
import { Controller, useForm } from "react-hook-form";
import { Fieldset } from "massive-base-ui";

function Forms() {
  const formMethods = useForm({
    defaultValues: {
      text: null,
    },
  });

  return (
    <section className="flex flex-col gap-4">
      <div className="w-1/3">
        <Controller
          name="text"
          control={formMethods.control}
          render={({
            field: { value, onBlur, onChange },
            fieldState: { error },
          }) => (
            <Fieldset isError={!!error}>
              <Fieldset.Label type="required">Label</Fieldset.Label>
              <Fieldset.Message isHintMessage>this is message</Fieldset.Message>
              <Fieldset.TextInput
                type="number"
                placeholder="Placeholder"
                value={value || ""}
                onChange={onChange}
                onBlur={onBlur}
              >
                <Fieldset.Icon>
                  <Eye />
                </Fieldset.Icon>
              </Fieldset.TextInput>
              <Fieldset.Message>this is message</Fieldset.Message>
            </Fieldset>
          )}
        />
      </div>

      <div className="w-1/3">
        <Fieldset>
          <div className="flex items-center gap-2">
            <Fieldset.Checkbox />
            <Fieldset.Label>Label</Fieldset.Label>
          </div>
        </Fieldset>
      </div>
    </section>
  );
}

export default Forms;
