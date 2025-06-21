import { Classrooms } from "@common/types/Classrooms";
import { CRUDScreenData } from "@common/types/CRUDScreenData";
import { DefaultFormData } from "@common/types/DefaultFormData";
import { ProfessorData } from "@common/types/ProfessorCardData";

export type RootStackParamList = {
    LoginScreen: undefined;
    BottomTab: undefined;
    ProfessorScreen: ProfessorData;
    RoomsMoreInfoScreen: Classrooms;
    CRUDScreen: CRUDScreenData;
    DefaultForm: DefaultFormData;
    ResetPasswordForm: undefined;
}