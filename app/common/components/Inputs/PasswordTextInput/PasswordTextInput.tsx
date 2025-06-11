import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DefaultTextInput } from "../DefaultTextInput/DefaultTextInput";
import { CustomTextInputProps } from "../Types/TextInputProps";
import { useState } from "react";
import ShowPasswordSVG from "@assets/focused_home_icon.svg";
import HidePasswordSVG from "@assets/focused_rooms_icon.svg";

const PasswordTextInput = (props: CustomTextInputProps) => {
  const [shouldHidePassword, setShouldHidePassword] = useState<boolean>(true);
  const { value, onChangeText, placeholder, placeholderTextColor } = props;
  return (
    <View style={styles.container}>
      <DefaultTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={shouldHidePassword}
      />
      <TouchableOpacity
        onPress={() => setShouldHidePassword((prev) => !prev)}
        style={styles.button}
      >
        {shouldHidePassword ? <HidePasswordSVG/> : <ShowPasswordSVG />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "relative",
  },
  button: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 15,
  },
});

export { PasswordTextInput };
