import { APIError } from "@common/axios";
import { StringOrUndefinedSetter } from "@common/types/SetStateType";

export interface CourseViewModel {
    name: string | undefined, 
    setName: StringOrUndefinedSetter,

    abbreviation: string | undefined, 
    setAbbreviation: StringOrUndefinedSetter,

    showError: boolean,

    handlePress: () => void,
    onError: (e: APIError) => void,
    onSuccess: () => void,
}
