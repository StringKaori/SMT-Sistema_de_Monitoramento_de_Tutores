import { DaysEnum } from "@common/types/DaysEnum";
import { ProfessorCardData } from "@common/types/ProfessorCardData";

export interface HomeViewModel {
    mockProfessors: ProfessorCardData,
    selectedDay: DaysEnum | undefined,
    today: DaysEnum | undefined,

    handlePress: (item: DaysEnum) => void
}