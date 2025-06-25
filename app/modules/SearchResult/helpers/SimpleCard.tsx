import { Classrooms } from "@common/types/Classrooms";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  id: string;
  onPress: (id: string) => void
}

const SimpleCard = (props: Props) => {
  const { theme, width, height } = useThemeStore();
  const styles = createStyles(width, height, theme.colors);
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => props.onPress(props.id)}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export { SimpleCard };

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

      padding: 5,
    },
    title: {
      textAlign: 'center'
    }
  });
