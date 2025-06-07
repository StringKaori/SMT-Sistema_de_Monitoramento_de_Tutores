import { useEffect, useState } from "react";
import { DaysEnum } from "@common/types/DaysEnum";
import { ProfessorCardData } from "@common/types/ProfessorCardData";
import mock from "./mock/mock.json";
import { HomeViewModel } from "./types/HomeViewModel";

const useHomeViewModel = (): HomeViewModel => {
    
    const mockProfessors: ProfessorCardData = mock;
    const [selectedDay, setSelectedDay] = useState<DaysEnum>();
    const [today, setToday] = useState<DaysEnum>();

    useEffect(() => {
        const todayDate = new Date();
        const todayString = todayDate.toLocaleDateString("en-US", {
            weekday: "long",
        });
        setToday(todayString as DaysEnum);
        setSelectedDay(today as DaysEnum);
    }, []);

    const handlePress = (item: DaysEnum) => {
        setSelectedDay(item);
    };
    
    return {
        mockProfessors,
        selectedDay, 
        today,

        handlePress
    };
}

export { useHomeViewModel };