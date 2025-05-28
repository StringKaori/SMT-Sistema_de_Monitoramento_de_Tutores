import { ProfessorCard } from "@common/components";
import { DaysEnum } from "@common/types/DaysEnum";
import { ProfessorCardData } from "@common/types/ProfessorCardData";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useWindowDimensions } from "react-native";
import mock from "./mock/mock.json";

const mockProfessors: ProfessorCardData = mock;

const HomeScreen = () => {
  const { height } = useWindowDimensions();
  const [selectedDay, setSelectedDay] = useState<DaysEnum>();
  const [today, setToday] = useState<DaysEnum>();

  useEffect(() => {
    const getTodayString = () => {
      const todayDate = new Date();
      const todayString = todayDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      setToday(todayString as DaysEnum);
      setSelectedDay(today as DaysEnum);
    };

    getTodayString();
  }, []);

  const handlePress = (item: DaysEnum) => {
    setSelectedDay(item);
  };

  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: `flex-start`, padding: 10 }}>ADS *</Text>

      <View style={{ height: height * 0.05 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={Object.values(DaysEnum)}
          key={"daysVerticalScroll"}
          horizontal={true}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.dayButton,
                {
                  backgroundColor:
                    selectedDay === item ? "#B3FF98" : "transparent",
                },
              ]}
              onPress={() => handlePress(item)}
            >
              {/* TODO: melhorar essa coisa horrível */}
              {item === today && (
                <Text style={{ fontSize: 10, color: "#45B71B" }}>Today</Text>
              )}
              <Text
                style={[
                  {
                    fontSize: height * 0.017,
                    color: selectedDay === item ? "#45B71B" : "#000",
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* TODO: - Fix spacing in between cards */}
      <FlatList
        data={mockProfessors[selectedDay ?? "Monday"]}
        numColumns={2}
        key={"GridView"}
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
  dayButton: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    padding: 10,

    borderWidth: 2,
    borderColor: "#B3FF98",
    borderRadius: 10,
  },
});

export { HomeScreen };
