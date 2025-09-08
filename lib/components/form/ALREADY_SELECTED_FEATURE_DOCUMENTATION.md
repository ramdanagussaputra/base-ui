# "Already Selected" Feature Implementation

This document outlines the implementation of the "already selected" feature for form select components in the massive-base-ui library.

## 🎯 Overview

The "already selected" feature allows select components to visually indicate and prevent selection of options that have already been chosen in other form fields or contexts. This enhances user experience by:

- **Preventing duplicate selections** across multiple form fields
- **Providing visual feedback** when options are unavailable
- **Maintaining form consistency** and data integrity
- **Improving accessibility** with clear visual states

## 📁 Files Modified/Created

### Core Components

1. **`FieldsetSelectOptionWithSelectedState.tsx`** - New custom option component
2. **`FieldsetSelect.tsx`** - Enhanced with already selected props
3. **`FieldsetAsyncSelect.tsx`** - Enhanced with already selected props

### Form Field Components

4. **`SelectFormField.tsx`** - Enhanced for react-hook-form integration
5. **`AsyncSelectFormField.tsx`** - Enhanced for react-hook-form integration

### Documentation & Examples

6. **`ALREADY_SELECTED_FEATURE_EXAMPLE.tsx`** - Basic usage examples
7. **`FORM_FIELD_ALREADY_SELECTED_EXAMPLE.tsx`** - Form field usage examples
8. **`FormSelects.tsx`** (Styleguide) - Live demo component

### Exports

9. **`lib/components/form/index.ts`** - Added export for utility function

## 🔧 API Reference

### New Props Added

#### FieldsetSelect & FieldsetAsyncSelect

```typescript
interface FieldsetSelectProps {
  // Existing props...

  // New "already selected" props
  alreadySelectedValues?: FieldsetSelectOption[];
  showAlreadySelectedText?: boolean;
  alreadySelectedText?: string;
}
```

#### SelectFormField & AsyncSelectFormField

```typescript
interface SelectFormFieldProps {
  // Existing props...

  // New "already selected" props
  alreadySelectedValues?: FieldsetSelectOption[];
  showAlreadySelectedText?: boolean;
  alreadySelectedText?: string;
}
```

### Utility Function

```typescript
createFieldsetSelectOptionWithSelectedState({
  alreadySelectedValues: FieldsetSelectOption[];
  currentValue?: FieldsetSelectOption | null;
  showAlreadySelectedText?: boolean;
  alreadySelectedText?: string;
}) => OptionComponent
```

## 💡 Usage Examples

### 1. Basic Fieldset Select

```tsx
<Fieldset.Select
  placeholder="Select territory"
  options={territoryOptions}
  value={selectedTerritory}
  onChange={setSelectedTerritory}
  alreadySelectedValues={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
  ]}
  showAlreadySelectedText={true}
  alreadySelectedText="(Already selected)"
/>
```

### 2. Form Field with React Hook Form

```tsx
<SelectFormField
  control={control}
  name="territory"
  label="Territory Selection"
  options={territoryOptions}
  alreadySelectedValues={alreadySelectedTerritories}
  showAlreadySelectedText={true}
  alreadySelectedText="(Used elsewhere)"
  isRequired={true}
/>
```

### 3. Manual Option Component

```tsx
<Fieldset.Select
  // ... other props
  selectComponentOptions={{
    Option: createFieldsetSelectOptionWithSelectedState({
      alreadySelectedValues: alreadySelectedTerritories,
      currentValue: selectedValue,
      showAlreadySelectedText: true,
      alreadySelectedText: "(Custom message)",
    }),
  }}
/>
```

### 4. Multi-Field Form Prevention

```tsx
function MultiTerritoryForm() {
  const { control, watch } = useForm();

  const primaryTerritory = watch("primaryTerritory");
  const secondaryTerritory = watch("secondaryTerritory");

  // Prevent same selection across fields
  const alreadySelectedForSecondary = [primaryTerritory].filter(Boolean);
  const alreadySelectedForPrimary = [secondaryTerritory].filter(Boolean);

  return (
    <FormProvider>
      <SelectFormField
        control={control}
        name="primaryTerritory"
        label="Primary Territory"
        options={territoryOptions}
        alreadySelectedValues={alreadySelectedForPrimary}
      />

      <SelectFormField
        control={control}
        name="secondaryTerritory"
        label="Secondary Territory"
        options={territoryOptions}
        alreadySelectedValues={alreadySelectedForSecondary}
      />
    </FormProvider>
  );
}
```

## 🎨 Visual States

### Normal Option

- Standard appearance with full opacity
- Clickable and selectable
- Default hover states

### Already Selected Option

- **Reduced opacity** (60%)
- **Grayed out appearance** with cursor-not-allowed
- **Custom text indicator** "(Already selected)" or custom message
- **Click prevention** - no interaction possible
- **Maintains accessibility** with proper ARIA states

### Current Selection

- Never marked as "already selected"
- Always selectable (can change current choice)
- Standard selected state appearance

## 🔄 Smart Logic

1. **Current Value Exclusion**: The currently selected value is never marked as "already selected"
2. **Real-time Updates**: Changes to form values immediately update disabled states across fields
3. **Type Safety**: Full TypeScript support with proper type inference
4. **Backward Compatibility**: Existing code continues to work without changes
5. **Performance**: Efficient updates with minimal re-renders

## 🌐 Integration Points

### React Hook Form

- Seamless integration with `useForm`, `Controller`, and `watch`
- Proper validation and error handling
- Form state synchronization

### React Select

- Compatible with all react-select features
- Maintains custom option component architecture
- Supports both sync and async loading

### Design System

- Consistent with existing CSS custom properties
- Responsive design support
- Accessible color contrast ratios

## 📖 Testing & Demo

### Styleguide Integration

The feature is demonstrated in the styleguide at:

- **URL**: `http://localhost:5174/styleguide`
- **Section**: "Form Fields with Already Selected Feature"

### Test Scenarios

1. **Basic Prevention**: Try selecting disabled options
2. **Multi-Field**: Select in one field, see it disabled in another
3. **Real-time Updates**: Change selections and watch states update
4. **Custom Messages**: Different text for different contexts
5. **Form Validation**: Works with required fields and validation

## 🚀 Future Enhancements

Potential areas for expansion:

1. **Group-based Prevention**: Disable entire option groups
2. **Conditional Logic**: More complex rules for when options are disabled
3. **Animation Support**: Smooth transitions for state changes
4. **Keyboard Navigation**: Enhanced a11y for disabled options
5. **Multi-Select Support**: Extend to multi-select scenarios

## 📝 Notes

- The feature is **opt-in** - existing components work unchanged
- **Performance optimized** with minimal overhead when not used
- **Accessible** with proper ARIA support and visual indicators
- **Customizable** with various configuration options
- **Type-safe** with full TypeScript support

---

_This implementation provides a robust foundation for preventing duplicate selections while maintaining excellent user experience and developer ergonomics._
