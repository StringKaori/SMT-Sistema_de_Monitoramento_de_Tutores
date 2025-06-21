import { DefaultTextInput } from "@common/components";
import { useThemeStore } from "app/theme/useThemeStore";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubmitFormButton } from "../SubmitFormButton";
import { useDisciplinesFormViewModel } from "./useDisciplinesFormViewModel";
import { useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Discipline } from "@common/types/Discipline";

interface Props {
  item?: Discipline;
  isEditing?: boolean;
}

const DisciplinesForm = (props: Props) => {
  const { item, isEditing } = props;
  const { theme, width } = useThemeStore();
  const styles = createStyles(theme.colors.background, width);
  const viewModel = useDisciplinesFormViewModel(item, isEditing);

  useEffect(() => {
    if (item && viewModel.courses) {
      viewModel.setAbbreviation(item.abbreviation);
      viewModel.setName(item.name);
      viewModel.setSelectedCourseID(item.courseId);
    }
  }, [item, viewModel.courses]);

  return (
    <SafeAreaView style={styles.container}>
      <DefaultTextInput
        value={viewModel.name}
        onChangeText={viewModel.setName}
        placeholder={"Name"}
      />

      <DefaultTextInput
        value={viewModel.abbreviation}
        onChangeText={viewModel.setAbbreviation}
        placeholder={"Abbreviation"}
      />

      <Dropdown
        style={styles.dropdown}
        data={viewModel.courses}
        labelField="label"
        valueField="value"
        placeholder="Select course"
        value={viewModel.selectedCourseID}
        onChange={(item) => viewModel.setSelectedCourseID(item.value)}
      />

      {viewModel.showError && (
        <Text style={{ color: `red`, paddingBottom: 10 }}>
          Error, all fields must be filled
        </Text>
      )}
      {/* TODO: Revisar para não repetir o isEditing ? "Update" : "Create"*/}
      <SubmitFormButton
        title={isEditing ? "Update" : "Create"}
        handlePress={viewModel.handlePress}
      />
    </SafeAreaView>
  );
};

const createStyles = (backgroundColor: string, width: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: backgroundColor,
    },
    dropdown: {
      height: 50,
      width: width * 0.9,
      marginBottom: 20,
      backgroundColor: "#fff",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      paddingHorizontal: 10,
    },
  });

export { DisciplinesForm };
