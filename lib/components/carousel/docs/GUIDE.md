# Carousel Component

The `Carousel` component is a flexible and composable slider built using the Compound Component pattern. It supports touch gestures, autoplay, and custom navigation controls.

## Features

- **Compound Component API**: Fully composable structure (`Carousel`, `Carousel.Content`, `Carousel.Arrow`, `Carousel.Dots`).
- **Touch & Drag Support**: Smooth swipe gestures for mobile and desktop.
- **Autoplay**: Optional autoplay with pause on hover/interaction.
- **Responsive**: Adapts to container width.
- **Customizable**: Easy to style and extend.

## Usage

### Basic Example

```tsx
import { Carousel } from "massive-base-ui";

function MyCarousel() {
  return (
    <Carousel className="h-96 w-full">
      <Carousel.Content>
        <img src="image1.jpg" alt="Slide 1" />
        <img src="image2.jpg" alt="Slide 2" />
        <img src="image3.jpg" alt="Slide 3" />
      </Carousel.Content>

      <Carousel.Arrow direction="left" />
      <Carousel.Arrow direction="right" />
      <Carousel.Dots />
    </Carousel>
  );
}
```

### Autoplay Example

```tsx
<Carousel autoPlay interval={3000}>
  <Carousel.Content>{/* Slides */}</Carousel.Content>
  {/* Controls */}
</Carousel>
```

## Components

### `Carousel` (Root)

The main wrapper component that provides context to all children.

| Prop        | Type        | Default | Description                               |
| ----------- | ----------- | ------- | ----------------------------------------- |
| `children`  | `ReactNode` | -       | The carousel content and controls.        |
| `className` | `string`    | -       | Additional CSS classes for the container. |
| `autoPlay`  | `boolean`   | `false` | Enables automatic sliding.                |
| `interval`  | `number`    | `3000`  | Time in ms between slides.                |

### `Carousel.Content`

The viewport for the slides. It handles the sliding animation and drag interactions.

| Prop        | Type        | Description             |
| ----------- | ----------- | ----------------------- |
| `children`  | `ReactNode` | The slides to display.  |
| `className` | `string`    | Additional CSS classes. |

### `Carousel.Arrow`

Navigation buttons to go to the next or previous slide.

| Prop        | Type                | Description                 |
| ----------- | ------------------- | --------------------------- |
| `direction` | `'left' \| 'right'` | The direction of the arrow. |

### `Carousel.Dots`

Pagination indicators showing the current slide and total slides.

## Architecture

The component is structured as follows:

- **`Carousel.tsx`**: The root component that initializes state (`totalSlides`, `currentIndex`) and provides the `CarouselContext`.
- **`context/CarouselContext.tsx`**: React Context definition for sharing state.
- **`components/`**: Contains the sub-components (`CarouselContent`, `CarouselArrow`, `CarouselDots`).
- **`hooks/`**: Contains the logic for navigation, autoplay, and drag gestures.

## Extending

To add new controls (e.g., a "Play/Pause" button), create a new component that consumes `useCarouselContext`:

```tsx
import { useCarouselContext } from "./context/CarouselContext";

const PlayPauseButton = () => {
  const { isPaused, togglePause } = useCarouselContext(); // (You might need to expose these in context first)
  return <button onClick={togglePause}>{isPaused ? "Play" : "Pause"}</button>;
};
```
