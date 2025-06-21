import { DaysEnum } from "./DaysEnum"

export type Events = {       
    id: string,
    description: string,
    weekday: DaysEnum,
    startTime: string,
    endTime: string,
    classroomId: string,
    professorId: string,
    disciplineId: string,
};