import { HorizontalScroller, RoomCard } from "@common/components";
import { FloorsEnum } from "@common/types/FloorsEnum";
import { View, StyleSheet, FlatList } from "react-native";
import { useRoomViewModel } from "./useRoomViewModel";

const RoomsScreen = () => {
  const viewModel = useRoomViewModel();
  return (
    <View style={styles.container}>
      <HorizontalScroller
        flatListData={Object.values(FloorsEnum)}
        selectedItem={viewModel.selectedFloor}
        handlePress={viewModel.handlePress}
      />
      <FlatList
        data={viewModel.mockRooms[viewModel.selectedFloor ?? "First"]}
        numColumns={2}
        key={"RoomGridView"}
        style={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <RoomCard data={item} navigation={viewModel.navigation} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
});

export { RoomsScreen };
