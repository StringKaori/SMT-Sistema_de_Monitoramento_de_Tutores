import { APIError } from "@common/axios";
import { StringOrUndefinedSetter } from "@common/types/SetStateType";

export interface ClassroomsViewModel {
    description: string | undefined, 
    setDescription: StringOrUndefinedSetter,

    block: string | undefined, 
    setBlock: StringOrUndefinedSetter,

    floor: string | undefined, 
    setFloor: StringOrUndefinedSetter,

    capacity: string | undefined, 
    setCapacity: StringOrUndefinedSetter,

    observation: string | undefined, 
    setObservation: StringOrUndefinedSetter,

    showError: boolean,

    handlePress: () => void,
    onError: (e: APIError) => void,
    onSuccess: () => void,
}
