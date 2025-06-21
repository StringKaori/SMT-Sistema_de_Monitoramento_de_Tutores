import { useCallback, useEffect, useState } from "react";
import { FloorsEnum } from "@common/types/FloorsEnum";
import { RoomViewModel } from "./types/RoomViewModel";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { getAllClassroomsListByFloor } from "@common/axios/dashboard/dashboard";
import { Classrooms } from "@common/types/Classrooms";

const useRoomViewModel = (): RoomViewModel => {
  const [selectedFloor, setSelectedFloor] = useState<FloorsEnum>(
    FloorsEnum.First
  );
  const [rooms, setRooms] = useState<Classrooms[]>();

  const navigation = useNavigation<RootStackNavigationProp>();

  const getFloorNumber = (floor: FloorsEnum): number => {
    const match = floor.match(/^(\d+)/);
    return match ? parseInt(match[1]) : NaN;
  };

  const loadData = useCallback(async () => {
    // yeah yeah, floors is a enum but i'm doing this,
    // like i said before, no time rn
    const floor = getFloorNumber(selectedFloor);
    const response = await getAllClassroomsListByFloor(floor);
    setRooms(response);
  }, [selectedFloor]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedFloor])
  );

  const handlePress = async (item: FloorsEnum) => {
    setSelectedFloor(item);
  };

  return {
    selectedFloor,
    navigation,
    rooms,

    handlePress,
  };
};

export { useRoomViewModel };
