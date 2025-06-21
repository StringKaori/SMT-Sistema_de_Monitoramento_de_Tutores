import { APIError } from "@common/axios";
import { deleteClassroom, getClassroomsList } from "@common/axios/admin/classrooms/classrooms";
import { deleteCourse, getCoursesList } from "@common/axios/admin/courses/courses";
import { deleteDiscipline, getDisciplinesList } from "@common/axios/admin/disciplines/disciplines";
import { deleteProfessor, getProfessorsList } from "@common/axios/admin/professors/professors";
import { deleteUser, getUsersList } from "@common/axios/admin/users/users";
import { EntityTypes } from "@common/types/CRUDScreenData";

export const entityRESTMap: Record<
  EntityTypes,
  {
    get: (
      onError: (e: APIError) => void,
      onSuccess: (data: any) => void
    ) => void;
    delete: (id: string, onError: (e: APIError) => void) => any;
  }
> = {
  [EntityTypes.Classrooms]: {
    get: async (onError, onSuccess) => {
      await getClassroomsList(onError, onSuccess);
    },
    delete: async (id, onError) => {
      return await deleteClassroom(id, onError);
    },
  },

  [EntityTypes.Courses]: {
    get: async (onError, onSuccess) => {
      await getCoursesList(onError, onSuccess);
    },
    delete: async (id, onError) => {
      return await deleteCourse(id, onError);
    },
  },

  [EntityTypes.Disciplines]: {
    get: async (onError, onSuccess) => {
      await getDisciplinesList(onError, onSuccess)
    },
    delete: async (id, onError) => {
      return await deleteDiscipline(id, onError);
    },
  },

  [EntityTypes.Events]: {
    get: async (onError, onSuccess) => {},
    delete: async (id, onError) => {},
  },

  [EntityTypes.Professors]: {
    get: async (onError, onSuccess) => {
      await getProfessorsList(onError, onSuccess);
    },
    delete: async (id, onError) => {
      return await deleteProfessor(id, onError);
    },
  },

  [EntityTypes.User]: {
    get: async (onError, onSuccess) => {
      await getUsersList(onError, onSuccess);
    },
    delete: async (id, onError) => {
      return await deleteUser(id, onError);
    },
  },
};
