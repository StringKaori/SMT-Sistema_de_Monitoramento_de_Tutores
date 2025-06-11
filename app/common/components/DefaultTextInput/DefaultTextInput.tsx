import { useThemeStore } from "app/theme/useThemeStore";
import { StyleSheet, TextInput } from "react-native";

interface Props {
  value: string | undefined;
  secureTextEntry?: boolean;
  onChangeText: React.Dispatch<React.SetStateAction<string | undefined>>;
  placeholder: string;
  placeholderTextColor: string;
}

const DefaultTextInput = (props: Props) => {
  const { value, onChangeText, placeholder, placeholderTextColor, secureTextEntry } = props;
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors.outline);
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      style={styles.input}
      secureTextEntry={secureTextEntry}
    />
  );
};

const createStyles = (outlineColor: string) =>
  StyleSheet.create({
    input: {
      width: "90%",
      borderColor: outlineColor,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
      padding: 15,
    },
  });

export { DefaultTextInput };
