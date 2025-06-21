import { HorizontalScroller, RoomCard } from "@common/components";
import { FloorsEnum } from "@common/types/FloorsEnum";
import { View, StyleSheet, FlatList } from "react-native";
import { useRoomViewModel } from "./useRoomViewModel";
import { useThemeStore } from "app/theme/useThemeStore";

const RoomsScreen = () => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors.background);
  const viewModel = useRoomViewModel();
  return (
    <View style={styles.container}>
      <HorizontalScroller
        flatListData={Object.values(FloorsEnum)}
        selectedItem={viewModel.selectedFloor}
        handlePress={viewModel.handlePress}
      />
      <FlatList
        data={viewModel.rooms}
        numColumns={2}
        key={"RoomGridView"}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <RoomCard data={item} navigation={viewModel.navigation} />}
      />
    </View>
  );
};

const createStyles = (background: string) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: background
  },
});

export { RoomsScreen };
