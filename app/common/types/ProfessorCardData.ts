import { DaysEnum } from "./DaysEnum";

export type ProfessorCardData = {
    [key in keyof typeof DaysEnum]: ProfessorData[]
}

// TODO alterar esse tipo para receber uma room[]
export type ProfessorData = {
    name: string;
    room: string;
    initialDate: string;
    endDate: string;
}