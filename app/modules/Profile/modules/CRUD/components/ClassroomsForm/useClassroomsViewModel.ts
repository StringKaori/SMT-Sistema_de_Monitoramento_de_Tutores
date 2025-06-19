import { useState } from "react";
import { ClassroomsViewModel } from "./types/ClassroomsViewModel";
import { APIError } from "@common/axios";
import {
  createClassroom,
  updateClassroom,
} from "@common/axios/admin/classrooms/classrooms";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { Classrooms } from "@common/types/Classrooms";

const useClassroomsViewModel = (
  item?: Classrooms,
  isEditing?: boolean
): ClassroomsViewModel => {
  const [description, setDescription] = useState<string>();
  const [block, setBlock] = useState<string>();
  const [floor, setFloor] = useState<string>();
  const [capacity, setCapacity] = useState<string>();
  const [observation, setObservation] = useState<string>();

  const [showError, setShowError] = useState<boolean>(false);

  const navigation = useNavigation<RootStackNavigationProp>();

  const handlePress = async () => {
    setShowError(false);
    if (!description || !block || !floor || !capacity || !observation) {
      setShowError(true);
      return;
    }

    if (isEditing && item) {
      await updateClassroom(
        item.id,
        description,
        block,
        floor,
        capacity,
        observation,
        onError
      );
      onSuccess();
      return;
    }

    await createClassroom(
      description,
      block,
      floor,
      capacity,
      observation,
      onError,
      onSuccess
    );
  };

  const onError = (e: APIError) => {
    console.error(e.message);
    Toast.show({
      type: "error",
      text1: e.message,
    });
  };

  const onSuccess = () => {
    navigation.goBack();
    Toast.show({
      type: "success",
      text1: isEditing
        ? "Classroom updated successfully!"
        : "Classroom created successfully!",
    });
  };

  return {
    description,
    setDescription,

    block,
    setBlock,

    floor,
    setFloor,

    capacity,
    setCapacity,

    observation,
    setObservation,

    showError,

    handlePress,
    onError,
    onSuccess,
  };
};

export { useClassroomsViewModel };
