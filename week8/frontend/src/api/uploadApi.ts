
import { API_ROUTES } from "../constants/apiRoutes";
import { sendRequest } from "./apiClient";

type UploadImagesResponse = {
  images: string[];
};

export const uploadImagesApi = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await sendRequest<UploadImagesResponse, FormData>({
    endpoint: API_ROUTES.UPLOADS.UPLOAD_IMAGES,
    method: "POST",
    body: formData,
    isFormData: true
  });

  return response.images;
};
