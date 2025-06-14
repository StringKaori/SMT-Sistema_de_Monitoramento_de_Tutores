import { TouchableOpacity, Text, StyleSheet } from "react-native";
import SVG from "@assets/right_arrow.svg";
import { useThemeStore } from "app/theme/useThemeStore";

interface Props {
  title: string;
  // TODO: remover o opcional uma vez que tudo estiver funcional
  action?: () => void;
}

const MenuItem = (props: Props) => {
  const { title, action } = props;
  const { theme, height, width } = useThemeStore();
  const styles = createStyles(theme.colors.secondaryText, height, width);
  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      <Text style={styles.text}>{title}</Text>
      <SVG />
    </TouchableOpacity>
  );
};

const createStyles = (textColor: string, height: number, width: number) =>
  StyleSheet.create({
    container: {
      width: width * 0.95,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
    },
    text: {
      color: textColor,
      fontSize: height * 0.022,
    },
  });

export { MenuItem };
