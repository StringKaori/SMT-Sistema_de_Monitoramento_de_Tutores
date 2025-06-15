import { UserDataType } from "@common/axios/types/UserDataType";
import { APIError } from "@common/axios/types/APIError";
import { connector } from "@common/axios/connector";
import axios from "axios";

const createUser = async (
  fullName: string,
  email: string,
  onError: (data: APIError) => void,
  onSuccess: () => void
) => {
  try {
    await connector.post("/admin/users", { fullName, email });
    
    console.log("header token na users: ");
    console.log(connector.defaults.headers['Authorization']);
    
    onSuccess();
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.data) {
      const apiError = e.response.data as APIError;
      
    console.log("header token na users: ");
    console.log(connector.defaults.headers['x-access-token']);
      onError(apiError);
      return;
    }
    console.error(e);
  }
};

export { createUser };
