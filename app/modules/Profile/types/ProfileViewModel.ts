import { CRUDScreenData } from "@common/types/CRUDScreenData";
import { LoginUser } from "@common/types/User";

export interface ProfileViewModel {
    user: LoginUser | undefined,
    isAdmin: boolean | undefined,

    logOut: () => void,
    navigateTo: (params: CRUDScreenData) => void
}