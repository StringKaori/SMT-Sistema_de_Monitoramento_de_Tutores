import { DefaultTextInput } from "@common/components";
import { useThemeStore } from "app/theme/useThemeStore";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubmitFormButton } from "./SubmitFormButton";
import { createUser } from "@common/axios/admin/users/users";
import { APIError } from "@common/axios";

const UserForm = () => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors.background);

  const [fullName, setFullName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);

  const handlePress = async () => {
    setShowError(false);
    if (!fullName || !email) {
      setShowError(true);
      return;
    }

    await createUser(fullName, email, onError, onSuccess)
  };

  const onError = (e: APIError) => {
    console.log(e.message);
  };

  const onSuccess = () => {
    console.log("Deu bão, ta no banco");
  }

  return (
    <SafeAreaView style={styles.container}>
      <DefaultTextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder={"Full Name"}
      />

      <DefaultTextInput
        value={email}
        onChangeText={setEmail}
        placeholder={"Email"}
      />
      {showError && (
        <Text style={{ color: `red`, paddingBottom: 10 }}>
          Error, all fields must be filled
        </Text>
      )}

      <SubmitFormButton title={"Create"} handlePress={handlePress} />
    </SafeAreaView>
  );
};

const createStyles = (backgroundColor: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: backgroundColor,
    },
  });

export { UserForm };
