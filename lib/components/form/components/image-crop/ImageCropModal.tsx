import { useState } from "react";
import Cropper from "react-easy-crop";

import { getCroppedImg } from "#/utils/imageCrop";

import {
  useImageCropState,
  ZOOM_CONFIG,
  ROTATION_CONFIG,
} from "#/components/form/components/image-crop/hooks/useImageCropState";
import {
  ModalHeader,
  LoadingState,
  AspectRatioToggle,
  SliderControl,
  FlipButton,
  ActionButtons,
  TwoWaySliderControl,
} from "#/components/form/components/image-crop/components";
import { Fieldset } from "#/components/form/components/fieldset/Fieldset";

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
  /** Whether to show aspect ratio toggle control */
  toggleAspectRatio?: boolean;
}

export function ImageCropModal({
  imageSrc,
  fileName,
  onSave,
  onCancel,
  toggleAspectRatio = false,
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
    zoomPercentage,
    setZoomPercentage,
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

  const [rotationTemp, setRotationTemp] = useState<number | string>(rotation);
  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

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
              classes={{
                containerClassName: "bg-neutral-900/50",
                mediaClassName: "bg-neutral-0",
              }}
            />
          )
        )}
      </div>

      {/* Controls */}
      <div className="border-secondary-100 flex flex-col gap-4 border-t">
        <div className="px-6 pt-4">
          {toggleAspectRatio && (
            <AspectRatioToggle
              currentValue={aspectRatio}
              onChange={setAspectRatio}
            />
          )}

          <div className="flex w-full items-center justify-between gap-5 px-5">
            <div className="grid w-full grid-cols-2 items-center gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-b3-500 text-secondary-800 min-w-[60px] uppercase">
                  ZOOM
                </label>
                <div className="flex items-center gap-3">
                  <SliderControl
                    label=""
                    value={zoom}
                    min={ZOOM_CONFIG.min}
                    max={ZOOM_CONFIG.max}
                    step={ZOOM_CONFIG.step}
                    onChange={setZoom}
                  />
                  <Fieldset className="w-[5.5rem]">
                    <Fieldset.TextInput
                      placeholder=""
                      type="number"
                      value={zoomPercentage?.toFixed(0)}
                      onChange={(val) => {
                        const numberVal = Number(val);

                        const clamped = clamp(numberVal, 0, 100);
                        setZoomPercentage(clamped);
                      }}
                    />
                  </Fieldset>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-b3-500 text-secondary-800 min-w-[60px] uppercase">
                  ROTATION
                </label>

                <div className="flex items-center gap-3">
                  <TwoWaySliderControl
                    label=""
                    value={rotation}
                    min={ROTATION_CONFIG.min}
                    max={ROTATION_CONFIG.max}
                    step={ROTATION_CONFIG.step}
                    onChange={(val) => {
                      setRotationTemp(val);
                      setRotation(val);
                    }}
                  />
                  <Fieldset className="w-[5.4rem]">
                    <Fieldset.TextInput
                      placeholder=""
                      type="text"
                      value={String(rotationTemp)}
                      onChange={(val) => {
                        // Allow:
                        // "" (empty)
                        // "-"
                        // "-123"
                        // "123"
                        if (!/^-?\d*$/.test(val)) return;

                        setRotationTemp(val);

                        // Kalau cuma "-" atau kosong, jangan diparse dulu
                        if (val === "" || val === "-") return;

                        const parsed = Number(val);
                        if (isNaN(parsed)) return;

                        const clamped = clamp(
                          parsed,
                          ROTATION_CONFIG.min,
                          ROTATION_CONFIG.max,
                        );

                        setRotationTemp(String(clamped));
                        setRotation(clamped);
                      }}
                      onBlur={() => {
                        if (
                          rotationTemp === "" ||
                          rotationTemp === "-" ||
                          isNaN(Number(rotationTemp))
                        ) {
                          setRotationTemp(String(rotation));
                        }
                      }}
                    />
                  </Fieldset>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <FlipButton onClick={toggleFlipHorizontal} icon="horizontal" />
              <FlipButton onClick={toggleFlipVertical} icon="vertical" />
            </div>
          </div>
        </div>

        <div className="border-secondary-100 flex items-center justify-between border-t px-5 py-3.5">
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
