import { BooleanSetter } from "@common/types/SetStateType";

export interface CRUDViewModel {
    apiData: any,

    modalVisible: boolean, 
    setModalVisible: BooleanSetter,
    
    navigateToForm: (isEditing: boolean) => void,
}