import { DefaultTextInput } from "@common/components";
import { useThemeStore } from "app/theme/useThemeStore";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubmitFormButton } from "../SubmitFormButton";
import { useEffect } from "react";
import { useCourseViewModel } from "./useCourseViewModel";
import { Course } from "@common/types/Course";

interface Props {
  item?: Course;
  isEditing?: boolean;
}

const CourseForm = (props: Props) => {
  const { item, isEditing } = props;
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors.background);
  const viewModel = useCourseViewModel(item, isEditing);

  useEffect(() => {
    if (item) {
      viewModel.setName(item.name);
      viewModel.setAbbreviation(item.abbreviation);
    }
  }, []);

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

const createStyles = (backgroundColor: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: backgroundColor,
    },
  });

export { CourseForm };
