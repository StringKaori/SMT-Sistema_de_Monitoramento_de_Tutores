import { CRUDScreenData } from "@common/types/CRUDScreenData";
import { DefaultFormData } from "@common/types/DefaultFormData";
import { ProfessorData } from "@common/types/ProfessorCardData";
import { RoomData } from "@common/types/RoomCardData";

export type RootStackParamList = {
    LoginScreen: undefined;
    BottomTab: undefined;
    ProfessorScreen: ProfessorData;
    RoomsMoreInfoScreen: RoomData;
    CRUDScreen: CRUDScreenData;
    DefaultForm: DefaultFormData;
    ResetPasswordForm: undefined;
}