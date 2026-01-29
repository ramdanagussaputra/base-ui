import { useState } from "react";
import Cropper from "react-easy-crop";

import { getCroppedImg } from "#/utils/imageCrop";

import { useImageCropState, ZOOM_CONFIG, ROTATION_CONFIG } from "./hooks";
import {
  ModalHeader,
  LoadingState,
  AspectRatioToggle,
  SliderControl,
  FlipButton,
  ActionButtons,
} from "./components";

interface ImageCropModalProps {
  /** Image source as Data URL or URL string */
  imageSrc: string;
  /** Original filename for the output file */
  fileName: string;
  /** Callback when cropped image is saved */
  onSave: (croppedFile: File) => void;
  /** Callback when modal is cancelled */
  onCancel: () => void;
  /** Initial aspect ratio (e.g., 1 for square, 16/9 for widescreen) */
  aspectRatio?: number;
}

export function ImageCropModal({
  imageSrc,
  fileName,
  onSave,
  onCancel,
  aspectRatio: initialAspectRatio,
}: Readonly<ImageCropModalProps>) {
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    displayImageUrl,
    crop,
    zoom,
    rotation,
    aspectRatio,
    flip,
    croppedAreaPixels,
    isReady,
    setCrop,
    setZoom,
    setRotation,
    setAspectRatio,
    handleCropComplete,
    toggleFlipHorizontal,
    toggleFlipVertical,
  } = useImageCropState(imageSrc, initialAspectRatio);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;

    setIsProcessing(true);
    try {
      const croppedFile = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
        flip,
        fileName,
      );
      onSave(croppedFile);
    } catch (error) {
      console.error("Error cropping image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const shouldShowCropper = isReady && aspectRatio !== undefined;

  return (
    <div className="bg-neutral-0 flex w-full flex-col rounded-2xl">
      <ModalHeader onClose={onCancel} />

      {/* Cropper Area */}
      <div className="relative h-[28rem] w-full">
        {!isReady ? (
          <LoadingState />
        ) : (
          shouldShowCropper && (
            <Cropper
              key={`${aspectRatio}-${displayImageUrl}`}
              image={displayImageUrl}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={handleCropComplete}
            />
          )
        )}
      </div>

      {/* Controls */}
      <div className="border-secondary-100 flex flex-col gap-4 border-t px-6 py-4">
        <AspectRatioToggle
          currentValue={aspectRatio}
          onChange={setAspectRatio}
        />

        <SliderControl
          label="Zoom"
          value={zoom}
          min={ZOOM_CONFIG.min}
          max={ZOOM_CONFIG.max}
          step={ZOOM_CONFIG.step}
          onChange={setZoom}
        />

        <SliderControl
          label="Rotation"
          value={rotation}
          min={ROTATION_CONFIG.min}
          max={ROTATION_CONFIG.max}
          step={ROTATION_CONFIG.step}
          onChange={setRotation}
        />

        {/* Flip Controls and Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            <FlipButton
              isActive={flip.horizontal}
              onClick={toggleFlipHorizontal}
              icon="horizontal"
              label="Flip H"
            />
            <FlipButton
              isActive={flip.vertical}
              onClick={toggleFlipVertical}
              icon="vertical"
              label="Flip V"
            />
          </div>

          <ActionButtons
            onCancel={onCancel}
            onSave={handleSave}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
}
