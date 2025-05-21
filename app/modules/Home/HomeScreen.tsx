import { ProfessorCard } from "@common/components";
import { DaysEnum } from "@common/types/DaysEnum";
import { ProfessorCardData } from "@common/types/ProfessorCardData";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useWindowDimensions } from "react-native";

const mockProfessors: ProfessorCardData[] = [
  {
    name: "André Leme",
    room: "B202",
    initialDate: "19:00",
    endDate: "22:30",
  },
  {
    name: "Wilson Vendramel",
    room: "A405",
    initialDate: "19:00",
    endDate: "22:30",
  },
  {
    name: "Flávio Amate",
    room: "A505",
    initialDate: "19:00",
    endDate: "22:30",
  },
  {
    name: "Rafael Muniz",
    room: "A407",
    initialDate: "19:00",
    endDate: "22:30",
  },
];

const HomeScreen = () => {
  const { height } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Text>Home</Text>

      <View style={{ height: height * 0.05 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={Object.values(DaysEnum)}
          key={"daysVerticalScroll"}
          horizontal={true}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ padding: 10 }}>
              <Text style={{ fontSize: height * 0.02 }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* TODO: - Fix spacing in between cards */}
      <FlatList
        data={mockProfessors}
        numColumns={2}
        key={"GridView"}
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
