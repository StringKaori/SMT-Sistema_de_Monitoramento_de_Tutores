import { APIError } from "@common/axios/types/APIError";
import { connector } from "@common/axios/connector";
import { defaultErrorAction } from "@common/axios/defaultErrorAction";
import { ClassroomsDataType } from "@common/axios/types/ClassroomsDataType";

const endpoint = "/admin/classrooms";

const createClassroom = async (
  description: string,
  block: string,
  floor: string,
  capacity: string,
  observation: string,
  onError: (data: APIError) => void,
  onSuccess: () => void
) => {
  try {
    await connector.post(endpoint, {
      description,
      block,
      floor,
      capacity,
      observation,
    });
    onSuccess();
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const getClassroomsList = async (
  onError: (data: APIError) => void,
  onSuccess: (data: ClassroomsDataType) => void
) => {
  try {
    const response = await connector.get(endpoint);
    onSuccess(response.data as ClassroomsDataType);
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const deleteClassroom = async (id: string, onError: (e: APIError) => void) => {
  try {
    const response = await connector.delete(`${endpoint}/${id}`);
    return response.data.message;
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const updateClassroom = async (
  id: string,
  description: string,
  block: string,
  floor: string,
  capacity: string,
  observation: string,
  onError: (e: APIError) => void
) => {
  try {
    await connector.put(`${endpoint}/${id}`, {
      description,
      block,
      floor,
      capacity,
      observation,
    });
    return "Classroom successfully updated!";
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

export { createClassroom, getClassroomsList, deleteClassroom, updateClassroom };
