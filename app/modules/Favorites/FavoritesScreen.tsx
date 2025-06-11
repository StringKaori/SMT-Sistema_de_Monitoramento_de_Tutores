import { ProfessorCard } from "@common/components";
import { View, StyleSheet, FlatList } from "react-native";
import mock from './mock/mock.json';
import { ProfessorData } from "@common/types/ProfessorCardData";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { useThemeStore } from "app/theme/useThemeStore";

const FavoritesScreen = () => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors.background);
  const mockFavoriteProfessors: ProfessorData[] = mock 
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles.container}>
      <FlatList
        data={mockFavoriteProfessors}
        numColumns={2}
        key={"GridView"}
        style={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProfessorCard data={item} navigation={navigation} />}
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

export { FavoritesScreen };