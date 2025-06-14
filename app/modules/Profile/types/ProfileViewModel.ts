import { User } from "@common/types/User";

export interface ProfileViewModel {
    user: User | undefined,
    isAdmin: boolean | undefined,
    logOut: () => void
}