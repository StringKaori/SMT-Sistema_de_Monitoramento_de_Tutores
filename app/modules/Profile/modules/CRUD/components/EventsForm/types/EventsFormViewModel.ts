import { APIError } from "@common/axios";
import { DaysEnum } from "@common/types/DaysEnum";
import {
  ClassroomDataTypeOrUndefinedSetter,
  CourseDataTypeOrUndefinedSetter,
  DateOrUndefinedSetter,
  DaysEnumArraySetter,
  DisciplineDataTypeOrUndefinedSetter,
  ProfessorDataTypeOrUndefinedSetter,
  StringOrUndefinedSetter,
} from "@common/types/SetStateType";

export interface EventsFormViewModel {
  description: string | undefined;
  setDescription: StringOrUndefinedSetter;

  weekdays: Object[];
  setWeekdays: DaysEnumArraySetter;
  selectedWeekday: string | undefined;
  setSelectedWeekday: StringOrUndefinedSetter;

  startTime: Date | undefined;
  setStartTime: DateOrUndefinedSetter;
  endTime: Date | undefined;
  setEndTime: DateOrUndefinedSetter;

  courses: any | undefined;
  setCourses: CourseDataTypeOrUndefinedSetter;
  selectedCourseID: string | undefined;
  setSelectedCourseID: StringOrUndefinedSetter;

  professors: any | undefined;
  setProfessors: ProfessorDataTypeOrUndefinedSetter;
  selectedProfessorID: string | undefined;
  setSelectedProfessorID: StringOrUndefinedSetter;

  classrooms: any | undefined;
  setClassrooms: ClassroomDataTypeOrUndefinedSetter;
  selectedClassroomID: string | undefined;
  setSelectedClassroomID: StringOrUndefinedSetter;

  disciplines: any | undefined;
  setDisciplines: DisciplineDataTypeOrUndefinedSetter;
  selectedDisciplineID: string | undefined;
  setSelectedDisciplineID: StringOrUndefinedSetter;

  showError: boolean;
  showDateError: boolean;

  handlePress: () => void;
  onError: (e: APIError) => void;
  onSuccess: () => void;
}
