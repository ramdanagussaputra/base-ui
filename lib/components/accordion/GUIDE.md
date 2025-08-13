# Accordion Component Guide

A comprehensive guide to using the Accordion component with all its features and capabilities.

## Table of Contents

1. [Basic Usage](#basic-usage)
2. [Component Structure](#component-structure)
3. [Props and Configuration](#props-and-configuration)
4. [Render Patterns](#render-patterns)
5. [Styling and Customization](#styling-and-customization)
6. [Global Control Features](#global-control-features)
7. [Advanced Usage](#advanced-usage)
8. [Best Practices](#best-practices)
9. [TypeScript Support](#typescript-support)
10. [Examples](#examples)

---

## Basic Usage

### Installation and Import

```tsx
import { Accordion } from "your-ui-library";
```

### Simple Accordion

```tsx
function BasicExample() {
  return (
    <Accordion>
      <Accordion.Trigger>Click to expand</Accordion.Trigger>
      <Accordion.Content>
        <p>This content is revealed when the accordion is opened.</p>
      </Accordion.Content>
    </Accordion>
  );
}
```

---

## Component Structure

The Accordion follows a **compound component pattern** with three main parts:

### Core Components

- **`<Accordion>`** - Root container that manages state
- **`<Accordion.Trigger>`** - Clickable element that toggles the accordion
- **`<Accordion.Content>`** - Content that shows/hides based on state

### Architecture

```
Accordion (Context Provider)
├── Accordion.Trigger (Click handler)
└── Accordion.Content (Conditional rendering)
```

---

## Props and Configuration

### Accordion Props

```tsx
interface AccordionProps {
  children: React.ReactNode | ((open: boolean) => React.ReactNode);
  defaultOpen?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  onRegister?: (id: string, control: AccordionControl) => (() => void) | void;
}
```

| Prop          | Type                    | Default | Description                                  |
| ------------- | ----------------------- | ------- | -------------------------------------------- |
| `children`    | `ReactNode \| Function` | -       | Content or render function                   |
| `defaultOpen` | `boolean`               | `false` | Initial open state                           |
| `className`   | `string`                | -       | Additional CSS classes                       |
| `disabled`    | `boolean`               | `false` | Disables interaction                         |
| `id`          | `string`                | -       | Unique identifier for global control         |
| `onRegister`  | `function`              | -       | Registration callback for standalone manager |

### AccordionTrigger Props

```tsx
interface AccordionTriggerProps {
  children?: React.ReactNode;
  asChild?: boolean;
}
```

| Prop       | Type        | Default | Description                     |
| ---------- | ----------- | ------- | ------------------------------- |
| `children` | `ReactNode` | -       | Trigger content                 |
| `asChild`  | `boolean`   | `false` | Render as div instead of button |

### AccordionContent Props

```tsx
interface AccordionContentProps {
  children: React.ReactNode;
}
```

| Prop       | Type        | Default | Description                   |
| ---------- | ----------- | ------- | ----------------------------- |
| `children` | `ReactNode` | -       | Content to show when expanded |

---

## Render Patterns

### Static Content Pattern

Use when content is always the same:

```tsx
<Accordion>
  <Accordion.Trigger>Static Trigger Content</Accordion.Trigger>
  <Accordion.Content>
    <p>Static content that doesn't change based on state.</p>
  </Accordion.Content>
</Accordion>
```

### Render Function Pattern

Use when you need access to the open state:

```tsx
<Accordion>
  {(isOpen) => (
    <>
      <Accordion.Trigger>
        <div className="flex items-center justify-between">
          <span>Dynamic Trigger</span>
          <Icon icon={isOpen ? ChevronUp : ChevronDown} />
        </div>
      </Accordion.Trigger>
      <Accordion.Content>
        <p>
          Content that can react to open state:{" "}
          {isOpen ? "Expanded" : "Collapsed"}
        </p>
      </Accordion.Content>
    </>
  )}
</Accordion>
```

---

## Styling and Customization

### Basic Styling

```tsx
<Accordion className="rounded-lg border">
  <Accordion.Trigger>
    <div className="cursor-pointer bg-gray-100 px-4 py-3 hover:bg-gray-200">
      Styled Trigger
    </div>
  </Accordion.Trigger>
  <Accordion.Content>
    <div className="border-t px-4 py-3">
      Styled content with proper spacing and borders.
    </div>
  </Accordion.Content>
</Accordion>
```

### Conditional Styling Based on State

```tsx
<Accordion>
  {(isOpen) => (
    <>
      <Accordion.Trigger>
        <div
          className={cn(
            "px-4 py-3 transition-colors",
            isOpen ? "bg-blue-100" : "bg-gray-100",
          )}
        >
          State-aware styling
        </div>
      </Accordion.Trigger>
      <Accordion.Content>
        <div className="px-4 py-3">Content</div>
      </Accordion.Content>
    </>
  )}
</Accordion>
```

### Custom Trigger with asChild

```tsx
<Accordion>
  <Accordion.Trigger asChild>
    <div className="custom-trigger-class">
      {/* Custom trigger that renders as div instead of button */}
      <span>Custom Trigger</span>
    </div>
  </Accordion.Trigger>
  <Accordion.Content>
    <p>Content for custom trigger</p>
  </Accordion.Content>
</Accordion>
```

---

## Global Control Features

### Approach 1: AccordionManagerProvider (Recommended)

#### Setup

```tsx
import {
  AccordionManagerProvider,
  useAccordionManager,
  Accordion,
} from "your-ui-library";

function App() {
  return (
    <AccordionManagerProvider>
      <MyAccordionPage />
    </AccordionManagerProvider>
  );
}
```

#### Usage

```tsx
function MyAccordionPage() {
  const accordionManager = useAccordionManager();

  return (
    <div>
      <div className="controls mb-4">
        <button onClick={accordionManager.openAll}>Open All</button>
        <button onClick={accordionManager.closeAll}>Close All</button>
        <button onClick={accordionManager.toggleAll}>Toggle All</button>
      </div>

      {/* Controlled accordions */}
      <Accordion id="accordion-1">
        <Accordion.Trigger>Controlled Accordion 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion>

      <Accordion id="accordion-2">
        <Accordion.Trigger>Controlled Accordion 2</Accordion.Trigger>
        <Accordion.Content>Content 2</Accordion.Content>
      </Accordion>

      {/* Independent accordion */}
      <Accordion>
        <Accordion.Trigger>Independent Accordion</Accordion.Trigger>
        <Accordion.Content>Not affected by global controls</Accordion.Content>
      </Accordion>
    </div>
  );
}
```

### Approach 2: Standalone Hook

```tsx
import { useStandaloneAccordionManager, Accordion } from "your-ui-library";

function MyComponent() {
  const accordionManager = useStandaloneAccordionManager();

  return (
    <div>
      <div className="controls mb-4">
        <button onClick={accordionManager.openAll}>
          Open All ({accordionManager.getRegisteredCount()})
        </button>
        <button onClick={accordionManager.closeAll}>Close All</button>
        <button
          onClick={() => {
            const states = accordionManager.getAllStates();
            console.log("States:", states);
          }}
        >
          Show States
        </button>
      </div>

      <Accordion id="standalone-1" onRegister={accordionManager.register}>
        <Accordion.Trigger>Standalone Accordion 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion>

      <Accordion id="standalone-2" onRegister={accordionManager.register}>
        <Accordion.Trigger>Standalone Accordion 2</Accordion.Trigger>
        <Accordion.Content>Content 2</Accordion.Content>
      </Accordion>
    </div>
  );
}
```

### Global Control Methods

#### Global Actions

- `openAll()` - Opens all registered accordions
- `closeAll()` - Closes all registered accordions
- `toggleAll()` - Toggles all registered accordions

#### Individual Control

- `openById(id: string)` - Opens specific accordion by ID
- `closeById(id: string)` - Closes specific accordion by ID
- `toggleById(id: string)` - Toggles specific accordion by ID

#### State Queries

- `getAccordionState(id: string)` - Returns open state of specific accordion
- `getAllStates()` - Returns object with all accordion states
- `getRegisteredIds()` - Returns array of registered accordion IDs
- `getRegisteredCount()` - Returns number of registered accordions

---

## Advanced Usage

### Mixed Control Patterns

```tsx
function MixedExample() {
  const accordionManager = useAccordionManager();

  return (
    <div>
      {/* Globally controlled */}
      <Accordion id="global-1">
        <Accordion.Trigger>Global Control</Accordion.Trigger>
        <Accordion.Content>Controlled by global buttons</Accordion.Content>
      </Accordion>

      {/* Independent */}
      <Accordion>
        <Accordion.Trigger>Independent</Accordion.Trigger>
        <Accordion.Content>Works independently</Accordion.Content>
      </Accordion>

      {/* Disabled */}
      <Accordion disabled>
        <Accordion.Trigger>Disabled</Accordion.Trigger>
        <Accordion.Content>Cannot be opened</Accordion.Content>
      </Accordion>
    </div>
  );
}
```

### Dynamic Accordion Lists

```tsx
function DynamicAccordions() {
  const [items, setItems] = useState([
    { id: "item-1", title: "Item 1", content: "Content 1" },
    { id: "item-2", title: "Item 2", content: "Content 2" },
  ]);

  return (
    <div>
      {items.map((item) => (
        <Accordion key={item.id} id={item.id}>
          <Accordion.Trigger>{item.title}</Accordion.Trigger>
          <Accordion.Content>{item.content}</Accordion.Content>
        </Accordion>
      ))}
    </div>
  );
}
```

### Nested Accordions

```tsx
function NestedAccordions() {
  return (
    <Accordion id="parent">
      <Accordion.Trigger>Parent Accordion</Accordion.Trigger>
      <Accordion.Content>
        <div className="pl-4">
          <Accordion id="child-1">
            <Accordion.Trigger>Child Accordion 1</Accordion.Trigger>
            <Accordion.Content>Nested content 1</Accordion.Content>
          </Accordion>

          <Accordion id="child-2">
            <Accordion.Trigger>Child Accordion 2</Accordion.Trigger>
            <Accordion.Content>Nested content 2</Accordion.Content>
          </Accordion>
        </div>
      </Accordion.Content>
    </Accordion>
  );
}
```

---

## Best Practices

### 1. Use Appropriate Control Method

**Provider Pattern**: For app-wide accordion management

```tsx
// ✅ Good for large apps
<AccordionManagerProvider>
  <App />
</AccordionManagerProvider>
```

**Standalone Hook**: For isolated components

```tsx
// ✅ Good for widgets or isolated features
const manager = useStandaloneAccordionManager();
```

### 2. Provide Meaningful IDs

```tsx
// ✅ Good - descriptive IDs
<Accordion id="user-preferences">
<Accordion id="billing-information">

// ❌ Avoid - generic IDs
<Accordion id="accordion1">
<Accordion id="item">
```

### 3. Handle Loading States

```tsx
function AccordionWithLoading() {
  const [loading, setLoading] = useState(false);

  return (
    <Accordion disabled={loading}>
      <Accordion.Trigger>
        {loading ? "Loading..." : "Click to expand"}
      </Accordion.Trigger>
      <Accordion.Content>
        {loading ? <Spinner /> : <ActualContent />}
      </Accordion.Content>
    </Accordion>
  );
}
```

### 4. Accessibility Considerations

```tsx
// ✅ Good - accessible accordion
<Accordion>
  <Accordion.Trigger>
    <div role="button" aria-expanded={isOpen} aria-controls="content-1">
      Accessible Trigger
    </div>
  </Accordion.Trigger>
  <Accordion.Content>
    <div id="content-1" role="region">
      Accessible content
    </div>
  </Accordion.Content>
</Accordion>
```

### 5. Performance Optimization

```tsx
// ✅ Memoize expensive content
const ExpensiveContent = memo(() => <div>Heavy computation result</div>);

<Accordion>
  <Accordion.Trigger>Optimized Accordion</Accordion.Trigger>
  <Accordion.Content>
    <ExpensiveContent />
  </Accordion.Content>
</Accordion>;
```

---

## TypeScript Support

### Custom Accordion with Types

```tsx
interface CustomAccordionProps {
  title: string;
  content: React.ReactNode;
  priority?: "high" | "medium" | "low";
  id?: string;
}

function CustomAccordion({
  title,
  content,
  priority = "medium",
  id,
}: CustomAccordionProps) {
  const priorityColors = {
    high: "bg-red-100",
    medium: "bg-yellow-100",
    low: "bg-green-100",
  };

  return (
    <Accordion id={id} className={priorityColors[priority]}>
      <Accordion.Trigger>
        <div className="flex items-center gap-2">
          <span>{title}</span>
          <span className="text-xs">({priority})</span>
        </div>
      </Accordion.Trigger>
      <Accordion.Content>{content}</Accordion.Content>
    </Accordion>
  );
}
```

### Type-safe Manager Usage

```tsx
function TypeSafeManager() {
  const manager = useAccordionManager();

  const handleSpecificAction = (accordionId: string) => {
    // Type-safe method calls
    const isOpen = manager.getAccordionState(accordionId);

    if (isOpen) {
      manager.closeById(accordionId);
    } else {
      manager.openById(accordionId);
    }
  };

  return (
    <div>
      <button onClick={() => handleSpecificAction("specific-accordion")}>
        Toggle Specific
      </button>
    </div>
  );
}
```

---

## Examples

### FAQ Section

```tsx
function FAQSection() {
  const faqs = [
    {
      id: "faq-1",
      question: "How do I use this component?",
      answer: "Simply import and use the Accordion component...",
    },
    {
      id: "faq-2",
      question: "Can I style it?",
      answer: "Yes, you can apply custom CSS classes...",
    },
  ];

  return (
    <AccordionManagerProvider>
      <div className="mx-auto max-w-2xl">
        <div className="mb-4">
          <button
            onClick={() => useAccordionManager().closeAll()}
            className="text-sm text-blue-600"
          >
            Collapse All
          </button>
        </div>

        {faqs.map((faq) => (
          <Accordion key={faq.id} id={faq.id} className="mb-2 rounded border">
            <Accordion.Trigger>
              <div className="px-4 py-3 text-left font-medium hover:bg-gray-50">
                {faq.question}
              </div>
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="border-t bg-gray-50 px-4 py-3">{faq.answer}</div>
            </Accordion.Content>
          </Accordion>
        ))}
      </div>
    </AccordionManagerProvider>
  );
}
```

### Settings Panel

```tsx
function SettingsPanel() {
  return (
    <div className="max-w-md">
      <Accordion defaultOpen>
        <Accordion.Trigger>
          <div className="flex items-center justify-between bg-blue-100 p-3">
            <span className="font-medium">Account Settings</span>
            <Icon icon={Settings} />
          </div>
        </Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-3 p-3">
            <input placeholder="Email" className="w-full rounded border p-2" />
            <input placeholder="Name" className="w-full rounded border p-2" />
            <button className="w-full rounded bg-blue-500 p-2 text-white">
              Save Changes
            </button>
          </div>
        </Accordion.Content>
      </Accordion>

      <Accordion>
        <Accordion.Trigger>
          <div className="flex items-center justify-between bg-gray-100 p-3">
            <span className="font-medium">Privacy Settings</span>
            <Icon icon={Shield} />
          </div>
        </Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-2 p-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Allow tracking</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Email notifications</span>
            </label>
          </div>
        </Accordion.Content>
      </Accordion>
    </div>
  );
}
```

### File Explorer

```tsx
function FileExplorer() {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Accordion defaultOpen id="documents">
        {(isOpen) => (
          <>
            <Accordion.Trigger>
              <div className="flex items-center gap-2 p-2 hover:bg-gray-100">
                <Icon icon={isOpen ? FolderOpen : Folder} size={16} />
                <span>Documents</span>
              </div>
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="border-l-2 border-gray-200 pl-6">
                <div className="px-2 py-1 text-sm">document1.pdf</div>
                <div className="px-2 py-1 text-sm">document2.docx</div>

                <Accordion id="subfolder">
                  {(isSubOpen) => (
                    <>
                      <Accordion.Trigger>
                        <div className="flex items-center gap-2 p-1">
                          <Icon
                            icon={isSubOpen ? FolderOpen : Folder}
                            size={14}
                          />
                          <span className="text-sm">Subfolder</span>
                        </div>
                      </Accordion.Trigger>
                      <Accordion.Content>
                        <div className="pl-4 text-sm">
                          <div className="py-1">nested-file.txt</div>
                        </div>
                      </Accordion.Content>
                    </>
                  )}
                </Accordion>
              </div>
            </Accordion.Content>
          </>
        )}
      </Accordion>
    </div>
  );
}
```

---

## Summary

The Accordion component provides:

- ✅ **Flexible API** - Static content or render functions
- ✅ **Global Control** - Provider or standalone approaches
- ✅ **Accessibility** - Proper ARIA support
- ✅ **TypeScript** - Full type safety
- ✅ **Customizable** - Complete styling control
- ✅ **Performant** - Optimized rendering
- ✅ **Compound Pattern** - Clean, intuitive API

Choose the approach that best fits your use case and enjoy building great accordion experiences! 🚀
