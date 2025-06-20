import { DefaultTextInput } from "@common/components";
import { useThemeStore } from "app/theme/useThemeStore";
import { StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubmitFormButton } from "../SubmitFormButton";
import { useUserFormViewModel } from "./useUserFormViewModel";
import { User } from "@common/types/User";
import { useEffect } from "react";

interface Props {
  item?: User;
  isEditing?: boolean;
}

const UserForm = (props: Props) => {
  const {item, isEditing} = props;
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors.background);
  const viewModel = useUserFormViewModel(item, isEditing);

  useEffect(()=> {
    if(item) {
      viewModel.setEmail(item.email)
      viewModel.setFullName(item.fullName)
      if(item.authoritiesList.includes("ROLE_ADMIN_USER")) { viewModel.setIsAdmin(true) }
    }
  }, [])

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
      <View style={{ flexDirection: "row", alignItems: "center", alignSelf: 'flex-end'}}>
      <Switch value={viewModel.isAdmin} onValueChange={viewModel.setIsAdmin} />
      <Text>Is Admin</Text>
    </View>
      {viewModel.showError && (
        <Text style={{ color: `red`, paddingBottom: 10 }}>
          Error, all fields must be filled
        </Text>
      )}
      {/* TODO: Revisar para não repetir o isEditing ? "Update" : "Create"*/}
      <SubmitFormButton title={isEditing ? "Update" : "Create"} handlePress={viewModel.handlePress} />
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
