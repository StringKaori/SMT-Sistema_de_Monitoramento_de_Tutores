import { useState } from "react";
import { CourseViewModel } from "./types/CourseViewModel";
import { APIError } from "@common/axios";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { createCourse, updateCourse } from "@common/axios/admin/courses/courses";

const useCourseViewModel = (
  item?: any,
  isEditing?: boolean
): CourseViewModel => {
  const [name, setName] = useState<string>();
  const [abbreviation, setAbbreviation] = useState<string>();

  const [showError, setShowError] = useState<boolean>(false);

  const navigation = useNavigation<RootStackNavigationProp>();

  const handlePress = async () => {
    setShowError(false);
    if (!name || !abbreviation) {
      setShowError(true);
      return;
    }

    if (isEditing && item) {
      await updateCourse(
        item.id,
        name, 
        abbreviation,
        onError
      );
      onSuccess();
      return;
    }

    await createCourse(
      name,
      abbreviation,
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
        ? "Course updated successfully!"
        : "Course created successfully!",
    });
  };

  return {
    name,
    setName,

    abbreviation,
    setAbbreviation,

    showError,

    handlePress,
    onError,
    onSuccess,
  };
};

export { useCourseViewModel };
