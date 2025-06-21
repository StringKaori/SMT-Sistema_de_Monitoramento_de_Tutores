import { APIError } from "@common/axios";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { DisciplinesFormViewModel } from "./types/DisciplinesFormViewModel";
import { getCoursesList } from "@common/axios/admin/courses/courses";
import { createDiscipline, updateDiscipline } from "@common/axios/admin/disciplines/disciplines";
import { Discipline } from "@common/types/Discipline";

const useDisciplinesFormViewModel = (
  item?: Discipline,
  isEditing?: boolean
): DisciplinesFormViewModel => {
  const [name, setName] = useState<string>();
  const [abbreviation, setAbbreviation] = useState<string>();
  const [selectedCourseID, setSelectedCourseID] = useState<string>();
  const [courses, setCourses] = useState<any>();
  const [showError, setShowError] = useState<boolean>(false);
  const navigation = useNavigation<RootStackNavigationProp>();

  const onGetCoursesSuccess = (data: any) => {
    const coursesMap = data.map((item: any) => ({
      label: item.name,
      value: item.id,
    }));
    setCourses(coursesMap);
  };

  const onError = (e: APIError) => {
    console.error(e.message);
    Toast.show({
      type: "error",
      text1: e.message,
    });
  };

  useEffect(() => {
    const getCourses = async () => {
      await getCoursesList(onError, onGetCoursesSuccess);
    };

    getCourses();
  }, []);

  const handlePress = async () => {
    setShowError(false);
    if (!name || !abbreviation || !selectedCourseID) {
      setShowError(true);
      return;
    }

    if (isEditing && item) {
      await updateDiscipline(item.id, name, abbreviation, selectedCourseID, onError);
      onSuccess();
      return;
    }

    await createDiscipline(name, abbreviation, selectedCourseID, onError, onSuccess);
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

    courses,
    setCourses,

    selectedCourseID,
    setSelectedCourseID,

    showError,
    handlePress,
    onError,
    onSuccess,
  };
};

export { useDisciplinesFormViewModel };
