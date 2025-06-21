import { Classrooms } from "@common/types/Classrooms";
import { FloorsEnum } from "@common/types/FloorsEnum";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";

export interface RoomViewModel {
  selectedFloor: FloorsEnum,
  navigation: RootStackNavigationProp,
  rooms: Classrooms[] | undefined,

  handlePress: (item: FloorsEnum) => void,
}