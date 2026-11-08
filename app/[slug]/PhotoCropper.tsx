'use client';

import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

interface PhotoCropperProps {
  targetWidth: number;
  targetHeight: number;
  targetAspect: number;
}

export default function PhotoCropper({ targetWidth, targetHeight, targetAspect }: PhotoCropperProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

const handleDownload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      // --- ÉTAPE 1: N9t3o tsawira b l-3bar l-asli dyal l-crop (High Res 100%) ---
      const originalCropCanvas = document.createElement('canvas');
      originalCropCanvas.width = croppedAreaPixels.width;
      originalCropCanvas.height = croppedAreaPixels.height;
      const ctxOriginal = originalCropCanvas.getContext('2d');

      if (ctxOriginal) {
        // Background bida
        ctxOriginal.fillStyle = '#ffffff';
        ctxOriginal.fillRect(0, 0, originalCropCanvas.width, originalCropCanvas.height);
        
        // Kan-rsmo l-crop bla man-bdlo l-size dyalo
        ctxOriginal.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        // --- ÉTAPE 2: Nsghroha l-3bar dyal l-Visa (ex: 600x600) b a7san algorithme ---
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = targetWidth;
        finalCanvas.height = targetHeight;
        const ctxFinal = finalCanvas.getContext('2d');

        if (ctxFinal) {
          ctxFinal.imageSmoothingEnabled = true;
          ctxFinal.imageSmoothingQuality = 'high';

          // Kan-rsmo l-crop l-asli f l-canvas sghir
          ctxFinal.drawImage(
            originalCropCanvas,
            0,
            0,
            targetWidth,
            targetHeight
          );

          // Export b 100% Quality
          const dataUrl = finalCanvas.toDataURL('image/jpeg', 1.0);
          const link = document.createElement('a');
          link.download = `visa-photo-${targetWidth}x${targetHeight}.jpg`;
          link.href = dataUrl;
          link.click();
        }
      }
    };
  };
  const handleReset = () => {
    setImageSrc(null);
    setZoom(1);
  };

  return (
    <div className="max-w-xl w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mt-8">
      {!imageSrc ? (
        <div className="mt-8">
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 border-blue-500 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-10 h-10 mb-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">Click to upload photo</p>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center space-y-6">
          <div className="relative w-full h-80 bg-gray-900 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={targetAspect}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>

          <div className="w-full px-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Zoom</label>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
            />
          </div>

          <div className="flex w-full space-x-4">
            <button onClick={handleReset} className="w-1/3 flex justify-center py-3 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white">
              Change Photo
            </button>
            <button onClick={handleDownload} className="w-2/3 flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700">
              Download Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}