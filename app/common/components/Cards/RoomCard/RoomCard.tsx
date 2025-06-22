import { Classrooms } from "@common/types/Classrooms";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface RoomCardProps {
  data: Classrooms;
  navigation: RootStackNavigationProp;
}

const RoomCard = (props: RoomCardProps) => {
  const { data, navigation } = props;
  const { width, height, theme } = useThemeStore();
  const styles = createStyles(width, height, theme.colors);

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("RoomsMoreInfoScreen", data)}>
      <Text style={styles.text}>{data.description}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (width: number, height: number, colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",

      borderWidth: 2,
      borderColor: colors.outline,
      borderRadius: 10,

      width: width * 0.45,
      height: height * 0.06,
      margin: 5,
    },

    verticalView: {
      flexDirection: "row",
    },

    text: {
      fontSize: height * 0.017,
      color: colors.primaryText,
      fontWeight: "600",
    },
  });

export { RoomCard };
