import React from "react";
import { toast } from "react-toastify";

const handleImageChange = (
  isUpdate: boolean,
  imageFiles: File[],
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>,
  existingImages: string[],
  imagesToRemove: string[],
  e: React.ChangeEvent<HTMLInputElement>,
) => {
  const files = Array.from(e.target.files || []);
  const total =
    (isUpdate
      ? imageFiles.length + existingImages.length - imagesToRemove.length
      : imageFiles.length) + files.length;
  if (total > 3) {
    toast.error("Maximum 3 images allowed");
    return;
  }
  setImageFiles([...imageFiles, ...files]);
};

export default handleImageChange;
