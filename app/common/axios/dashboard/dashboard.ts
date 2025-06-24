import { Classrooms } from "@common/types/Classrooms";
import { connector } from "../connector";
import { DaysEnum } from "@common/types/DaysEnum";
import { ProfessorCardData } from "@common/types/ProfessorCardData";
import { EventDetailedInfoType } from "@common/types/EventDetailedInfoType";
import { SearchResultType } from "@common/types/SearchScreenData";

const endpoint = "/dashboard";

const getAllClassroomsListByFloor = async (floor: number) => {
  try {
    const response = await connector.get(
      `${endpoint}/classrooms?floor=${floor}`
    );
    return response.data as Classrooms[];
  } catch (e) {
    console.error(e);
  }
};

const getProfessorsListByWeekdayAndCourse = async (
  weekday: DaysEnum,
  courseID: string
) => {
  try {
    const response = await connector.get(
      `${endpoint}/professors?weekday=${weekday.toUpperCase()}&course=${courseID}`
    );
    return response.data as ProfessorCardData[];
  } catch (e) {
    console.error(e);
  }
};

const getEventDetailedInfo = async (id: string) => {
  try {
    const response = await connector.get(`${endpoint}/events/${id}`);
    return response.data as EventDetailedInfoType;
  } catch (e) {
    console.error(e);
  }
};

const getAllEventsFromProfessorById = async (id: string) => {
  try {
    const response = await connector.get(`${endpoint}/professors/${id}`);
    return response.data as any;
  } catch (e) {
    console.error(e);
  }
};

const getAllEventsFromClassroomById = async (id: string) => {
  try {
    const response = await connector.get(`${endpoint}/classrooms/${id}`);
    return response.data as any;
  } catch (e) {
    console.error(e);
  }
};

const searchProfessorsAndClassrooms = async (query: string) => {
  try {
    const response = await connector.get(`${endpoint}/search?query=${query}`);
    return response.data as SearchResultType;
  } catch (e) {
    console.error(e);
  }
};

export {
  getAllClassroomsListByFloor,
  getProfessorsListByWeekdayAndCourse,
  getEventDetailedInfo,
  getAllEventsFromProfessorById,
  getAllEventsFromClassroomById,
  searchProfessorsAndClassrooms
};
