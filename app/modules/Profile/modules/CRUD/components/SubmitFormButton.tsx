import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  handlePress: () => void
}

const SubmitFormButton = (props: Props) => {
  const { title, handlePress } = props;
  const { theme, height, width } = useThemeStore();
  const styles = createStyles(theme.colors, height, width);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (colors: ThemeColors, height: number, width: number) =>
  StyleSheet.create({
    container: {
      width: width * 0.90,
      height: height * 0.05,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    },
    text: {
      color: colors.highlightedText,
      fontSize: height * 0.025,
      fontWeight: "600",
    },
  });

export { SubmitFormButton };
