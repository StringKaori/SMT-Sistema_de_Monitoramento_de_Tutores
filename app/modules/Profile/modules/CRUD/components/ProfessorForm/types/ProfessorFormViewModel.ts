import { APIError } from "@common/axios";
import { StringOrUndefinedSetter } from "@common/types/SetStateType";

export interface ProfessorFormViewModel {
    name: string | undefined, 
    setName: StringOrUndefinedSetter,

    email: string | undefined,
    setEmail: StringOrUndefinedSetter,

    showError: boolean,

    handlePress: () => void,
    onError: (e: APIError) => void,
    onSuccess: () => void,
}
