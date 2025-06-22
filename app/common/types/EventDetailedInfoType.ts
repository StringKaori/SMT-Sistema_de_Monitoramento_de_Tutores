import { Classrooms } from "./Classrooms";
import { Course } from "./Course";
import { DaysEnum } from "./DaysEnum";
import { Discipline } from "./Discipline";
import { Professor } from "./Professor";

export type EventDetailedInfoType = {
    id: string,
    description: string,
    weekday: DaysEnum,
    startTime: string,
    endTime: string,
    classroom: Classrooms,
    professor: Professor,
    course: Course,
    discipline: Discipline
};