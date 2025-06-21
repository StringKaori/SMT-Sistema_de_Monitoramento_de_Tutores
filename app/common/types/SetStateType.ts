import { Dispatch, SetStateAction } from "react";
import { Course } from "./Course";
import { CourseDataType } from "@common/axios/types/CourseDataType";

export type StringSetter  = Dispatch<SetStateAction<string>>;
export type StringOrUndefinedSetter  = Dispatch<SetStateAction<string | undefined>>;

export type BooleanSetter  = Dispatch<SetStateAction<boolean>>;
export type BooleanOrUndefinedSetter  = Dispatch<SetStateAction<boolean | undefined>>;

export type NumberSetter  = Dispatch<SetStateAction<number>>;
export type NumberOrUndefinedSetter  = Dispatch<SetStateAction<number | undefined>>;

export type CourseSetter  = Dispatch<SetStateAction<Course>>;
export type CourseOrUndefinedSetter  = Dispatch<SetStateAction<Course | undefined>>;
export type CourseDataTypeOrUndefinedSetter  = Dispatch<SetStateAction<CourseDataType | undefined>>;

export type AnySetter  = Dispatch<SetStateAction<any>>;