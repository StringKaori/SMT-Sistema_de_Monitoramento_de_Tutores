import { FloorsEnum } from "./FloorsEnum";

export type RoomCardData = {
    [key in FloorsEnum]: RoomData[]
}

export type RoomData = {
    room: string;
    code: string;
}