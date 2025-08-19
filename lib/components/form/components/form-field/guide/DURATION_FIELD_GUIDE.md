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
/>
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
