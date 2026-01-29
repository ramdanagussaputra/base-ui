# Plan: Image Editing with react-easy-crop Integration

## Overview

Extend `MultipleUploadPhotoFormField.tsx` to open a crop/edit modal when a file is selected. The modal uses `react-easy-crop` for crop area selection and provides rotation + flip controls. The transformed image only commits to form state on "Save".

## Architecture Decisions

### Modal System Choice

- **Use `useModal` from existing Modal system** (not Dialog)
- Provides full control over custom content
- Already available in `lib/components/modal`
- Requires `ModalProvider` at app root

### Integration Point

- **Option A (Recommended)**: Add `onBeforeChange` hook to Fieldset upload components
  - Clean separation of concerns
  - Reusable for future image editing features
  - Non-breaking change (optional prop)
  - Works for both main and additional uploads

## Implementation Steps

### 1. Install Dependencies

```bash
pnpm add react-easy-crop
```

### 2. Create Image Crop Utility

**File**: `lib/utils/imageCrop.ts`

**Purpose**: Canvas-based image transformation

- Accept crop area pixels from react-easy-crop
- Apply rotation (0-360 degrees)
- Apply flip (horizontal/vertical)
- Return new `File` object with transformed image

**Function Signature**:

```typescript
getCroppedImg(
  imageSrc: string,
  croppedAreaPixels: Area,
  rotation: number,
  flip: { horizontal: boolean; vertical: boolean }
): Promise<File>
```

### 3. Create ImageCropModal Component

**File**: `lib/components/form/components/image-crop/ImageCropModal.tsx`

**Props**:

```typescript
interface ImageCropModalProps {
  image: File;
  onSave: (croppedFile: File) => void;
  onCancel: () => void;
}
```

**State Requirements** (following react-easy-crop patterns):

- `crop: { x: number; y: number }` - crop position
- `zoom: number` - zoom level (1-3)
- `rotation: number` - rotation angle (0-360)
- `flip: { horizontal: boolean; vertical: boolean }`
- `croppedAreaPixels: Area | null` - from onCropComplete callback

**UI Structure** (matching Figma design):

```
┌─────────────────────────────────┐
│ Edit Photo              [X]     │
├─────────────────────────────────┤
│                                 │
│     [Cropper Component]         │
│     (react-easy-crop)           │
│                                 │
├─────────────────────────────────┤
│ ZOOM    [────●────]             │
│ ROTATION [────●────]             │
│                                 │
│ [Flip H] [Flip V]   [Cancel] [Save] │
└─────────────────────────────────┘
```

**react-easy-crop Integration**:

```tsx
<Cropper
  image={imageUrl}
  crop={crop}
  zoom={zoom}
  rotation={rotation}
  aspect={undefined} // free aspect ratio
  onCropChange={setCrop}
  onZoomChange={setZoom}
  onRotationChange={setRotation}
  onCropComplete={onCropComplete}
/>
```

**Action Handlers**:

- **Save**: Call `getCroppedImg()`, then `onSave(croppedFile)`
- **Cancel**: Call `onCancel()` without transformation
- **Flip buttons**: Toggle flip state, apply on save

### 4. Extend Fieldset Upload Components

**Files**:

- `lib/components/form/components/fieldset/FieldsetUploadPhoto.tsx`
- `lib/components/form/components/fieldset/FieldsetUploadPhotoAdditional.tsx`

**Changes**:

1. Add optional prop: `onBeforeChange?: (file: File) => Promise<File | null>`
2. Modify file selection handler:

```typescript
const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
  const selectedFile = event.target.files?.[0] || null;

  if (selectedFile && onBeforeChange) {
    const processedFile = await onBeforeChange(selectedFile);
    onChange?.(processedFile);
  } else {
    onChange?.(selectedFile);
  }

  // Reset input
  if (inputRef.current) {
    inputRef.current.value = "";
  }
};
```

### 5. Wire Modal into MultipleUploadPhotoFormField

**File**: `lib/components/form/components/form-field/MultipleUploadPhotoFormField.tsx`

**Changes**:

1. Import `useModal` from `#/components/modal`
2. Import `ImageCropModal`
3. Create crop handler function:

```typescript
const { showModal, closeModal } = useModal();

const handleCropImage = async (file: File): Promise<File | null> => {
  return new Promise((resolve) => {
    showModal({
      component: (
        <ImageCropModal
          image={file}
          onSave={(croppedFile) => {
            closeModal();
            resolve(croppedFile);
          }}
          onCancel={() => {
            closeModal();
            resolve(null);
          }}
        />
      ),
      isClickOutsideClose: false, // Prevent accidental dismissal
    });
  });
};
```

4. Pass `onBeforeChange={handleCropImage}` to both `Fieldset.UploadPhoto` and `Fieldset.UploadPhotoAdditional`

## Technical Specifications

### Canvas Transformation Logic

**Crop Application**:

```typescript
// 1. Create canvas with rotated dimensions
// 2. Apply rotation transform
// 3. Apply flip transform (scale -1)
// 4. Draw cropped region
// 5. Convert to Blob
// 6. Create File from Blob with original name
```

### File Naming Convention

- Preserve original filename
- Append timestamp if needed to avoid conflicts
- Maintain MIME type from original file

### Error Handling

- Catch canvas errors (memory limits, invalid dimensions)
- Fall back to original file on transformation failure
- Show error message to user

### Performance Considerations

- Preview image with `URL.createObjectURL()`
- Revoke object URL on unmount
- Limit max canvas size to prevent memory issues
- Consider max zoom level to maintain quality

## Figma Design Reference

**URL**: https://www.figma.com/design/K6pemCf3RiyooUkCAtYf4A/Documentation?node-id=18903-184042&m=dev

**Key Elements**:

- Modal title: "Edit Photo"
- Zoom slider with label "ZOOM"
- Rotation slider with label "ROTATION"
- Flip horizontal icon button
- Flip vertical icon button
- Cancel button (outlined)
- Save button (primary, orange)

## Dependencies

### New Package

- `react-easy-crop`: ^5.0.0 (or latest)

### Existing Dependencies Used

- `react-hook-form`: Form state management
- Modal system from `#/components/modal`
- Fieldset components
- Icon components for flip/crop buttons

## Testing Considerations

### Manual Testing Checklist

- [ ] Upload image → modal opens
- [ ] Adjust crop area → preview updates
- [ ] Adjust zoom → image scales correctly
- [ ] Rotate image → preview rotates
- [ ] Flip horizontal → image mirrors
- [ ] Flip vertical → image inverts
- [ ] Click Save → cropped image commits to form
- [ ] Click Cancel → original value unchanged
- [ ] Upload multiple images → each opens modal independently
- [ ] Validation still works (file size, extension)

### Edge Cases

- Very large images (>10MB)
- Very small images (<100px)
- Non-square aspect ratios
- Rotation + flip combinations
- Cancel during transformation
- Multiple rapid uploads

## Open Questions for Refinement

1. **Aspect Ratio Constraint**: Should crop be free-form or constrained (e.g., 1:1, 4:3)?
2. **Quality Settings**: What JPEG quality for output (default: 0.92)?
3. **Max Image Dimensions**: Limit canvas size to prevent memory issues?
4. **Mobile UX**: Touch gestures supported by react-easy-crop, but test on mobile
5. **Accessibility**: Keyboard controls for zoom/rotation?
6. **Provider Setup**: Document ModalProvider requirement for consumers

## Success Criteria

- ✅ Crop behavior matches react-easy-crop demo
- ✅ Rotation works (0-360 degrees)
- ✅ Flip horizontal/vertical works
- ✅ Cancel leaves original value untouched
- ✅ Save commits transformed image
- ✅ Existing upload validation not regressed
- ✅ Modal design matches Figma exactly
- ✅ Works for both main and additional upload slots

## Out of Scope

- ❌ Filters or advanced effects
- ❌ Multiple crop areas
- ❌ Undo/redo functionality
- ❌ Persisting crop state across sessions
- ❌ Server-side processing
- ❌ Preset aspect ratios (could be future enhancement)
