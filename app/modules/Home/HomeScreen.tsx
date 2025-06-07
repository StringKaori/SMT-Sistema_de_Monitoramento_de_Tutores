import { HorizontalScroller, ProfessorCard } from "@common/components";
import { DaysEnum } from "@common/types/DaysEnum";
import { ProfessorCardData } from "@common/types/ProfessorCardData";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import mock from "./mock/mock.json";

const mockProfessors: ProfessorCardData = mock;

const HomeScreen = () => {
  const [selectedDay, setSelectedDay] = useState<DaysEnum>();
  const [today, setToday] = useState<DaysEnum>();

  useEffect(() => {
    const getTodayString = () => {
      const todayDate = new Date();
      const todayString = todayDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      setToday(todayString as DaysEnum);
      setSelectedDay(todayString as DaysEnum);
    };

    getTodayString();
  }, []);

  const handlePress = (item: DaysEnum) => {
    setSelectedDay(item);
  };

  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: `flex-start`, padding: 10 }}>ADS *</Text>
      <HorizontalScroller
        flatListData={Object.values(DaysEnum)}
        selectedItem={selectedDay}
        handlePress={handlePress}
        shouldShowToday
        today={today}
      />

      {/* TODO: - Fix spacing in between cards */}
      <FlatList
        data={mockProfessors[selectedDay ?? "Monday"]}
        numColumns={2}
        key={"ProfessorGridView"}
        style={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProfessorCard data={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export { HomeScreen };
