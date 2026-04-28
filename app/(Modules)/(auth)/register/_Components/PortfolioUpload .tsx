"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ImagePlus, X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // If you have this utility, or create it
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Portfolio Image Upload Component
interface PortfolioUploadProps {
  images: File[];
  onImagesChange: (files: File[]) => void;
  maxImages?: number;
  maxSizeMB?: number;
  acceptedTypes?: string[];
}

export const PortfolioUpload = ({
  images,
  onImagesChange,
  maxImages = 10,
  maxSizeMB = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
}: PortfolioUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate preview URLs when images change
  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const validateFiles = (
    files: File[],
  ): { valid: File[]; errors: string[] } => {
    const valid: File[] = [];
    const errors: string[] = [];

    const newTotal = images.length + files.length;
    if (newTotal > maxImages) {
      errors.push(`You can only upload up to ${maxImages} images`);
      return { valid: [], errors };
    }

    files.forEach((file) => {
      if (!acceptedTypes.includes(file.type)) {
        errors.push(
          `${file.name}: Invalid file type. Only ${acceptedTypes.map((t) => t.split("/")[1]).join(", ")} allowed`,
        );
      } else if (file.size > maxSizeMB * 1024 * 1024) {
        errors.push(`${file.name}: File size exceeds ${maxSizeMB}MB`);
      } else {
        valid.push(file);
      }
    });

    return { valid, errors };
  };

  const handleFiles = (files: File[]) => {
    const { valid, errors: validationErrors } = validateFiles(files);

    if (validationErrors.length > 0) {
      setErrors((prev) => [...prev, ...validationErrors]);
      setTimeout(() => setErrors([]), 5000);
    }

    if (valid.length > 0) {
      onImagesChange([...images, ...valid]);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFiles(files);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [images],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFiles(files);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);

    onImagesChange(newImages);
    setPreviewUrls(newPreviewUrls);
  };

  return (
    <div className="w-full space-y-4">
      {/* Upload Area */}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 cursor-pointer",
          "hover:border-primary/50 hover:bg-primary/5",
          dragActive && "border-primary bg-primary/10 scale-[0.99]",
          // Light mode styles
          "border-gray-300 bg-gray-50/50",
          // Dark mode styles
          "dark:border-gray-600 dark:bg-gray-800/30",
          "dark:hover:border-primary/50 dark:hover:bg-primary/10",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <Input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <div
            className={cn(
              "p-3 rounded-full",
              "bg-primary/10",
              dragActive ? "animate-bounce" : "",
            )}
          >
            {dragActive ? (
              <Upload className="w-8 h-8 text-primary" />
            ) : (
              <ImagePlus className="w-8 h-8 text-primary" />
            )}
          </div>

          <div>
            <p
              className={cn("font-medium", "text-gray-700 dark:text-gray-300")}
            >
              {dragActive ? "Drop your images here" : "Click or drag to upload"}
            </p>
            <p
              className={cn("text-sm mt-1", "text-gray-500 dark:text-gray-400")}
            >
              Upload up to {maxImages} images • Max {maxSizeMB}MB each
            </p>
            <p
              className={cn("text-xs mt-2", "text-gray-400 dark:text-gray-500")}
            >
              Supported: {acceptedTypes.map((t) => t.split("/")[1]).join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <div
              key={index}
              className={cn(
                "text-sm p-2 rounded",
                "bg-red-50 text-red-600",
                "dark:bg-red-900/20 dark:text-red-400",
              )}
            >
              {error}
            </div>
          ))}
        </div>
      )}

      {/* Portfolio Preview Grid */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3
              className={cn("font-medium", "text-gray-700 dark:text-gray-300")}
            >
              Portfolio Images ({images.length}/{maxImages})
            </h3>
            <button
              type="button"
              onClick={() => {
                previewUrls.forEach((url) => URL.revokeObjectURL(url));
                onImagesChange([]);
              }}
              className={cn(
                "text-sm hover:text-red-600 transition-colors",
                "text-gray-500 dark:text-gray-400",
                "hover:text-red-600 dark:hover:text-red-400",
              )}
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previewUrls.map((url, index) => (
              <PortfolioImageCard
                key={index}
                url={url}
                index={index}
                onRemove={() => removeImage(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Individual Image Card Component
interface PortfolioImageCardProps {
  url: string;
  index: number;
  onRemove: () => void;
}

const PortfolioImageCard = ({
  url,
  index,
  onRemove,
}: PortfolioImageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        "relative group rounded-lg overflow-hidden",
        "border transition-all duration-200",
        "border-gray-200 dark:border-gray-700",
        "hover:shadow-lg hover:scale-105",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        <Image
          src={url}
          alt={`Portfolio ${index + 1}`}
          fill
          className={cn(
            "object-cover transition-all duration-200",
            isLoading ? "opacity-0" : "opacity-100",
          )}
          onLoad={() => setIsLoading(false)}
        />

        {/* Overlay with remove button */}
        <div
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-200",
            "flex items-center justify-center",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        >
          <Button
            onClick={onRemove}
            className={cn(
              "p-2 rounded-full transition-all duration-200 transform",
              "bg-red-500 hover:bg-red-600",
              "text-white",
              isHovered ? "scale-100" : "scale-90",
            )}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Optional: Image number indicator */}
      <div
        className={cn(
          "absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium",
          "bg-black/50 text-white",
        )}
      >
        #{index + 1}
      </div>
    </div>
  );
};

// Hook to manage portfolio state
export const usePortfolioUpload = (initialImages: File[] = []) => {
  const [images, setImages] = useState<File[]>(initialImages);

  const addImages = (newFiles: File[]) => {
    setImages((prev) => [...prev, ...newFiles]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setImages([]);
  };

  return {
    images,
    setImages,
    addImages,
    removeImage,
    clearAll,
  };
};
