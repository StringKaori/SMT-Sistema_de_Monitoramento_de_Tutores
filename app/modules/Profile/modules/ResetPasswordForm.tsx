import { PasswordTextInput } from "@common/components";
import { useThemeStore } from "app/theme/useThemeStore";
import { useState } from "react";
import { Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { SubmitFormButton } from "./CRUD/components/SubmitFormButton";
import { updateUserPassword } from "@common/axios/profile/profile";
import Toast from "react-native-toast-message";
import { APIError } from "@common/axios";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";

const ResetPasswordForm = () => {
  const { theme, height } = useThemeStore();
  const styles = createStyles(
    theme.colors.background,
    theme.colors.primary,
    height
  );

  const navigation = useNavigation<RootStackNavigationProp>();

  const [currentPassword, setCurrentPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);
  const [showMatchError, setShowMatchError] = useState<boolean>(false);

  const onError = (e: APIError) => {
    console.error(e.message);
    Toast.show({
      type: "error",
      text1: e.message,
    });
  };

  const onSuccess = (message: string) => {
    Toast.show({
      type: "success",
      text1: message,
    });
    navigation.goBack()
  };

  const handlePress = async () => {
    setShowError(false);
    setShowMatchError(false);

    if (!currentPassword || !newPassword || !repeatNewPassword) {
      setShowError(true);
      return;
    }

    if (newPassword !== repeatNewPassword) {
      setShowMatchError(true);
      return;
    }

    await updateUserPassword(currentPassword, newPassword, onSuccess, onError);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Reset Password</Text>
      <PasswordTextInput
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry={true}
        shouldHidePasswordInitialValue={false}
        placeholder={"Current password"}
      />

      <PasswordTextInput
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true}
        shouldHidePasswordInitialValue={false}
        placeholder={"New password"}
      />

      <PasswordTextInput
        value={repeatNewPassword}
        onChangeText={setRepeatNewPassword}
        secureTextEntry={true}
        shouldHidePasswordInitialValue={false}
        placeholder={"Repeat new password"}
      />
      {showError && (
        <Text style={{ color: `red`, paddingBottom: 10 }}>
          Error, all fields must be filled
        </Text>
      )}
      {showMatchError && (
        <Text style={{ color: `red`, paddingBottom: 10 }}>
          Error, passwords must match
        </Text>
      )}
      <SubmitFormButton title={"Reset password"} handlePress={handlePress} />
    </KeyboardAvoidingView>
  );
};

const createStyles = (
  backgroundColor: string,
  primaryColor: string,
  height: number
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      alignItems: `center`,
      backgroundColor: backgroundColor,
    },
    title: {
      color: primaryColor,
      fontSize: height * 0.032,
      fontWeight: "bold",
      paddingBottom: 10,
    },
  });

export { ResetPasswordForm };
