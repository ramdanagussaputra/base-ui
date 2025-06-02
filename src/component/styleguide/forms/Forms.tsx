import { FormProvider, useForm } from "react-hook-form";

import StyleguideGroup from "@/component/styleguide/StyleguideGroup";
import StyleguideTitle from "@/component/styleguide/StyleguideTitle";
import InputFieldForm from "@/component/styleguide/forms/InputFieldForm";
import SelectFieldForm from "@/component/styleguide/forms/SelectFieldForm";
import ControlFieldForm from "@/component/styleguide/forms/ControlFieldForm";

function Forms() {
  const formMethods = useForm({
    defaultValues: {
      requiredText: null,
      optionalText: null,
      number: null,
      email: null,
      password: null,
      textArea: null,
      select: null,
      multiSelect: null,
      customOptionSelect: null,
      checkbox: null,
    },
    mode: "all",
  });

  return (
    <StyleguideGroup>
      <StyleguideTitle>Forms</StyleguideTitle>

      <FormProvider {...formMethods}>
        <div className="flex w-full gap-5">
          <div className="grow space-y-5">
            <InputFieldForm />
          </div>

          <div className="grow space-y-5">
            <SelectFieldForm />
            <ControlFieldForm />
          </div>
        </div>
      </FormProvider>
    </StyleguideGroup>
  );
}

export default Forms;
