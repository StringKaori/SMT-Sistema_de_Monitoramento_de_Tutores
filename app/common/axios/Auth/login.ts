import axios from "axios";
import { connector } from "../connector";
import { LoginUserDataType } from "../types/UserDataType";
import { APIError } from "../types/APIError";

const loginUser = async (
  email: string,
  password: string,
  onError: (data: APIError) => void,
  onSuccess: (data: LoginUserDataType) => void
) => {
  try {
    const response = await connector.post("/login", { email, password });
    onSuccess(response.data as LoginUserDataType);
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
