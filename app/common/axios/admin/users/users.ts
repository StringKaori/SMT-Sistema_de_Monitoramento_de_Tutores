import { APIError } from "@common/axios/types/APIError";
import { connector } from "@common/axios/connector";
import axios from "axios";
import { UserDataType } from "@common/axios/types/UserDataType";

const endpoint = "/admin/users";

const defaultErrorAction = (e: unknown, onError: (data: APIError) => void) => {
  if (axios.isAxiosError(e) && e.response?.data) {
    const apiError = e.response.data as APIError;
    onError(apiError);
    return;
  }
  console.error(e);
};

const createUser = async (
  fullName: string,
  email: string,
  onError: (data: APIError) => void,
  onSuccess: () => void
) => {
  try {
    await connector.post(endpoint, { fullName, email });
    onSuccess();
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const getUsersList = async (
  onError: (data: APIError) => void,
  onSuccess: (data: UserDataType) => void
) => {
  try {
    const response = await connector.get(endpoint)
    onSuccess(response.data as UserDataType);
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const deleteUser = async (
  id: string,
  onError: (e: APIError) => void
) => {
  try {
    const response = await connector.delete(`${endpoint}/${id}`)
    return response.data.message;
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const updateUser = async (
  id: string,
  fullName: string,
  email: string,
  onError: (e: APIError) => void
) => {
  try {
    await connector.put(`${endpoint}/${id}`, { fullName, email })
    return "User successfully updated!";
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

export { createUser, getUsersList, deleteUser, updateUser };
