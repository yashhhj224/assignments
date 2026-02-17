
import { useState } from "react";
import { uploadImagesApi } from "../api/uploadApi";
import { parseApiErrorMessage } from "../utils/errorParser";

type UploadState = {
  isUploading: boolean;
  error: string | null;
};

export const useUpload = () => {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    error: null
  });

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxFileSize = 2 * 1024 * 1024;
  const maxFiles = 5;

  const validateImages = (files: File[]) => {
    if (files.length > maxFiles) {
      return `Maximum ${maxFiles} images allowed`;
    }

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return "Only JPG, PNG, WEBP images are allowed";
      }

      if (file.size > maxFileSize) {
        return "Each image must be under 2MB";
      }
    }

    return null;
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const validationError = validateImages(files);

    if (validationError) {
      setState({
        isUploading: false,
        error: validationError
      });

      return [];
    }

    setState({
      isUploading: true,
      error: null
    });

    try {
      const uploadedImages = await uploadImagesApi(files);

      setState({
        isUploading: false,
        error: null
      });

      return uploadedImages;
    } catch (error) {
      const message = parseApiErrorMessage(error);

      setState({
        isUploading: false,
        error: message
      });

      return [];
    }
  };

  const clearUploadError = () => {
    setState((prev) => ({
      ...prev,
      error: null
    }));
  };

  return {
    isUploading: state.isUploading,
    uploadError: state.error,
    uploadImages,
    clearUploadError
  };
};
