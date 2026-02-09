import { useCallback, useState, useEffect } from "react";
import { Area } from "react-easy-crop";

import { FlipState, createFlippedImageUrl } from "#/utils/imageCrop";

const ZOOM_CONFIG = { min: 1, max: 3, step: 0.1 };
const ROTATION_CONFIG = { min: -180, max: 180, step: 1 };
const CROPPER_READY_DELAY_MS = 500;

export { ZOOM_CONFIG, ROTATION_CONFIG };

export function useImageCropState(
  imageSrc: string,
  initialAspectRatio?: number,
) {
  const [displayImageUrl, setDisplayImageUrl] = useState(imageSrc);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(ZOOM_CONFIG.min);
  const [rotation, setRotation] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  const [flip, setFlip] = useState<FlipState>({
    horizontal: false,
    vertical: false,
  });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Derived state for zoom percentage
  // Using a 0–100 zoom range results in an overly aggressive zoom scale
  const zoomPercentage =
    ((zoom - ZOOM_CONFIG.min) / (ZOOM_CONFIG.max - ZOOM_CONFIG.min)) * 100;
  const setZoomPercentage = (percentage: number) => {
    const newZoom =
      ZOOM_CONFIG.min +
      (percentage / 100) * (ZOOM_CONFIG.max - ZOOM_CONFIG.min);
    setZoom(newZoom);
  };

  // Delay cropper rendering to ensure proper layout calculation
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), CROPPER_READY_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Initialize aspect ratio from prop
  useEffect(() => {
    setAspectRatio(initialAspectRatio);
  }, [initialAspectRatio]);

  // Reset crop position when aspect ratio changes
  useEffect(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(ZOOM_CONFIG.min);
  }, [aspectRatio]);

  // Update display image when flip state changes
  useEffect(() => {
    const hasFlip = flip.horizontal || flip.vertical;

    if (!hasFlip) {
      setDisplayImageUrl(imageSrc);
      return;
    }

    createFlippedImageUrl(imageSrc, flip).then(setDisplayImageUrl);
  }, [flip, imageSrc]);

  const handleCropComplete = useCallback(
    (_: Area, croppedPixels: Area) => setCroppedAreaPixels(croppedPixels),
    [],
  );

  const toggleFlipHorizontal = useCallback(
    () => setFlip((prev) => ({ ...prev, horizontal: !prev.horizontal })),
    [],
  );

  const toggleFlipVertical = useCallback(
    () => setFlip((prev) => ({ ...prev, vertical: !prev.vertical })),
    [],
  );

  return {
    // State
    displayImageUrl,
    crop,
    zoom,
    rotation,
    aspectRatio,
    flip,
    croppedAreaPixels,
    isReady,
    // Setters
    setCrop,
    setZoom,
    setRotation,
    setAspectRatio,
    // Handlers
    handleCropComplete,
    toggleFlipHorizontal,
    toggleFlipVertical,
    // Derived
    zoomPercentage,
    setZoomPercentage,
  };
}
