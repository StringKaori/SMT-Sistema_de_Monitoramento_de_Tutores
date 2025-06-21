import { APIError } from "@common/axios";
import { CourseDataTypeOrUndefinedSetter, StringOrUndefinedSetter } from "@common/types/SetStateType";

export interface DisciplinesFormViewModel {
    name: string | undefined, 
    setName: StringOrUndefinedSetter,

    abbreviation: string | undefined,
    setAbbreviation: StringOrUndefinedSetter,

    courses: any | undefined,
    setCourses: CourseDataTypeOrUndefinedSetter,

    selectedCourseID: string | undefined,
    setSelectedCourseID: StringOrUndefinedSetter,

    showError: boolean,

    handlePress: () => void,
    onError: (e: APIError) => void,
    onSuccess: () => void,
}
