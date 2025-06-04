import { HorizontalScroller, RoomCard } from "@common/components";
import { FloorsEnum } from "@common/types/FloorsEnum";
import { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Mock from './mock/mock.json'
import { RoomCardData } from "@common/types/RoomCardData";

const RoomsScreen = () => {
  const mockRooms: RoomCardData = Mock;
  const [selectedFloor, setSelectedFloor] = useState<FloorsEnum>(FloorsEnum.First);
  const handlePress = (item: FloorsEnum) => {
    setSelectedFloor(item)
  }
  return (
    <View style={styles.container}>
      <HorizontalScroller
        flatListData={Object.values(FloorsEnum)}
        selectedItem={selectedFloor}
        handlePress={handlePress}
      />
      <FlatList
        data={mockRooms[selectedFloor ?? "First"]}
        numColumns={2}
        key={"RoomGridView"}
        style={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <RoomCard data={item} />}
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
