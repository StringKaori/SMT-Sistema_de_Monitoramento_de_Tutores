import { useThemeStore } from "app/theme/useThemeStore";
import { StyleSheet, TextInput } from "react-native";
import { CustomTextInputProps } from "../Types/TextInputProps";

const DefaultTextInput = (props: CustomTextInputProps) => {
  const { value, onChangeText, placeholder, placeholderTextColor, secureTextEntry } = props;
  const { theme, width } = useThemeStore();
  const styles = createStyles(theme.colors.outline, width);
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

const createStyles = (outlineColor: string, width: number) =>
  StyleSheet.create({
    input: {
      width: width * 0.9,
      borderColor: outlineColor,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
      padding: 15,
      paddingRight: 35
    },
  });

export { DefaultTextInput };
