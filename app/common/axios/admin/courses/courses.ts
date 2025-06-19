import { APIError } from "@common/axios/types/APIError";
import { connector } from "@common/axios/connector";
import { defaultErrorAction } from "@common/axios/defaultErrorAction";
import { CourseDataType } from "@common/axios/types/CourseDataType";

const endpoint = "/admin/courses";

const createCourse = async (
  name: string,
  abbreviation: string,
  onError: (data: APIError) => void,
  onSuccess: () => void
) => {
  try {
    await connector.post(endpoint, {
      name,
      abbreviation,
    });
    onSuccess();
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const getCoursesList = async (
  onError: (data: APIError) => void,
  onSuccess: (data: CourseDataType) => void
) => {
  try {
    const response = await connector.get(endpoint);
    onSuccess(response.data as CourseDataType);
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const deleteCourse = async (id: string, onError: (e: APIError) => void) => {
  try {
    const response = await connector.delete(`${endpoint}/${id}`);
    return response.data.message;
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

const updateCourse = async (
  id: string,
  name: string,
  abbreviation: string,
  onError: (e: APIError) => void
) => {
  try {
    await connector.put(`${endpoint}/${id}`, {
      name,
      abbreviation,
    });
    return "Course successfully updated!";
  } catch (e) {
    defaultErrorAction(e, onError);
  }
};

export { createCourse, getCoursesList, deleteCourse, updateCourse };
