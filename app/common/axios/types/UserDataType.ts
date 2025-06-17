import { LoginUser, User } from "@common/types/User";

export interface LoginUserDataType {
    "status": string,
    "message": string,
    "data": LoginUser
}

export interface UserDataType {
    "status": string,
    "message": string,
    "data": User
}