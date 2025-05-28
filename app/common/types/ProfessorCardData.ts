import { DaysEnum } from "./DaysEnum";

export type ProfessorCardData = {
    [key in keyof typeof DaysEnum]: ProfessorData[]
}

export type ProfessorData = {
    name: string;
    room: string;
    initialDate: string;
    endDate: string;
}