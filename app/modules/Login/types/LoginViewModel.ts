import { StringOrUndefinedSetter } from "@common/types/SetStateType"

export interface LoginViewModel {
    email: string | undefined,
    setEmail: StringOrUndefinedSetter,
    password: string | undefined,
    setPassword: StringOrUndefinedSetter,
    shouldShowError: boolean,

    handleSignIn: () => void
}