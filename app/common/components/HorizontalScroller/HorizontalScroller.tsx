import { DaysEnum } from "@common/types/DaysEnum";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  useWindowDimensions,
  StyleSheet,
} from "react-native";

type itemType = DaysEnum | undefined | string

interface Props {
  flatListData: itemType[];
  selectedItem: itemType;
  handlePress: (item: any) => void;
  shouldShowToday?: boolean;
  today?: DaysEnum;
}

const HorizontalScroller = (props: Props) => {
  const { height, width } = useWindowDimensions();
  const { flatListData, selectedItem, handlePress, shouldShowToday, today } = props;
  const styles = createStyles(height, width)

  return (
    <View style={{ height: height * 0.06 }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={flatListData}
        key={"daysVerticalScroll"}
        style={{ marginRight: 10 }}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dayButton,
              {
                backgroundColor:
                selectedItem === item ? "#B3FF98" : "transparent",
              },
            ]}
            onPress={() => handlePress(item)}
          >
            {/* TODO: melhorar essa coisa horrível */}
            {shouldShowToday && item === today && (
              <Text style={{ fontSize: 10, color: "#45B71B" }}>Today</Text>
            )}
            <Text
              style={[
                {
                  fontSize: height * 0.017,
                  color: selectedItem === item ? "#45B71B" : "#000",
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const createStyles = (height: number, width: number) => StyleSheet.create({
  dayButton: {
    width: width * 0.3,
    height: height * 0.06,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    padding: 10,

    borderWidth: 2,
    borderColor: "#B3FF98",
    borderRadius: 10,
  },
});

export { HorizontalScroller };
