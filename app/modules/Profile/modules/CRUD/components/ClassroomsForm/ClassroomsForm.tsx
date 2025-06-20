import { DefaultTextInput } from "@common/components";
import { useThemeStore } from "app/theme/useThemeStore";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubmitFormButton } from "../SubmitFormButton";
import { useEffect } from "react";
import { useClassroomsViewModel } from "./useClassroomsViewModel";
import { Classrooms } from "@common/types/Classrooms";

interface Props {
  item?: Classrooms;
  isEditing?: boolean;
}

const ClassroomForm = (props: Props) => {
  const { item, isEditing } = props;
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors.background);
  const viewModel = useClassroomsViewModel(item, isEditing);

  useEffect(() => {
    if (item) {
      viewModel.setDescription(item.description);
      viewModel.setBlock(item.block);
      viewModel.setFloor(item.floor);
      viewModel.setCapacity(`${item.capacity}`);
      viewModel.setObservation(item.observation);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <DefaultTextInput
        value={viewModel.description}
        onChangeText={viewModel.setDescription}
        placeholder={"Name"}
      />

      <DefaultTextInput
        value={viewModel.block}
        onChangeText={viewModel.setBlock}
        placeholder={"Block"}
      />

      <DefaultTextInput
        value={viewModel.floor}
        keyboardType={"numeric"}
        onChangeText={viewModel.setFloor}
        placeholder={"Floor"}
      />

      <DefaultTextInput
        value={viewModel.capacity}
        keyboardType={"numeric"}
        onChangeText={viewModel.setCapacity}
        placeholder={"Capacity"}
      />

      <DefaultTextInput
        value={viewModel.observation}
        onChangeText={viewModel.setObservation}
        placeholder={"Observation"}
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

export { ClassroomForm };
