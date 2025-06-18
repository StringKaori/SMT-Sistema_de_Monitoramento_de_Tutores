import { APIError } from "@common/axios";
import { StringOrUndefinedSetter } from "@common/types/SetStateType";

export interface UserFormViewModel {
    fullName: string | undefined, 
    setFullName: StringOrUndefinedSetter,

    email: string | undefined,
    setEmail: StringOrUndefinedSetter,

    showError: boolean,

    handlePress: (id?: string) => void,
    onError: (e: APIError) => void,
    onSuccess: () => void,
}
