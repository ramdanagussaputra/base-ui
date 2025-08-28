# Dialog Button Configuration

The dialog system now supports configurable buttons when using it programmatically. This allows you to customize the appearance and behavior of dialog buttons while maintaining backward compatibility.

## Button Configuration Options

Each button can be configured with the following properties:

```typescript
interface DialogButtonConfig {
  text?: string; // Button text
  size?: "extra-small" | "small" | "medium" | "large"; // Button size
  color?: "primary" | "secondary" | "error"; // Button color
  variant?: "solid" | "light" | "no-background" | "outline" | "link"; // Button style
  isDisabled?: boolean; // Disabled state
  isLoading?: boolean; // Loading state
  className?: string; // Additional CSS classes
}
```

## Usage Examples

### 1. Basic Usage with Button Configuration

```typescript
import { useDialog } from '#/components/dialog';

function MyComponent() {
  const { showDialog } = useDialog();

  const handleShowDialog = () => {
    showDialog({
      title: "Custom Dialog",
      description: "This dialog has customized buttons",
      confirmButton: {
        text: "Save Changes",
        color: "primary",
        variant: "solid",
        size: "medium"
      },
      cancelButton: {
        text: "Discard",
        color: "error",
        variant: "outline",
        size: "medium"
      },
      onConfirm: () => console.log("Changes saved!"),
      onCancel: () => console.log("Changes discarded!")
    });
  };

  return <button onClick={handleShowDialog}>Show Dialog</button>;
}
```

### 2. Using the Convenient Confirm Method

```typescript
import { useDialog } from '#/components/dialog';

function DeleteButton() {
  const { confirm } = useDialog();

  const handleDelete = () => {
    confirm({
      title: "Delete Item",
      description: "Are you sure you want to delete this item? This action cannot be undone.",
      confirmButton: {
        text: "Delete",
        color: "error",
        variant: "solid"
      },
      cancelButton: {
        text: "Keep",
        color: "secondary",
        variant: "outline"
      },
      onConfirm: () => {
        // Perform deletion
        console.log("Item deleted");
      }
    });
  };

  return (
    <button onClick={handleDelete}>
      Delete Item
    </button>
  );
}
```

### 3. Loading States

```typescript
import { useDialog } from '#/components/dialog';

function SaveButton() {
  const { showDialog, closeDialog } = useDialog();

  const handleSave = () => {
    showDialog({
      title: "Save Changes",
      description: "Do you want to save your changes?",
      confirmButton: {
        text: "Save",
        color: "primary",
        variant: "solid",
        isLoading: false // Will be controlled programmatically
      },
      cancelButton: {
        text: "Cancel",
        variant: "outline"
      },
      onConfirm: async () => {
        // Show loading state
        // This would need to be implemented with state management
        try {
          await saveChanges();
          closeDialog();
        } catch (error) {
          // Handle error
        }
      }
    });
  };

  return <button onClick={handleSave}>Save</button>;
}
```

### 4. Backward Compatibility

The old API still works without any changes:

```typescript
// This still works exactly as before
showDialog({
  title: "Old Style Dialog",
  confirmText: "OK",
  cancelText: "Cancel",
  onConfirm: () => console.log("Confirmed!"),
});
```

### 5. Mixed Usage

You can mix old and new styles:

```typescript
showDialog({
  title: "Mixed Style",
  confirmText: "Fallback Text", // Used if confirmButton.text is not provided
  confirmButton: {
    color: "error",
    variant: "solid",
    // text will fallback to confirmText
  },
  cancelText: "Cancel", // Used as-is since no cancelButton config
});
```

## Priority Rules

1. **Button Text**: `confirmButton.text` > `confirmText` > "Confirm"
2. **Button Text**: `cancelButton.text` > `cancelText` > "Cancel"
3. **Button Display**: Buttons are shown if either the text OR button config is provided
4. **Loading State**: `confirmButton.isLoading` > `isConfirmLoading` > false

## Default Values

If no button configuration is provided, the dialog uses these defaults:

- **Confirm Button**: `{ variant: "solid", color: "primary", size: "medium" }`
- **Cancel Button**: `{ variant: "outline", color: "secondary", size: "medium" }`

## Type Safety

Import the types for full TypeScript support:

```typescript
import {
  useDialog,
  type DialogButtonConfig,
  type DialogConfig,
} from "#/components/dialog";
```
