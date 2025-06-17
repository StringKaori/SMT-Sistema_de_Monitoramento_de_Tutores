import { DefaultTextInput } from "@common/components";
import { useThemeStore } from "app/theme/useThemeStore";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubmitFormButton } from "../SubmitFormButton";
import { useUserFormViewModel } from "./useUserFormViewModel";

const UserForm = () => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors.background);
  const viewModel = useUserFormViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <DefaultTextInput
        value={viewModel.fullName}
        onChangeText={viewModel.setFullName}
        placeholder={"Full Name"}
      />

      <DefaultTextInput
        value={viewModel.email}
        onChangeText={viewModel.setEmail}
        placeholder={"Email"}
      />
      {viewModel.showError && (
        <Text style={{ color: `red`, paddingBottom: 10 }}>
          Error, all fields must be filled
        </Text>
      )}

      <SubmitFormButton title={"Create"} handlePress={viewModel.handlePress} />
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
