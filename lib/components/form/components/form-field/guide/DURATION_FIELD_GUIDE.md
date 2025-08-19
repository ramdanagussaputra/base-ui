# DurationFormField Component Guide

A flexible, clean, and performant duration input component that supports hours, minutes, and seconds with configurable field visibility.

## Overview

The `DurationFormField` component provides a user-friendly interface for entering time durations with:

- **Flexible Field Configuration**: Show/hide hours, minutes, seconds independently
- **Automatic Overflow Handling**: Minutes ≥ 60 convert to hours, seconds ≥ 60 convert to minutes
- **Clean Code Architecture**: External utility functions for optimal performance
- **Dynamic Layout**: CSS Grid automatically adjusts based on visible fields
- **Form Integration**: Full react-hook-form compatibility

## Basic Usage

```tsx
import { DurationFormField } from "./path/to/DurationFormField";

<DurationFormField
  name="duration"
  setValue={setValue}
  watch={watch}
  control={control}
  label="Duration"
/>;
```

## Configuration Examples

### 1. All Fields (Default)

```tsx
<DurationFormField
  name="fullDuration"
  setValue={setValue}
  watch={watch}
  control={control}
  // All fields shown by default
  // showHours={true}
  // showMinutes={true}
  // showSeconds={true}
/>
// Output Format: "000:00:00" (hhh:mm:ss)
```

### 2. Hours and Minutes Only

```tsx
<DurationFormField
  name="hoursMinutes"
  setValue={setValue}
  watch={watch}
  control={control}
  showHours={true}
  showMinutes={true}
  showSeconds={false}
  label="Duration (Hours:Minutes)"
/>
// Output Format: "000:00" (hhh:mm)
```

### 3. Minutes and Seconds Only

```tsx
<DurationFormField
  name="minutesSeconds"
  setValue={setValue}
  watch={watch}
  control={control}
  showHours={false}
  showMinutes={true}
  showSeconds={true}
  label="Duration (Minutes:Seconds)"
/>
// Output Format: "00:00" (mm:ss)
```

### 4. Single Field Examples

#### Hours Only

```tsx
<DurationFormField
  name="hoursOnly"
  setValue={setValue}
  watch={watch}
  control={control}
  showHours={true}
  showMinutes={false}
  showSeconds={false}
  label="Duration (Hours)"
/>
// Output Format: "000" (hhh)
```

#### Minutes Only

```tsx
<DurationFormField
  name="minutesOnly"
  setValue={setValue}
  watch={watch}
  control={control}
  showHours={false}
  showMinutes={true}
  showSeconds={false}
  label="Duration (Minutes)"
/>
// Output Format: "00" (mm)
```

#### Seconds Only

```tsx
<DurationFormField
  name="secondsOnly"
  setValue={setValue}
  watch={watch}
  control={control}
  showHours={false}
  showMinutes={false}
  showSeconds={true}
  label="Duration (Seconds)"
/>
// Output Format: "00" (ss)
```

## Component Props

| Prop              | Type                      | Default      | Description                                       |
| ----------------- | ------------------------- | ------------ | ------------------------------------------------- |
| `name`            | `string`                  | -            | **Required**. Form field name for react-hook-form |
| `setValue`        | `UseFormSetValue<any>`    | -            | **Required**. react-hook-form setValue function   |
| `watch`           | `UseFormWatch<any>`       | -            | **Required**. react-hook-form watch function      |
| `control`         | `Control`                 | -            | **Required**. react-hook-form control object      |
| `showHours`       | `boolean`                 | `true`       | Whether to show the hours field (3 digits max)    |
| `showMinutes`     | `boolean`                 | `true`       | Whether to show the minutes field (2 digits max)  |
| `showSeconds`     | `boolean`                 | `true`       | Whether to show the seconds field (2 digits max)  |
| `label`           | `string`                  | `"Duration"` | Field label text                                  |
| `fieldName`       | `string`                  | -            | Custom field name for error messages              |
| `isRequired`      | `boolean`                 | `false`      | Whether the field is required                     |
| `isDisabled`      | `boolean`                 | `false`      | Whether the field is disabled                     |
| `size`            | `string`                  | `"medium"`   | Field size variant                                |
| `withoutTagLabel` | `boolean`                 | `false`      | Hide label tag styling                            |
| `endElement`      | `ReactNode`               | -            | Element to display at the end of each input       |
| `onChange`        | `(value: string) => void` | -            | Optional change handler                           |
| `rules`           | `object`                  | -            | Additional react-hook-form validation rules       |

## Architecture & Performance

### Clean Code Principles

- **No Abbreviations**: All variables use full, descriptive names
- **External Functions**: Pure utility functions moved outside component for performance
- **Clear Structure**: Organized sections with logical separation
- **Constants**: No magic numbers, all values are named constants

### Performance Optimizations

- **Static Functions**: Utility functions don't recreate on re-render
- **Inline Styles**: Dynamic grid layout uses `style` prop instead of template literal classes
- **Minimal Re-renders**: Optimized dependencies in useEffect

### External Utility Functions

```typescript
// These functions are defined outside the component for performance
padHours(value: string): string
padMinutes(value: string): string
padSeconds(value: string): string
normalizeDuration(hours: string, minutes: string, seconds: string)
buildFormatString(hours, minutes, seconds, showHours, showMinutes, showSeconds): string
parseFormatString(value, showHours, showMinutes, showSeconds)
generateGridColumns(showHours, showMinutes, showSeconds): string
```

## Features & Behavior

### Smart Overflow Handling

- **Seconds ≥ 60**: Automatically converts to minutes + remaining seconds
- **Minutes ≥ 60**: Automatically converts to hours + remaining minutes
- **Cascading**: Handles multiple overflows (e.g., 125 seconds → 2 minutes 5 seconds)

### Dynamic Layout System

- **CSS Grid**: Uses `grid-template-columns` with inline styles
- **Responsive**: Automatically adapts to visible field combinations
- **Separators**: Colons (`:`) only appear between visible fields

### Input Validation

- **Numeric Only**: Automatically filters non-numeric characters
- **Length Limits**: Hours (3 digits), Minutes/Seconds (2 digits each)
- **Zero Padding**: Adds leading zeros on blur for consistent formatting

### Form Integration

- **react-hook-form**: Full integration with validation and error handling
- **Real-time Updates**: Form value updates on every keystroke
- **Error Display**: Shows validation errors below the field group

## Advanced Usage

### With Custom Validation

```tsx
<DurationFormField
  name="workHours"
  setValue={setValue}
  watch={watch}
  control={control}
  showHours={true}
  showMinutes={true}
  showSeconds={false}
  isRequired={true}
  rules={{
    validate: (value) => {
      const [hours, minutes] = value.split(":");
      const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
      return totalMinutes <= 480 || "Maximum 8 hours allowed";
    },
  }}
  label="Work Hours"
/>
```

### With End Element

```tsx
<DurationFormField
  name="duration"
  setValue={setValue}
  watch={watch}
  control={control}
  endElement={<Icon name="clock" />}
  label="Session Duration"
/>
```

### Complete Form Example

```tsx
import { useForm } from "react-hook-form";

function MyForm() {
  const { control, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      totalTime: "001:30:00",
      breakTime: "00:15",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // data.totalTime = "001:30:00"
    // data.breakTime = "00:15"
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DurationFormField
        name="totalTime"
        setValue={setValue}
        watch={watch}
        control={control}
        label="Total Duration"
        isRequired={true}
      />

      <DurationFormField
        name="breakTime"
        setValue={setValue}
        watch={watch}
        control={control}
        showHours={false}
        showMinutes={true}
        showSeconds={true}
        label="Break Duration"
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Technical Implementation

### Dynamic Grid System

The component uses CSS Grid with dynamic column templates:

```css
/* Example for 3 fields: hours, minutes, seconds */
grid-template-columns: 1fr max-content 1fr max-content 1fr;

/* Example for 2 fields: minutes, seconds */
grid-template-columns: 1fr max-content 1fr;
```

The `gridTemplateColumns` style is generated by:

```javascript
gridColumns.replace(/_/g, " ");
// "1fr_max-content_1fr" → "1fr max-content 1fr"
```

### Why Inline Styles?

Dynamic Tailwind classes like `grid-cols-[${gridColumns}]` don't work because:

1. **Purging**: Tailwind removes unused classes at build time
2. **Template Literals**: Dynamic class names aren't detected by Tailwind's scanner
3. **Solution**: Use `style` prop for dynamic CSS properties

## Field Specifications

| Field       | Max Length | Placeholder | Zero-Padded | Overflow Behavior         |
| ----------- | ---------- | ----------- | ----------- | ------------------------- |
| **Hours**   | 3 digits   | `"hhh"`     | `"000"`     | No overflow (max 999)     |
| **Minutes** | 2 digits   | `"mm"`      | `"00"`      | ≥60 → converts to hours   |
| **Seconds** | 2 digits   | `"ss"`      | `"00"`      | ≥60 → converts to minutes |

## Best Practices

### ✅ Do

- Use descriptive `name` props for form fields
- Set appropriate `label` text for accessibility
- Configure field visibility based on use case needs
- Add validation rules for business logic constraints
- Test with various input combinations

### ❌ Don't

- Disable all fields (component will show console warning)
- Rely on dynamic Tailwind classes for layout
- Mix controlled and uncontrolled form patterns
- Skip form validation for critical duration inputs

## Browser Support

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **CSS Grid**: Required for layout (supported in all modern browsers)
- **ES6+ Features**: Uses arrow functions, template literals, destructuring

## Migration Guide

### From Previous Versions

If upgrading from earlier versions:

1. **No Breaking Changes**: All existing props work identically
2. **New Features**: Add `showHours`, `showMinutes`, `showSeconds` as needed
3. **Performance**: Automatic improvement from external functions
4. **Styling**: Replace any custom grid classes with component's built-in layout
