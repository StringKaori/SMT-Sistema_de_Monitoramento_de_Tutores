import axios from "axios";
import { connector } from "../connector";
import { LoginDataType } from "./types/LoginDataType";
import { APIError } from "../types/APIError";

const loginUser = async (
  email: string,
  password: string,
  onError: (data: APIError) => void,
  onSuccess: (data: LoginDataType) => void
) => {
  try {
    const response = await connector.post("/login", { email, password });
    onSuccess(response.data as LoginDataType);
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.data) {
      const apiError = e.response.data as APIError;
      onError(apiError);
      return;
    }
    console.error(e);
  }
};

export { loginUser };
