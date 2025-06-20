import { CRUDScreenData } from "@common/types/CRUDScreenData";
import { User } from "@common/types/User";

export interface ProfileViewModel {
    user: User | undefined,
    isAdmin: boolean | undefined,

    logOut: () => void,
    navigateTo: (params: CRUDScreenData) => void
}