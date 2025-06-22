import { DaysEnum } from "@common/types/DaysEnum";
import { ProfessorCardData } from "@common/types/ProfessorCardData";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";

export interface HomeViewModel {
    selectedDay: DaysEnum | undefined,
    today: DaysEnum | undefined,
    professorsList: ProfessorCardData[] | undefined,

    navigation: RootStackNavigationProp,

    handlePress: (item: DaysEnum) => void
}