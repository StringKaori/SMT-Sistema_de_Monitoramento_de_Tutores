import { FloorsEnum } from "@common/types/FloorsEnum";
import { RoomCardData } from "@common/types/RoomCardData";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";

export interface RoomViewModel {
  mockRooms: RoomCardData,
  selectedFloor: FloorsEnum,
  navigation: RootStackNavigationProp,

  handlePress: (item: FloorsEnum) => void,
}