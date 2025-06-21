import { APIError } from "@common/axios/types/APIError";
import { connector } from "@common/axios/connector";
import { defaultErrorAction } from "@common/axios/defaultErrorAction";
import { ProfessorDataType } from "@common/axios/types/ProfessorDataType";

const endpoint = "/admin/disciplines";

const createDiscipline = async (
  name: string,
  abbreviation: string,
  courseId: string,
  onError: (data: APIError) => void,
  onSuccess: () => void
) => {
  try {
    await connector.post(endpoint, { name, abbreviation, courseId });
    onSuccess();
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const getDisciplinesList = async (
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

const deleteDiscipline = async (
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

const updateDiscipline = async (
  id: string,
  name: string,
  abbreviation: string,
  courseId: string,
  onError: (e: APIError) => void
) => {
  try {
    await connector.put(`${endpoint}/${id}`, { name, abbreviation, courseId })
    return "Discipline successfully updated!";
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

export { createDiscipline, getDisciplinesList, deleteDiscipline, updateDiscipline };
