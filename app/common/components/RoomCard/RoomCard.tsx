import { RoomData } from "@common/types/RoomCardData";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface RoomCardProps {
  data: RoomData;
}

const RoomCard = (props: RoomCardProps) => {
  const { code } = props.data;
  const { width, height, theme } = useThemeStore();

  const styles = createStyles(width, height, theme.colors);

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{code}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (width: number, height: number, colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",

      borderWidth: 2,
      borderColor: colors.outline ,
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
