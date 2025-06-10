import { DaysEnum } from "@common/types/DaysEnum";
import { ProfessorCardData } from "@common/types/ProfessorCardData";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";

export interface HomeViewModel {
    mockProfessors: ProfessorCardData,
    selectedDay: DaysEnum | undefined,
    today: DaysEnum | undefined,
    navigation: RootStackNavigationProp,

    handlePress: (item: DaysEnum) => void
}