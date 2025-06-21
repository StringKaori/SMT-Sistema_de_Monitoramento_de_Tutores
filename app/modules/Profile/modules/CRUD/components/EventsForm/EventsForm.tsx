import { DefaultTextInput } from "@common/components";
import { useThemeStore } from "app/theme/useThemeStore";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubmitFormButton } from "../SubmitFormButton";
import { useEventsFormViewModel } from "./useEventsFormViewModel";
import { useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TimePickerTextInput } from "@common/components/Inputs/TimePickerTextInput/TimePickerTextInput";
import { timeStringShortToDate } from "@common/helpers/dateConverters";

interface Props {
  item?: any;
  isEditing?: boolean;
}

const EventsForm = (props: Props) => {
  const { item, isEditing } = props;
  const { theme, width } = useThemeStore();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme.colors.background, width, insets.bottom);
  const viewModel = useEventsFormViewModel(item, isEditing);

  useEffect(() => {
    if (
      item &&
      viewModel.classrooms &&
      viewModel.professors &&
      viewModel.courses &&
      viewModel.disciplines
    ) {
      viewModel.setDescription(item.description);
      viewModel.setSelectedWeekday(item.weekday);
      viewModel.setStartTime(timeStringShortToDate(item.startTime));
      viewModel.setEndTime(timeStringShortToDate(item.endTime));
      viewModel.setSelectedClassroomID(item.classroomId);
      viewModel.setSelectedProfessorID(item.professorId);
      viewModel.setSelectedCourseID(item.courseId);
      viewModel.setSelectedDisciplineID(item.disciplineId);
    }
  }, [
    item,
    viewModel.classrooms,
    viewModel.professors,
    viewModel.courses,
    viewModel.disciplines,
  ]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <DefaultTextInput
          value={viewModel.description}
          onChangeText={viewModel.setDescription}
          placeholder={"Description"}
        />

        <Dropdown
          style={styles.dropdown}
          data={viewModel.weekdays}
          labelField="label"
          valueField="value"
          placeholder="Select the weekday"
          value={viewModel.selectedWeekday}
          onChange={(item) => viewModel.setSelectedWeekday(item.value)}
        />

        <TimePickerTextInput
          value={viewModel.startTime}
          onChange={viewModel.setStartTime}
          placeholder={"Select the start time"}
        />

        <TimePickerTextInput
          value={viewModel.endTime}
          onChange={viewModel.setEndTime}
          placeholder={"Select the end time"}
        />

        <Dropdown
          style={styles.dropdown}
          data={viewModel.classrooms}
          labelField="label"
          valueField="value"
          placeholder="Select classroom"
          value={viewModel.selectedClassroomID}
          onChange={(item) => viewModel.setSelectedClassroomID(item.value)}
        />

        <Dropdown
          style={styles.dropdown}
          data={viewModel.professors}
          labelField="label"
          valueField="value"
          placeholder="Select professor"
          value={viewModel.selectedProfessorID}
          onChange={(item) => viewModel.setSelectedProfessorID(item.value)}
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

        <Dropdown
          style={styles.dropdown}
          data={viewModel.disciplines}
          labelField="label"
          valueField="value"
          placeholder="Select discipline"
          value={viewModel.selectedDisciplineID}
          onChange={(item) => viewModel.setSelectedDisciplineID(item.value)}
        />

        {viewModel.showError && (
          <Text style={{ color: `red`, paddingBottom: 10 }}>
            Error, all fields must be filled
          </Text>
        )}

        {viewModel.showDateError && (
          <Text style={{ color: `red`, paddingBottom: 10 }}>
            Error, start time cannot be greater than end time
          </Text>
        )}
        {/* TODO: Revisar para não repetir o isEditing ? "Update" : "Create"*/}
        <SubmitFormButton
          title={isEditing ? "Update" : "Create"}
          handlePress={viewModel.handlePress}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const createStyles = (
  backgroundColor: string,
  width: number,
  bottomInsets: number
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: backgroundColor,
      marginBottom: bottomInsets,
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

export { EventsForm };