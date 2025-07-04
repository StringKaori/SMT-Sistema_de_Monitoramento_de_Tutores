import { Dispatch, SetStateAction } from "react";
import { Course } from "./Course";
import { CourseDataType } from "@common/axios/types/CourseDataType";
import { DaysEnum } from "./DaysEnum";
import { ClassroomsDataType } from "@common/axios/types/ClassroomsDataType";
import { ProfessorDataType } from "@common/axios/types/ProfessorDataType";
import { DisciplineDataType } from "@common/axios/types/DisciplineDataType";

export type StringSetter  = Dispatch<SetStateAction<string>>;
export type StringOrUndefinedSetter  = Dispatch<SetStateAction<string | undefined>>;

export type BooleanSetter  = Dispatch<SetStateAction<boolean>>;
export type BooleanOrUndefinedSetter  = Dispatch<SetStateAction<boolean | undefined>>;

export type NumberSetter  = Dispatch<SetStateAction<number>>;
export type NumberOrUndefinedSetter  = Dispatch<SetStateAction<number | undefined>>;

export type CourseSetter  = Dispatch<SetStateAction<Course>>;
export type CourseOrUndefinedSetter  = Dispatch<SetStateAction<Course | undefined>>;
export type CourseDataTypeOrUndefinedSetter  = Dispatch<SetStateAction<CourseDataType | undefined>>;

export type ClassroomDataTypeOrUndefinedSetter  = Dispatch<SetStateAction<ClassroomsDataType | undefined>>;

export type ProfessorDataTypeOrUndefinedSetter  = Dispatch<SetStateAction<ProfessorDataType | undefined>>;
export type DisciplineDataTypeOrUndefinedSetter  = Dispatch<SetStateAction<DisciplineDataType | undefined>>;

export type DaysEnumArraySetter  = Dispatch<SetStateAction<{ label: string; value: DaysEnum; }[]>>;

export type DateOrUndefinedSetter = Dispatch<SetStateAction<Date | undefined>>;

export type AnySetter  = Dispatch<SetStateAction<any>>;