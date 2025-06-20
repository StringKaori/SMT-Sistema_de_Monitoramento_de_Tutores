import { User } from "@common/types/User";
import { connector } from "../connector";
import { defaultErrorAction } from "../defaultErrorAction";
import { APIError } from "../types/APIError";

const endpoint = "/profile"

const getUserProfile = async (
  onError: (data: APIError) => void,
) => {
  try {
    const response = await connector.get(endpoint)
    return response.data as User
  } catch (e) {
    defaultErrorAction(e, onError);
  }

};

export { getUserProfile };