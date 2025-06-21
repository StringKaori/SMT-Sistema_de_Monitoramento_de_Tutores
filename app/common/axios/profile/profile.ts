import { User } from "@common/types/User";
import { connector } from "../connector";
import { defaultErrorAction } from "../defaultErrorAction";
import { APIError } from "../types/APIError";

const endpoint = "/profile";

const getUserProfile = async (onError: (data: APIError) => void) => {
  try {
    const response = await connector.get(endpoint);
    return response.data as User;
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const getAndSetUserPicture = async (
  onSuccess: (encodedBase64Image: string) => void,
  onError: (data: APIError) => void
) => {
  try {
    const response = await connector.get(`${endpoint}/photo`);
    onSuccess(response.data.photo);
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const updateUserPicture = async (
  encodedBase64Image: string,
  onSuccess: () => void,
  onError: (data: APIError) => void
) => {
  try {
    await connector.patch(`${endpoint}/photo`, { encodedBase64Image });
    onSuccess();
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const updateUserPassword = async (
  currentPassword: string,
  newPassword: string,
  onSuccess: (message: string) => void,
  onError: (data: APIError) => void
) => {
  try {
    const response = await connector.patch(`${endpoint}/password`, { currentPassword, newPassword });
    onSuccess(response.data.message)
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

export { getUserProfile, updateUserPicture, getAndSetUserPicture, updateUserPassword };
