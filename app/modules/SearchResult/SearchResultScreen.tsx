import { View, StyleSheet, FlatList, Text } from "react-native";
import { useThemeStore } from "app/theme/useThemeStore";
import { useEffect, useState } from "react";
import { getAllEventsFromProfessorById, searchProfessorsAndClassrooms } from "@common/axios/dashboard/dashboard";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@routes/Stack/RootStack/types/RootStackParamList";
import {
  SearchResultType,
  SearchScreenData,
} from "@common/types/SearchScreenData";
import { TitleView } from "@common/components";
import { SimpleCard } from "./helpers/SimpleCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";

interface Prop {
  route: RouteProp<RootStackParamList, "SearchResultScreen">;
}

const SearchResultScreen = ({ route }: Prop) => {
  const { theme } = useThemeStore();
  const insets = useSafeAreaInsets();

  const [searchResult, setSearchResult] = useState<SearchResultType>();

  const styles = createStyles(theme.colors.background);
  const navigation = useNavigation<RootStackNavigationProp>();
  const data: SearchScreenData = route.params;

  useEffect(() => {
    const search = async () => {
      const response = await searchProfessorsAndClassrooms(data.query);
      setSearchResult(response as SearchResultType);
    };

    search();
  }, []);

  const onPressProfessor = async(id: string) => {
    try {
      const response = await getAllEventsFromProfessorById(id);
      navigation.navigate("ProfessorScreen", response)
    } catch (e) {
      console.error(e);
    }
  };

  const onPressClassroom = (id: string) => {
    const selectedClassroom = searchResult?.classrooms.find(
      (classroom) => classroom.id === id
    );
    if (selectedClassroom) {
      navigation.navigate("RoomsMoreInfoScreen", selectedClassroom);
    }
  };

  return (
    <View style={styles.container}>
      {searchResult?.professors && searchResult.professors.length > 0 && (
        <>
          <TitleView title={"Professors"} />
          <FlatList
            data={searchResult.professors}
            numColumns={2}
            key={"ProfessorsSearchResult"}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <SimpleCard
                title={item.name}
                onPress={onPressProfessor}
                id={item.id}
              />
            )}
          />
        </>
      )}

      {searchResult?.classrooms && searchResult.classrooms.length > 0 && (
        <>
          <TitleView title={"Rooms"} />
          <FlatList
            data={searchResult.classrooms}
            style={{ marginBottom: insets.bottom }}
            numColumns={2}
            key={"ClassroomsSearchResult"}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <SimpleCard
                title={item.description}
                onPress={onPressClassroom}
                id={item.id}
              />
            )}
          />
        </>
      )}
    </View>
  );
};

const createStyles = (background: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingTop: 10,
      backgroundColor: background,
    },
  });

export { SearchResultScreen };
