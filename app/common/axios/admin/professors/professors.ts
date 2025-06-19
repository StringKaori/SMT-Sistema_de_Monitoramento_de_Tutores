import { APIError } from "@common/axios/types/APIError";
import { connector } from "@common/axios/connector";
import { defaultErrorAction } from "@common/axios/defaultErrorAction";
import { ProfessorDataType } from "@common/axios/types/ProfessorDataType";

const endpoint = "/admin/professors";

const createProfessor = async (
  name: string,
  email: string,
  onError: (data: APIError) => void,
  onSuccess: () => void
) => {
  try {
    await connector.post(endpoint, { name, email });
    onSuccess();
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const getProfessorsList = async (
  onError: (data: APIError) => void,
  onSuccess: (data: ProfessorDataType) => void
) => {
  try {
    const response = await connector.get(endpoint)
    onSuccess(response.data as ProfessorDataType);
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const deleteProfessor = async (
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

const updateProfessor = async (
  id: string,
  name: string,
  email: string,
  onError: (e: APIError) => void
) => {
  try {
    await connector.put(`${endpoint}/${id}`, { name, email })
    return "Professor successfully updated!";
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

export { createProfessor , getProfessorsList, deleteProfessor, updateProfessor };
