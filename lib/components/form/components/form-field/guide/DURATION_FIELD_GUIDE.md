# DurationFormField Usage Examples

The `DurationFormField` component now supports flexible field combinations through the `showHours`, `showMinutes`, and `showSeconds` props.

## Examples

### 1. All Fields (Default)
```tsx
<DurationFormField
  name="fullDuration"
  setValue={setValue}
  watch={watch}
  control={control}
  // showHours={true}    // default
  // showMinutes={true}  // default  
  // showSeconds={true}  // default
/>
// Format: hhh:mm:ss
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
// Format: hhh:mm
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
// Format: mm:ss
```

### 4. Hours Only
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
// Format: hhh
```

### 5. Minutes Only
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
// Format: mm
```

### 6. Seconds Only
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
// Format: ss
```

## Features

- **Dynamic Layout**: The component automatically adjusts its grid layout based on visible fields
- **Smart Parsing**: Handles different format combinations intelligently
- **Overflow Logic**: Minutes ≥ 60 convert to hours, seconds ≥ 60 convert to minutes (when respective fields are visible)
- **Backward Compatibility**: Existing usage continues to work with all fields visible by default
- **Validation**: Console warning if no fields are enabled

## Field Specifications

- **Hours**: Up to 3 digits (000-999), placeholder "hhh"
- **Minutes**: Up to 2 digits (00-59), placeholder "mm", overflow converts to hours if enabled
- **Seconds**: Up to 2 digits (00-59), placeholder "ss", overflow converts to minutes if enabled
