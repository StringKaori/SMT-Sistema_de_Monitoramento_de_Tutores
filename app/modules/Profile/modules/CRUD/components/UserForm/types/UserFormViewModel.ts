import { APIError } from "@common/axios";
import { BooleanSetter, StringOrUndefinedSetter } from "@common/types/SetStateType";

export interface UserFormViewModel {
    fullName: string | undefined, 
    setFullName: StringOrUndefinedSetter,

    email: string | undefined,
    setEmail: StringOrUndefinedSetter,

    isAdmin: boolean,
    setIsAdmin: BooleanSetter,

    showError: boolean,

    handlePress: () => void,
    onError: (e: APIError) => void,
    onSuccess: () => void,
}
