import { FormProvider, useForm } from "react-hook-form";
import {
  Button,
  CheckboxFormField,
  PasswordFormField,
  SelectFormField,
  TextAreaFormField,
  TextFormField,
  AsyncPaginateFormField,
  AsyncPaginateCreatableFormField,
} from "massive-base-ui";

import { RadioGroupFormField } from "#/components/form/components/form-field/RadioGroupFormField";

function FormsPage() {
  const formMethods = useForm({
    defaultValues: {
      password: null,
      select: null,
      multi_select: null,
      radio: null,
      email: null,
      text: null,
      number: null,
      textarea: null,
      async_paginate: null as {
        value: string | number | boolean;
        label: string;
      } | null,
      async_paginate_creatable: null as {
        value: string | number | boolean;
        label: string;
      } | null,
    },
    mode: "all",
  });

  const triggerForm = () => {
    formMethods.trigger();
  };

  // DummyJSON Products API integration for async select options
  const loadOptions = async (
    inputValue: string,
    loadedOptions: readonly {
      value: string | number | boolean;
      label: string;
    }[],
    additional?: { page: number },
  ) => {
    try {
      const pageSize = 10;
      const skip = loadedOptions.length;

      // Build API URL with search and pagination
      const baseUrl = "https://dummyjson.com/products";
      const searchUrl = inputValue
        ? `${baseUrl}/search?q=${encodeURIComponent(inputValue)}&limit=${pageSize}&skip=${skip}&select=id,title,price,category,brand`
        : `${baseUrl}?limit=${pageSize}&skip=${skip}&select=id,title,price,category,brand`;

      const response = await fetch(searchUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Transform products into select options
      const options = data.products.map((product: any) => ({
        value: product.id,
        label: `${product.title} - $${product.price} (${product.category})${product.brand ? ` - ${product.brand}` : ""}`,
      }));

      return {
        options,
        hasMore: skip + pageSize < data.total,
        additional: {
          page: (additional?.page || 1) + 1,
        },
      };
    } catch (error) {
      console.error("Error loading products:", error);
      return {
        options: [],
        hasMore: false,
        additional: {
          page: (additional?.page || 1) + 1,
        },
      };
    }
  };

  const handleCreateOption = (inputValue: string) => {
    // In a real app, you might want to POST this new product to the API
    // For now, we'll just create a local option with a negative ID to distinguish it
    const newOption = {
      value: `new-${Date.now()}`,
      label: `New Product: ${inputValue}`,
    };
    formMethods.setValue("async_paginate_creatable", newOption);
  };

  return (
    <section className="flex flex-col gap-4 p-10">
      <FormProvider {...formMethods}>
        <div className="w-1/3">
          <TextFormField
            label="Text"
            name="text"
            placeholder="Enter text"
            control={formMethods.control}
            isRequired
            // lettersAndNumbersWithSpaces
            noSpacesValidation
            autoUppercase
            type="number"
          />
        </div>

        <div className="w-1/3">
          <TextFormField
            label="Number"
            name="number"
            placeholder="Enter number"
            control={formMethods.control}
            type="number"
            isDisabled
          />
        </div>

        <div className="w-1/3">
          <TextFormField
            label="Email"
            name="email"
            placeholder="Enter email"
            type="email"
            control={formMethods.control}
          />
        </div>

        <div className="w-1/3">
          <PasswordFormField
            label="Password"
            name="password"
            placeholder="Enter password"
            control={formMethods.control}
          />
        </div>

        <div className="w-1/3">
          <CheckboxFormField
            name="checkbox"
            label="Label"
            control={formMethods.control}
          />
        </div>

        <div className="w-1/3">
          <SelectFormField
            name="select"
            control={formMethods.control}
            isDisabled
            label="Select"
            options={[
              { label: "Option 1", value: "option-1" },
              { label: "Option 2", value: "option-2" },
              { label: "Option 3", value: "option-3" },
            ]}
            placeholder="Placeholder"
          />
        </div>

        <div className="w-1/3">
          <SelectFormField
            name="multi_select"
            control={formMethods.control}
            label="Multi Select"
            options={[
              { label: "Option 1", value: "option-1" },
              { label: "Option 2", value: "option-2" },
              { label: "Option 3", value: "option-3" },
            ]}
            placeholder="Placeholder"
            isMultiSelect
          />
        </div>

        <div className="h-fit w-1/3">
          <RadioGroupFormField
            label="Radio Group"
            control={formMethods.control}
            name="radio"
            isRequired
            isVertical
            fields={[
              { label: "Radio 1", value: "radio1" },
              { label: "Radio 2", value: "radio2" },
              { label: "Radio 3", value: "radio3" },
            ]}
          />
        </div>

        <div className="h-fit w-1/3">
          <TextAreaFormField
            control={formMethods.control}
            name="textarea"
            label="Textarea"
            placeholder="Placeholder"
            autoUppercase
          />
        </div>

        <div className="w-1/3">
          <SelectFormField
            name="select"
            control={formMethods.control}
            label="Select"
            options={[
              { label: "Option 1", value: "option-1" },
              { label: "Option 2", value: "option-2" },
              { label: "Option 3", value: "option-3" },
            ]}
            placeholder="Placeholder"
            isRequired
          />
        </div>

        <div className="w-1/3">
          <AsyncPaginateFormField
            control={formMethods.control}
            name="async_paginate"
            label="Product Search (DummyJSON API)"
            placeholder="Search for products..."
            loadOptions={loadOptions}
            additional={{ page: 1 }}
            defaultAdditional={{ page: 1 }}
            debounceTimeout={500}
            isRequired
            isMultiSelect
          />
        </div>

        <div className="w-1/3">
          <AsyncPaginateCreatableFormField
            control={formMethods.control}
            name="async_paginate_creatable"
            label="Product Search + Create (DummyJSON API)"
            placeholder="Search products or create new..."
            loadOptions={loadOptions}
            additional={{ page: 1 }}
            defaultAdditional={{ page: 1 }}
            onCreateOption={handleCreateOption}
            formatCreateLabel={(inputValue) =>
              `Create new product: "${inputValue}"`
            }
            isRequired
          />
        </div>

        <div className="w-1/3">
          <AsyncPaginateFormField
            control={formMethods.control}
            name="async_paginate_multi_checkbox"
            label="Multi-Select with Checkboxes"
            placeholder="Select multiple products..."
            loadOptions={loadOptions}
            additional={{ page: 1 }}
            defaultAdditional={{ page: 1 }}
            debounceTimeout={500}
            isMultiSelect={true}
            enableCheckboxes={true}
            checkboxPosition="left"
            isRequired
          />
        </div>

        <div className="w-1/3">
          <AsyncPaginateFormField
            control={formMethods.control}
            name="async_paginate_with_clear_indicator"
            label="Single Select with Clear Indicator"
            placeholder="Select product..."
            loadOptions={loadOptions}
            additional={{ page: 1 }}
            defaultAdditional={{ page: 1 }}
            debounceTimeout={500}
            enableCheckboxes={true}
            checkboxPosition="left"
          />
        </div>

        <Button type="button" onClick={triggerForm}>
          Trigger
        </Button>
      </FormProvider>
    </section>
  );
}

export default FormsPage;
