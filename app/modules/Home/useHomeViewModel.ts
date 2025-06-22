import { useEffect, useState } from "react";
import { DaysEnum } from "@common/types/DaysEnum";
import { HomeViewModel } from "./types/HomeViewModel";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { getProfessorsListByWeekdayAndCourse } from "@common/axios/dashboard/dashboard";
import { ProfessorCardData } from "@common/types/ProfessorCardData";

const useHomeViewModel = (): HomeViewModel => {
  const [selectedDay, setSelectedDay] = useState<DaysEnum>();
  const [today, setToday] = useState<DaysEnum>();
  const [professorsList, setProfessorsList] = useState<ProfessorCardData[]>();
  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    const todayDate = new Date();
    const todayString = todayDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    setToday(todayString as DaysEnum);
    setSelectedDay(todayString as DaysEnum);
  }, []);

  useEffect(() => {
    const getProfessors = async () => {
      const response = await getProfessorsListByWeekdayAndCourse(
        selectedDay ?? DaysEnum.Monday,
        "6855a40b8936407223631482"
      );
      setProfessorsList(response);
    };
    getProfessors();
  }, [selectedDay]);

  const handlePress = (item: DaysEnum) => {
    setSelectedDay(item);
  };

  return {
    selectedDay,
    today,
    navigation,
    professorsList,

    handlePress,
  };
};

export { useHomeViewModel };
