import { DaysEnum } from "@common/types/DaysEnum";
import { useThemeStore } from "app/theme/useThemeStore";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

type itemType = DaysEnum | undefined | string;

interface Props {
  flatListData: itemType[];
  selectedItem: itemType;
  handlePress: (item: any) => void;
  today?: DaysEnum;
}

const HorizontalScroller = (props: Props) => {
  const { height, width, theme } = useThemeStore();
  const { flatListData, selectedItem, handlePress, today } =
    props;
  const styles = createStyles(height, width, theme.colors.outline);

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
                  today === item ? theme.colors.primary : "transparent",
                borderColor:
                  selectedItem === item
                    ? theme.colors.primary
                    : theme.colors.outline,
              },
            ]}
            onPress={() => handlePress(item)}
          >
            <Text
              style={[
                {
                  fontSize: height * 0.017,
                  color:
                    today === item
                      ? theme.colors.highlightedText
                      : theme.colors.primaryText,
                },
              ]}
            >
              {item}
            </Text>
            {selectedItem === item && (
              <View
                style={[
                  styles.selected,
                  {
                    backgroundColor:
                      today === item
                        ? theme.colors.highlightedText
                        : theme.colors.primary,
                  },
                ]}
              />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const createStyles = (height: number, width: number, borderColor: string) =>
  StyleSheet.create({
    dayButton: {
      width: width * 0.3,
      height: height * 0.06,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 10,
      padding: 10,

      borderWidth: 2 ,
      borderColor: borderColor,
      borderRadius: 16,
    },
    selected: {
      marginTop: 2,
      height: "10%",
      width: "85%",
      borderRadius: 10,
    },
  });

export { HorizontalScroller };
