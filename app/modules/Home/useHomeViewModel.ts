import { useEffect, useState } from "react";
import { DaysEnum } from "@common/types/DaysEnum";
import { ProfessorCardData } from "@common/types/ProfessorCardData";
import mock from "./mock/mock.json";
import { HomeViewModel } from "./types/HomeViewModel";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";

const useHomeViewModel = (): HomeViewModel => {
    
    const mockProfessors: ProfessorCardData = mock;
    const [selectedDay, setSelectedDay] = useState<DaysEnum>();
    const [today, setToday] = useState<DaysEnum>();
    const navigation = useNavigation<RootStackNavigationProp>();

    useEffect(() => {
        const todayDate = new Date();
        const todayString = todayDate.toLocaleDateString("en-US", {
            weekday: "long",
        });
        setToday(todayString as DaysEnum);
        setSelectedDay(todayString as DaysEnum);
    }, []);

    const handlePress = (item: DaysEnum) => {
        setSelectedDay(item);
    };
    
    return {
        mockProfessors,
        selectedDay, 
        today,
        navigation,

        handlePress
    };
}

export { useHomeViewModel };