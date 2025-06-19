import { DefaultTextInput } from "@common/components";
import { useThemeStore } from "app/theme/useThemeStore";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubmitFormButton } from "../SubmitFormButton";
import { useProfessorFormViewModel } from "./useProfessorFormViewModel";
import { useEffect } from "react";
import { Professor } from "@common/types/Professor";

interface Props {
  item?: Professor;
  isEditing?: boolean;
}

const ProfessorForm = (props: Props) => {
  const {item, isEditing} = props;
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors.background);
  const viewModel = useProfessorFormViewModel(item, isEditing);

  useEffect(()=> {
    if(item) {
      viewModel.setEmail(item.email)
      viewModel.setName(item.name)
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <DefaultTextInput
        value={viewModel.name}
        onChangeText={viewModel.setName}
        placeholder={"Name"}
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

export { ProfessorForm };
