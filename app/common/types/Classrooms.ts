import { Events } from "./Events";

export type Classrooms = {       
    description: string;
    block: string;
    floor: string;
    capacity: number,
    observation: string,
    id: string,
};

export type ClassroomsWithEvents = {
    description: string;
    block: string;
    floor: string;
    capacity: number,
    observation: string,
    id: string,
    events: Events[]
}