import { APIError } from "@common/axios/types/APIError";
import { connector } from "@common/axios/connector";
import { defaultErrorAction } from "@common/axios/defaultErrorAction";
import { EventsDataType } from "@common/axios/types/EventsDataType";

const endpoint = "/admin/events";

const createEvent = async (
  description: string,
  weekday: string,
  startTime: string,
  endTime: string,
  classroomId: string,
  professorId: string,
  courseId: string,
  disciplineId: string,
  onError: (data: APIError) => void,
  onSuccess: () => void
) => {
  try {
    await connector.post(endpoint, {
      description,
      weekday,
      startTime,
      endTime,
      classroomId,
      professorId,
      courseId,
      disciplineId,
    });
    onSuccess();
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const getEventsList = async (
  onError: (data: APIError) => void,
  onSuccess: (data: EventsDataType) => void
) => {
  try {
    const response = await connector.get(endpoint);
    onSuccess(response.data as EventsDataType);
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const deleteEvent = async (id: string, onError: (e: APIError) => void) => {
  try {
    const response = await connector.delete(`${endpoint}/${id}`);
    return response.data.message;
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const updateEvent = async (
  id: string,
  description: string,
  weekday: string,
  startTime: string,
  endTime: string,
  classroomId: string,
  professorId: string,
  courseId: string,
  disciplineId: string,
  onError: (e: APIError) => void
) => {
  try {
    await connector.put(`${endpoint}/${id}`, {
      description,
      weekday,
      startTime,
      endTime,
      classroomId,
      professorId,
      courseId,
      disciplineId,
    });
    return "Discipline successfully updated!";
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

export { createEvent, getEventsList, deleteEvent, updateEvent };
