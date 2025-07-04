import { AnySetter, BooleanSetter } from "@common/types/SetStateType";

export interface CRUDViewModel {
    apiData: any,

    selectedItem: any, 
    setSelectedItem: AnySetter,

    modalVisible: boolean, 
    setModalVisible: BooleanSetter,

    onDeleteItem: () => void,
    didPressEdit: (item: any) => void,
    
    navigateToForm: (isEditing: boolean) => void,
}