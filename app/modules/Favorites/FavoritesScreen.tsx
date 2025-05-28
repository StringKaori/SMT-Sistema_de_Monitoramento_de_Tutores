import { ProfessorCard } from "@common/components";
import { View, StyleSheet, FlatList } from "react-native";
import mock from './mock/mock.json';
import { ProfessorData } from "@common/types/ProfessorCardData";

const FavoritesScreen = () => {
  const mockFavoriteProfessors: ProfessorData[] = mock 
  return (
    <View style={styles.container}>
      <FlatList
        data={mockFavoriteProfessors}
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
        alignItems: 'center'
    }
})

export { FavoritesScreen };