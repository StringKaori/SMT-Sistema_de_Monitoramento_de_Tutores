import axios from "axios";
import { APIError } from "./types/APIError";

export const defaultErrorAction = (e: unknown, onError: (data: APIError) => void) => {
  if (axios.isAxiosError(e) && e.response?.data) {
    const apiError = e.response.data as APIError;
    onError(apiError);
    return;
  }
  console.error(e);
};