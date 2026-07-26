import { useState } from "react";

export default function useImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  function handleFile(file) {
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setSelectedImage({
      file,
      preview,
      name: file.name,
      size: file.size,
      type: file.type,
    });
  }

  function clearImage() {
    if (selectedImage?.preview) {
      URL.revokeObjectURL(selectedImage.preview);
    }

    setSelectedImage(null);
  }

  return {
    selectedImage,
    handleFile,
    clearImage,
  };
}