import { RoomCardData } from "@common/types/RoomCardData";
import Mock from './mock/mock.json'
import { useState } from "react";
import { FloorsEnum } from "@common/types/FloorsEnum";
import { RoomViewModel } from "./types/RoomViewModel";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";

const useRoomViewModel = (): RoomViewModel => {
    const mockRooms: RoomCardData = Mock;
    const [selectedFloor, setSelectedFloor] = useState<FloorsEnum>(FloorsEnum.First);
    const navigation = useNavigation<RootStackNavigationProp>();

    const handlePress = (item: FloorsEnum) => {
        setSelectedFloor(item)
    }

    return {
        mockRooms,
        selectedFloor,
        navigation,
        
        handlePress
    }
}

export { useRoomViewModel }