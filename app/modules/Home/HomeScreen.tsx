import { HorizontalScroller, ProfessorCard } from "@common/components";
import { DaysEnum } from "@common/types/DaysEnum";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { CourseSelector } from "@common/components/CourseSelector/CourseSelector";
import { useHomeViewModel } from "./useHomeViewModel";
import { useThemeStore } from "app/theme/useThemeStore";

const HomeScreen = () => {
  const viewModel = useHomeViewModel();
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors.background);

  return (
    <View style={styles.container}>
      <CourseSelector/>
      <HorizontalScroller
        flatListData={Object.values(DaysEnum)}
        selectedItem={viewModel.selectedDay}
        handlePress={viewModel.handlePress}
        today={viewModel.today}
      />

      <FlatList
        data={viewModel.mockProfessors[viewModel.selectedDay ?? "Monday"]}
        numColumns={2}
        key={"ProfessorGridView"}
        style={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProfessorCard data={item} navigation={viewModel.navigation} />}
      />
    </View>
  );
};

const createStyles = (background: string) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: background
  },
});

export { HomeScreen };
