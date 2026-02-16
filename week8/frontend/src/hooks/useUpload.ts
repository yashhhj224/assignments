
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

  const uploadImages = async (files: File[]): Promise<string[]> => {
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
