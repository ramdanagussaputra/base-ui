# Infinite Scroll Select Fields Guide

This guide explains how to use the new infinite scroll select fields (`AsyncPaginateFormField` and `AsyncPaginateCreatableFormField`) that are built on top of `react-select-async-paginate`.

## Components Overview

1. **AsyncPaginateFormField** - Infinite scroll select field with async loading
2. **AsyncPaginateCreatableFormField** - Infinite scroll select field with async loading and the ability to create new options
3. **FieldsetAsyncPaginate** - Low-level fieldset component for async paginate
4. **FieldsetAsyncPaginateCreatable** - Low-level fieldset component for async paginate with creation capability

## Installation

The `react-select-async-paginate` package is automatically included as a dependency.

## Basic Usage

### AsyncPaginateFormField

```tsx
import { useForm } from "react-hook-form";
import { AsyncPaginateFormField } from "@massivemusicui/massive-base-ui";

interface Option {
  value: string | number;
  label: string;
}

function MyForm() {
  const form = useForm();

  // Example loadOptions function for offset-based pagination
  const loadOptions = async (
    inputValue: string,
    loadedOptions: readonly Option[],
    additional?: any,
  ) => {
    const response = await fetch(
      `/api/options?search=${inputValue}&offset=${loadedOptions.length}&limit=20`,
    );
    const data = await response.json();

    return {
      options: data.results,
      hasMore: data.has_more,
      additional: additional, // Pass through additional data
    };
  };

  return (
    <form>
      <AsyncPaginateFormField
        control={form.control}
        name="selectedOption"
        label="Select Option"
        placeholder="Search for options..."
        loadOptions={loadOptions}
        debounceTimeout={300}
        isSearchable={true}
        loadOptionsOnMenuOpen={true}
      />
    </form>
  );
}
```

### Page-based Pagination

````tsx
// Example loadOptions function for page-based pagination
### Real API Example - DummyJSON Products

Here's how to integrate with a real API like DummyJSON:

```tsx
const loadProductOptions = async (
  inputValue: string,
  loadedOptions: readonly { value: string | number | boolean; label: string }[],
  additional?: { page: number }
) => {
  try {
    const pageSize = 10;
    const skip = loadedOptions.length;

    // Build API URL with search and pagination
    const baseUrl = 'https://dummyjson.com/products';
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
      label: `${product.title} - $${product.price} (${product.category})${product.brand ? ` - ${product.brand}` : ''}`,
    }));

    return {
      options,
      hasMore: skip + pageSize < data.total,
      additional: {
        page: (additional?.page || 1) + 1,
      },
    };
  } catch (error) {
    console.error('Error loading products:', error);
    return {
      options: [],
      hasMore: false,
      additional: {
        page: (additional?.page || 1) + 1,
      },
    };
  }
};

// Usage in form
<AsyncPaginateFormField
  control={control}
  name="product"
  label="Select Product"
  placeholder="Search for products..."
  loadOptions={loadProductOptions}
  additional={{ page: 1 }}
  defaultAdditional={{ page: 1 }}
  debounceTimeout={500}
  isRequired
/>
````

// Usage
<AsyncPaginateFormField
control={form.control}
name="selectedOption"
label="Select Option"
placeholder="Search for options..."
loadOptions={loadOptionsWithPages}
additional={{ page: 1 }}
defaultAdditional={{ page: 1 }}
/>;

````

### AsyncPaginateCreatableFormField

```tsx
import { AsyncPaginateCreatableFormField } from "@massivemusicui/massive-base-ui";

function CreatableForm() {
  const form = useForm();

  const handleCreateOption = (inputValue: string) => {
    // Create new option logic
    const newOption = { value: inputValue, label: inputValue };
    // You might want to save this to your backend
    // Then update the form value
    form.setValue("selectedOption", newOption);
  };

  return (
    <AsyncPaginateCreatableFormField
      control={form.control}
      name="selectedOption"
      label="Select or Create Option"
      placeholder="Search or create options..."
      loadOptions={loadOptions}
      onCreateOption={handleCreateOption}
      formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
      isValidNewOption={(inputValue, selectValue, selectOptions) => {
        return (
          inputValue.length > 0 &&
          !selectOptions.find(
            (option) => option.label.toLowerCase() === inputValue.toLowerCase(),
          )
        );
      }}
    />
  );
}
````

## Advanced Props

### Multi-Select with Checkboxes

For better UX in multi-select scenarios, you can enable checkboxes that allow users to select/deselect options without closing the menu:

```tsx
<AsyncPaginateFormField
  control={control}
  name="products"
  label="Select Products"
  placeholder="Search products..."
  loadOptions={loadOptions}
  isMultiSelect={true}
  enableCheckboxes={true}
  checkboxPosition="left" // or "right"
  additional={{ page: 1 }}
  defaultAdditional={{ page: 1 }}
/>
```

#### Checkbox Features:

- **No menu close**: Clicking checkboxes doesn't close the dropdown menu
- **Visual feedback**: Clear indication of selected/unselected state
- **Position control**: Choose `left` or `right` checkbox placement
- **Click handling**: Checkbox clicks are separate from option clicks
- **Accessibility**: Proper focus and keyboard navigation support

#### When to use checkboxes:

- Multi-select with many options
- Users need to see their selections while browsing
- Better UX for complex selection scenarios
- When menu should stay open during selection

### Cache Control

```tsx
<AsyncPaginateFormField
  // ... other props
  clearCacheOnSearchChange={true} // Clear cache when search changes
  clearCacheOnMenuClose={false} // Keep cache when menu closes
  cacheUniqs={[userId]} // Clear cache when userId changes
/>
```

### Custom Load Behavior

```tsx
<AsyncPaginateFormField
  // ... other props
  shouldLoadMore={(scrollHeight, clientHeight, scrollTop) => {
    // Custom logic to determine when to load more
    return scrollTop > (scrollHeight - clientHeight) * 0.8;
  }}
  reduceOptions={(prevOptions, loadedOptions, additional) => {
    // Custom logic to merge options
    return [...prevOptions, ...loadedOptions];
  }}
/>
```

### Multi-Select Support

```tsx
<AsyncPaginateFormField
  // ... other props
  isMultiSelect={true}
  onChange={(values) => {
    // Handle multiple selected values
    console.log("Selected options:", values);
  }}
/>
```

## Direct Fieldset Usage

For more control, you can use the fieldset components directly:

```tsx
import { Fieldset } from "@massivemusicui/massive-base-ui";

function DirectFieldsetUsage() {
  return (
    <Fieldset size="medium">
      <Fieldset.Label>Select Options</Fieldset.Label>
      <Fieldset.AsyncPaginate
        placeholder="Search..."
        loadOptions={loadOptions}
        onChange={(value) => console.log(value)}
        value={null}
      />
    </Fieldset>
  );
}
```

## Error Handling

```tsx
const loadOptionsWithErrorHandling = async (
  inputValue,
  loadedOptions,
  additional,
) => {
  try {
    const response = await fetch(
      `/api/options?search=${inputValue}&offset=${loadedOptions.length}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      options: data.results,
      hasMore: data.has_more,
    };
  } catch (error) {
    console.error("Failed to load options:", error);
    return {
      options: [],
      hasMore: false,
    };
  }
};

// Usage with error timeout
<AsyncPaginateFormField
  loadOptions={loadOptionsWithErrorHandling}
  reloadOnErrorTimeout={2000} // Retry after 2 seconds on error
/>;
```

## TypeScript Support

All components are fully typed. You can extend the option type:

```tsx
interface CustomOption extends FieldsetSelectOption {
  value: string | number | boolean;
  label: string;
  description?: string;
  category?: string;
}

const loadCustomOptions = async (
  inputValue: string,
  loadedOptions: readonly CustomOption[],
): Promise<{
  options: CustomOption[];
  hasMore: boolean;
  additional?: any;
}> => {
  // Your implementation
};
```

## Examples

Check the sandbox examples from react-select-async-paginate:

- [Simple](https://codesandbox.io/s/o75rno2w65)
- [Multi](https://codesandbox.io/s/2323yrlo9r)
- [Creatable](https://codesandbox.io/s/5ycdz)
- [Page-based](https://codesandbox.io/s/10r1k12vk7)

The components follow the same patterns but are integrated with your design system and form handling.
