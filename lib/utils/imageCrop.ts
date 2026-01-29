import { Area } from "react-easy-crop";

export interface FlipState {
  horizontal: boolean;
  vertical: boolean;
}

export async function getCroppedImg(
  imageSrc: string,
  croppedAreaPixels: Area,
  rotation: number = 0,
  flip: FlipState = { horizontal: false, vertical: false },
  fileName: string = "cropped-image.jpg",
): Promise<File> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  const rotRad = (rotation * Math.PI) / 180;

  // Calculate bounding box of the rotated image
  const bBoxWidth =
    Math.abs(Math.cos(rotRad) * image.width) +
    Math.abs(Math.sin(rotRad) * image.height);
  const bBoxHeight =
    Math.abs(Math.sin(rotRad) * image.width) +
    Math.abs(Math.cos(rotRad) * image.height);

  // Set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // Translate to center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);

  // Rotate
  ctx.rotate(rotRad);

  // Scale (flip)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);

  // Draw rotated and flipped image
  ctx.drawImage(image, -image.width / 2, -image.height / 2);

  // Create new canvas for the cropped area
  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    throw new Error("Failed to get cropped canvas context");
  }

  // Set the size to the final cropped size
  croppedCanvas.width = croppedAreaPixels.width;
  croppedCanvas.height = croppedAreaPixels.height;

  // Draw the cropped area from the rotated canvas
  croppedCtx.drawImage(
    canvas,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
  );

  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const file = new File([blob], fileName, {
          type: "image/jpeg",
          lastModified: Date.now(),
        });
        resolve(file);
      },
      "image/jpeg",
      0.92,
    );
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}

/**
 * Creates a flipped version of an image using canvas
 */
export async function createFlippedImageUrl(
  imageSrc: string,
  flip: FlipState,
): Promise<string> {
  const img = await createImage(imageSrc);

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return imageSrc;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);

  return canvas.toDataURL("image/png");
}

/**
 * Calculates slider background gradient for range inputs
 */
export function getSliderBackground(
  value: number,
  min: number,
  max: number,
): string {
  const percentage = ((value - min) / (max - min)) * 100;
  return `linear-gradient(to right, #FF6B35 0%, #FF6B35 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`;
}
