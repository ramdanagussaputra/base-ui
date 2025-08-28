# Complete Dialog System Guide

This comprehensive guide covers all ways to use the dialog system in massive-base-ui, from simple programmatic dialogs to complex custom implementations.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Programmatic API (Recommended)](#programmatic-api-recommended)
3. [Component-Based API](#component-based-api)
4. [Button Configuration](#button-configuration)
5. [Dialog Types & Layouts](#dialog-types--layouts)
6. [Advanced Patterns](#advanced-patterns)
7. [Migration Guide](#migration-guide)
8. [API Reference](#api-reference)

## Quick Start

### Setup

First, wrap your app with the DialogProvider:

```typescript
import { DialogProvider } from '#/components/dialog';

function App() {
  return (
    <DialogProvider>
      <YourAppContent />
    </DialogProvider>
  );
}
```

### Simple Dialog

```typescript
import { useDialog } from '#/components/dialog';

function MyComponent() {
  const { confirm } = useDialog();

  const handleDelete = () => {
    confirm({
      title: "Delete Item",
      description: "This action cannot be undone.",
      onConfirm: () => deleteItem()
    });
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

## Programmatic API (Recommended)

The programmatic API is ideal for most use cases, providing clean, declarative dialog management.

### Core Hooks

#### 1. `useDialog()` - Main Hook

```typescript
const { showDialog, closeDialog, confirm } = useDialog();
```

#### 2. `useConfirmDialog()` - Specialized Hook

```typescript
const { showConfirmDialog } = useConfirmDialog();
```

## Why Use `confirm()` vs `showDialog()`?

### `confirm()` - Specialized Confirmation API
- **Purpose**: Optimized for confirmation dialogs (80% of use cases)
- **Benefits**: Smart defaults, consistent UX, minimal code, **auto-close**
- **Best for**: Delete actions, sign out, destructive operations
- **Auto-close**: Dialog automatically closes after confirm/cancel actions

```typescript
// ✅ Concise and consistent - auto-closes after action
confirm({
  title: "Delete Account",
  description: "This action cannot be undone.",
  onConfirm: () => deleteAccount()
  // Dialog automatically closes after onConfirm executes
});
});
```

### `showDialog()` - General Purpose API  
- **Purpose**: Maximum flexibility for any dialog type
- **Benefits**: Full control, custom layouts, complex interactions
- **Best for**: Forms, information display, custom workflows

```typescript
// ✅ Full control and customization
showDialog({
  title: "Edit Profile",
  type: "small",
  content: <ProfileForm />,
  confirmButton: { text: "Save Changes", color: "primary" },
  cancelButton: { text: "Discard", color: "secondary" },
  onConfirm: () => saveProfile(),
  onCancel: () => discardChanges()
});
```

### Decision Matrix

| Use Case | Recommended API | Why |
|----------|----------------|-----|
| Delete confirmation | `confirm()` | Smart defaults, consistent UX |
| Sign out prompt | `confirm()` | Standard pattern, minimal code |
| Form submission | `showDialog()` | Custom buttons, complex layout |
| Information display | `showDialog()` | Single button, custom content |
| Bulk operations | `confirm()` | Destructive action pattern |
| Multi-step wizard | `showDialog()` | Custom button text, complex flow |

### Key Differences Explained

#### 1. Developer Experience & Auto-Close
```typescript
// 🚀 CONFIRM: Fast to write, auto-closes
confirm({
  title: "Delete 5 items?",
  onConfirm: () => bulkDelete()
  // Auto-closes after onConfirm executes - no manual closeDialog() needed
});

// 😴 SHOW_DIALOG: Verbose, manual close control
showDialog({
  title: "Delete 5 items?",
  confirmText: "Delete",
  cancelText: "Cancel",
  confirmButton: { color: "error" },
  onConfirm: () => {
    bulkDelete();
    closeDialog(); // Must manually close if needed
  },
  onCancel: () => console.log("Cancelled") // Required even if just logging
});
```

#### 2. Consistency Across App
```typescript
// ✅ All confirmations look the same automatically
confirm({ title: "Delete user?", onConfirm: deleteUser });
confirm({ title: "Reset settings?", onConfirm: resetSettings });
confirm({ title: "Sign out?", onConfirm: signOut });

// ❌ Easy to create inconsistent UX with showDialog
showDialog({ title: "Delete user?", confirmText: "Remove" }); // Different text
showDialog({ title: "Reset settings?", confirmText: "Reset" }); // Different text  
showDialog({ title: "Sign out?", confirmText: "Yes" }); // Different text
```

#### 3. Smart Defaults vs Explicit Control
```typescript
// 🧠 CONFIRM: Smart about destructive actions
confirm({
  title: "Delete Account", 
  onConfirm: deleteAccount
  // Automatically: red "Delete" button, "Cancel" button, proper styling
});

// 🎛️ SHOW_DIALOG: Full control, explicit configuration
showDialog({
  title: "Edit Profile",
  type: "small",
  content: <ProfileForm />,
  confirmButton: { 
    text: "Save Changes", 
    color: "primary",
    size: "medium"
  },
  cancelButton: { 
    text: "Discard", 
    color: "secondary",
    variant: "outline"
  }
});
```

});
```

### When to Use Which?

#### Use `confirm()` for:
- ✅ Delete confirmations
- ✅ Sign out prompts  
- ✅ Form abandonment warnings
- ✅ Destructive actions
- ✅ Simple yes/no decisions
- ✅ 80% of your dialog needs

```typescript
// Perfect for confirm()
confirm({ title: "Delete post?", onConfirm: () => deletePost(id) });
confirm({ title: "Sign out?", onConfirm: signOut });
confirm({ title: "Discard changes?", onConfirm: discardChanges });
```

#### Use `showDialog()` for:
- ✅ Forms and inputs
- ✅ Information display
- ✅ Custom button text/styling
- ✅ Single-button dialogs  
- ✅ Complex layouts
- ✅ Non-confirmation workflows

```typescript
// Perfect for showDialog()
showDialog({
  title: "Settings",
  type: "small",
  content: <SettingsForm />,
  confirmButton: { text: "Save Settings" }
});

showDialog({
  title: "Welcome!",
  content: <OnboardingContent />,
  confirmText: "Get Started"
  // No cancel button for onboarding
});
```

### Basic Usage

#### Simple Confirmation

```typescript
const { confirm } = useDialog();

confirm({
  title: "Confirm Action",
  description: "Are you sure you want to proceed?",
  onConfirm: () => performAction(),
  onCancel: () => console.log("Cancelled"),
});
```

#### Custom Dialog

```typescript
const { showDialog } = useDialog();

showDialog({
  title: "Custom Dialog",
  description: "This is a custom dialog with content.",
  content: <CustomComponent />,
  type: "small",
  confirmText: "Save",
  cancelText: "Cancel",
  onConfirm: () => save(),
  onCancel: () => cancel()
});
```

#### Information Dialog (No Cancel)

```typescript
showDialog({
  title: "Information",
  description: "Operation completed successfully.",
  confirmText: "OK",
  // No cancelText means no cancel button
  onConfirm: () => console.log("Acknowledged"),
});
```

### Dialog Types

#### Regular Dialog (Default)

Centered layout with icon space, good for confirmations and alerts.

```typescript
showDialog({
  title: "Regular Dialog",
  type: "regular", // or omit (default)
  icon: <WarningIcon />,
  description: "This is a regular dialog layout."
});
```

#### Small Dialog

Compact layout, good for forms and detailed content.

```typescript
showDialog({
  title: "Small Dialog",
  type: "small",
  description: "This is a compact dialog layout.",
  content: <Form />
});
```

## Component-Based API

For maximum customization and complex layouts, use the component-based approach.

### Basic Structure

```typescript
import { Dialog } from '#/components/dialog';
import { useState } from 'react';

function CustomDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    // Handle confirmation logic
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>

      <Dialog
        isDialogOpen={isOpen}
        showDialog={() => setIsOpen(true)}
        closeDialog={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        <Dialog.Panel>
          <Dialog.Panel.Title>Custom Dialog</Dialog.Panel.Title>
          <Dialog.Panel.Description>
            This is a fully customized dialog.
          </Dialog.Panel.Description>

          {/* Custom content */}
          <div className="my-4">
            <input placeholder="Enter text..." />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 justify-end">
            <Dialog.Panel.SlotButtonCancel>
              <button className="px-4 py-2 border rounded">
                Cancel
              </button>
            </Dialog.Panel.SlotButtonCancel>

            <Dialog.Panel.SlotButtonConfirm>
              <button className="px-4 py-2 bg-blue-500 text-white rounded">
                Confirm
              </button>
            </Dialog.Panel.SlotButtonConfirm>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
```

### With Trigger Component

```typescript
<Dialog
  isDialogOpen={isOpen}
  showDialog={() => setIsOpen(true)}
  closeDialog={() => setIsOpen(false)}
  onConfirm={handleConfirm}
  onCancel={handleCancel}
>
  <Dialog.Trigger>
    <button>Open Dialog</button>
  </Dialog.Trigger>

  <Dialog.Panel>
    <Dialog.Panel.Title>Triggered Dialog</Dialog.Panel.Title>
    <Dialog.Panel.Description>
      This dialog opens when the trigger is clicked.
    </Dialog.Panel.Description>
  </Dialog.Panel>
</Dialog>
```

## Button Configuration

Customize button appearance and behavior with detailed configuration options.

### Button Configuration Interface

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

### Basic Button Configuration

```typescript
const { showDialog } = useDialog();

showDialog({
  title: "Styled Dialog",
  description: "This dialog has custom button styles.",
  confirmButton: {
    text: "Save Changes",
    color: "primary",
    variant: "solid",
    size: "medium",
  },
  cancelButton: {
    text: "Discard",
    color: "error",
    variant: "outline",
    size: "medium",
  },
  onConfirm: () => save(),
  onCancel: () => discard(),
});
```

### Advanced Button States

```typescript
// Disabled buttons
confirmButton: {
  text: "Process",
  isDisabled: true,
  color: "primary"
}

// Loading buttons
confirmButton: {
  text: "Processing...",
  isLoading: true,
  color: "primary"
}

// Custom styling
cancelButton: {
  text: "Custom Cancel",
  className: "custom-button-class",
  variant: "outline"
}
```

### Dynamic Button Updates

```typescript
const { showDialog, closeDialog } = useDialog();

const handleAsyncAction = () => {
  showDialog({
    title: "Processing",
    description: "Please wait while we process your request.",
    confirmButton: {
      text: "Processing...",
      isLoading: true,
      isDisabled: true,
    },
    // No cancel during processing
    onConfirm: async () => {
      try {
        await performAsyncAction();
        closeDialog();
        // Show success dialog
        showDialog({
          title: "Success",
          description: "Action completed successfully.",
          confirmText: "OK",
        });
      } catch (error) {
        // Show error dialog
        showDialog({
          title: "Error",
          description: "Something went wrong.",
          confirmButton: { text: "Retry", color: "error" },
          cancelButton: { text: "Cancel" },
          onConfirm: () => handleAsyncAction(),
        });
      }
    },
  });
};
```

## Dialog Types & Layouts

### Regular Dialog

- Centered content with icon space
- Good for: confirmations, alerts, simple forms
- Default type if not specified

```typescript
showDialog({
  type: "regular",
  title: "Delete Confirmation",
  icon: <TrashIcon className="text-red-500" />,
  description: "Are you sure you want to delete this item?",
  confirmButton: { text: "Delete", color: "error" },
  cancelButton: { text: "Cancel" }
});
```

### Small Dialog

- Compact layout without icon space
- Good for: forms, detailed content, multi-step flows
- Left-aligned content

```typescript
showDialog({
  type: "small",
  title: "Edit Profile",
  description: "Update your profile information.",
  content: (
    <form className="space-y-4">
      <input placeholder="Name" />
      <input placeholder="Email" />
      <textarea placeholder="Bio" />
    </form>
  ),
  confirmButton: { text: "Save", color: "primary" },
  cancelButton: { text: "Cancel", variant: "outline" }
});
```

## Advanced Patterns

### 1. Multi-Step Dialogs

```typescript
function MultiStepDialog() {
  const { showDialog } = useDialog();
  const [step, setStep] = useState(1);

  const showStep = (stepNumber: number) => {
    const steps = {
      1: {
        title: "Step 1: Basic Info",
        content: <Step1Form />,
        confirmButton: { text: "Next" },
        onConfirm: () => showStep(2)
      },
      2: {
        title: "Step 2: Details",
        content: <Step2Form />,
        confirmButton: { text: "Next" },
        cancelButton: { text: "Back" },
        onConfirm: () => showStep(3),
        onCancel: () => showStep(1)
      },
      3: {
        title: "Step 3: Confirm",
        content: <ConfirmationStep />,
        confirmButton: { text: "Submit", color: "primary" },
        cancelButton: { text: "Back" },
        onConfirm: () => submitForm(),
        onCancel: () => showStep(2)
      }
    };

    showDialog(steps[stepNumber]);
  };

  return <button onClick={() => showStep(1)}>Start Wizard</button>;
}
```

### 2. Conditional Dialogs

```typescript
const { confirm } = useDialog();

const handleAction = async (hasUnsavedChanges: boolean) => {
  if (hasUnsavedChanges) {
    confirm({
      title: "Unsaved Changes",
      description: "You have unsaved changes. What would you like to do?",
      confirmButton: { text: "Save & Continue", color: "primary" },
      cancelButton: { text: "Discard Changes", color: "error" },
      onConfirm: async () => {
        await saveChanges();
        proceedWithAction();
      },
      onCancel: () => proceedWithAction(),
    });
  } else {
    proceedWithAction();
  }
};
```

### 3. Loading States with Progress

```typescript
const { showDialog, closeDialog } = useDialog();

const handleUpload = async (file: File) => {
  showDialog({
    title: "Uploading File",
    description: "Please wait while we upload your file.",
    content: <ProgressBar />,
    confirmButton: {
      text: "Uploading...",
      isLoading: true,
      isDisabled: true
    }
  });

  try {
    await uploadFile(file, (progress) => {
      // Update progress bar
    });

    closeDialog();

    // Show success
    showDialog({
      title: "Upload Complete",
      description: "Your file has been uploaded successfully.",
      confirmText: "OK"
    });
  } catch (error) {
    closeDialog();

    // Show error with retry option
    confirm({
      title: "Upload Failed",
      description: "Failed to upload file. Would you like to try again?",
      confirmButton: { text: "Retry", color: "primary" },
      cancelButton: { text: "Cancel" },
      onConfirm: () => handleUpload(file)
    });
  }
};
```

### 4. Context-Aware Dialogs

```typescript
const useContextualDialog = () => {
  const { showDialog } = useDialog();
  const user = useUser();
  const theme = useTheme();

  return {
    showPermissionDialog: (action: string) => {
      if (!user.isAuthenticated) {
        showDialog({
          title: "Sign In Required",
          description: `Please sign in to ${action}.`,
          confirmButton: { text: "Sign In", color: "primary" },
          cancelButton: { text: "Cancel" },
          onConfirm: () => redirectToLogin(),
        });
      } else if (!user.hasPermission(action)) {
        showDialog({
          title: "Insufficient Permissions",
          description: `You don't have permission to ${action}.`,
          confirmText: "OK",
        });
      } else {
        return true; // Proceed with action
      }
      return false;
    },
  };
};
```

## Migration Guide

### From Legacy to Modern API

#### Old Way (Still Supported)

```typescript
const {
  showDialog,
  setTitle,
  setDescription,
  setConfirmText,
  setCancelText,
  setOnConfirm,
} = useDialog();

// Multiple function calls
setTitle("Confirm Delete");
setDescription("Are you sure?");
setConfirmText("Delete");
setCancelText("Cancel");
setOnConfirm(() => deleteItem());
showDialog();
```

#### New Way (Recommended)

```typescript
const { confirm } = useDialog();

// Single declarative call
confirm({
  title: "Confirm Delete",
  description: "Are you sure?",
  confirmButton: { text: "Delete", color: "error" },
  cancelButton: { text: "Cancel" },
  onConfirm: () => deleteItem(),
});
```

### Migrating Button Styling

#### Old Way

```typescript
// Limited styling options
showDialog({
  title: "Dialog",
  confirmText: "OK",
  cancelText: "Cancel",
});
```

#### New Way

```typescript
// Full button customization
showDialog({
  title: "Dialog",
  confirmButton: {
    text: "OK",
    color: "primary",
    variant: "solid",
    size: "medium",
  },
  cancelButton: {
    text: "Cancel",
    color: "secondary",
    variant: "outline",
    size: "medium",
  },
});
```

## API Reference

### Types

```typescript
// Button configuration
interface DialogButtonConfig {
  text?: string;
  size?: "extra-small" | "small" | "medium" | "large";
  color?: "primary" | "secondary" | "error";
  variant?: "solid" | "light" | "no-background" | "outline" | "link";
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

// Dialog configuration
interface DialogConfig {
  title?: string;
  description?: string;
  confirmText?: string; // Fallback if confirmButton.text not provided
  cancelText?: string; // Fallback if cancelButton.text not provided
  icon?: React.ReactNode;
  content?: React.ReactNode;
  type?: "regular" | "small";
  isConfirmLoading?: boolean; // Fallback if confirmButton.isLoading not provided
  confirmButton?: DialogButtonConfig;
  cancelButton?: DialogButtonConfig;
}

// Callback functions
interface DialogCallbacks {
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}
```

### Hooks

#### `useDialog()`

```typescript
const {
  showDialog, // (config: DialogConfig & DialogCallbacks) => void
  closeDialog, // () => void
  confirm, // (options: ConfirmOptions) => void
} = useDialog();
```

#### `useConfirmDialog()`

```typescript
const {
  showConfirmDialog, // (config: DialogConfig & DialogCallbacks) => void
} = useConfirmDialog();
```

### Components

#### `<Dialog>`

```typescript
<Dialog
  isDialogOpen={boolean}
  showDialog={() => void}
  closeDialog={() => void}
  onConfirm={() => void}
  onCancel={() => void}
>
  {children}
</Dialog>
```

#### `<Dialog.Panel>`

```typescript
<Dialog.Panel className="optional-styling">
  <Dialog.Panel.Title>Title</Dialog.Panel.Title>
  <Dialog.Panel.Description>Description</Dialog.Panel.Description>

  {/* Custom content */}

  <Dialog.Panel.SlotButtonConfirm>
    <CustomButton>Confirm</CustomButton>
  </Dialog.Panel.SlotButtonConfirm>

  <Dialog.Panel.SlotButtonCancel>
    <CustomButton>Cancel</CustomButton>
  </Dialog.Panel.SlotButtonCancel>
</Dialog.Panel>
```

### Priority Rules

1. **Button Text**: `confirmButton.text` > `confirmText` > "Confirm"
2. **Button Text**: `cancelButton.text` > `cancelText` > "Cancel"
3. **Loading State**: `confirmButton.isLoading` > `isConfirmLoading` > false
4. **Dialog Type**: `type` > `dialogType` (legacy) > "regular"
5. **Content**: `content` > `dialogContent` (legacy) > null

### Default Values

- **Dialog Type**: `"regular"`
- **Confirm Button**: `{ variant: "solid", color: "primary", size: "medium" }`
- **Cancel Button**: `{ variant: "outline", color: "secondary", size: "medium" }`
- **Button Text**: "Confirm" / "Cancel"

### Best Practices

1. **Use Programmatic API** for most cases - it's cleaner and more maintainable
2. **Use `confirm()` method** for simple confirmations
3. **Use button configuration** to maintain design consistency
4. **Always provide meaningful titles and descriptions**
5. **Use appropriate button colors** (error for destructive actions)
6. **Handle loading states** for async operations
7. **Provide cancel options** unless the action is non-interruptible
8. **Use small dialog type** for forms and detailed content
9. **Test keyboard navigation** and accessibility
10. **Keep dialog content concise** and focused on the task
