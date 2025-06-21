import { APIError } from "@common/axios";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { EventsFormViewModel } from "./types/EventsFormViewModel";
import { getCoursesList } from "@common/axios/admin/courses/courses";
import { DaysEnum } from "@common/types/DaysEnum";
import { getClassroomsList } from "@common/axios/admin/classrooms/classrooms";
import { getProfessorsList } from "@common/axios/admin/professors/professors";
import { getDisciplinesList } from "@common/axios/admin/disciplines/disciplines";
import { createEvent, updateEvent } from "@common/axios/admin/events/events";
import { dateToTimeString } from "@common/helpers/dateConverters";
import { Events } from "@common/types/Events";

const useEventsFormViewModel = (
  item?: Events,
  isEditing?: boolean
): EventsFormViewModel => {
  const [description, setDescription] = useState<string>();

  const [courses, setCourses] = useState<any>();
  const [selectedCourseID, setSelectedCourseID] = useState<string>();

  const [classrooms, setClassrooms] = useState<any>();
  const [selectedClassroomID, setSelectedClassroomID] = useState<string>();

  const [professors, setProfessors] = useState<any>();
  const [selectedProfessorID, setSelectedProfessorID] = useState<string>();

  const [disciplines, setDisciplines] = useState<any>();
  const [selectedDisciplineID, setSelectedDisciplineID] = useState<string>();

  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();

  const [weekdays, setWeekdays] = useState(() =>
    Object.values(DaysEnum).map((day) => ({
      label: day.charAt(0).toUpperCase() + day.slice(1).toLowerCase(), // Capitalize first letter
      value: day,
    }))
  );
  const [selectedWeekday, setSelectedWeekday] = useState<string>();

  const [showError, setShowError] = useState<boolean>(false);
  const [showDateError, setShowDateError] = useState<boolean>(false);
  const navigation = useNavigation<RootStackNavigationProp>();

  const onGetCoursesSuccess = (data: any) => {
    const coursesMap = data.map((item: any) => ({
      label: item.name,
      value: item.id,
    }));
    setCourses(coursesMap);
  };

  const onGetClassroomsSuccess = (data: any) => {
    const classroomMap = data.map((item: any) => ({
      label: item.description,
      value: item.id,
    }));
    setClassrooms(classroomMap);
  };

  const onGetProfessorsSuccess = (data: any) => {
    const professorsMap = data.map((item: any) => ({
      label: item.name,
      value: item.id,
    }));
    setProfessors(professorsMap);
  };

  const onGetDisciplinesSuccess = (data: any) => {
    const DisciplinesMap = data.map((item: any) => ({
      label: item.name,
      value: item.id,
    }));
    setDisciplines(DisciplinesMap);
  };

  const onError = (e: APIError) => {
    console.error(e.message);
    Toast.show({
      type: "error",
      text1: e.message,
    });
  };
  useEffect(() => {
    const getDropdownInfos = async () => {
      await getCoursesList(onError, onGetCoursesSuccess);
      await getClassroomsList(onError, onGetClassroomsSuccess);
      await getProfessorsList(onError, onGetProfessorsSuccess);
      await getDisciplinesList(onError, onGetDisciplinesSuccess);
    };

    getDropdownInfos();
  }, []);

  const handlePress = async () => {
    setShowError(false);
    setShowDateError(false);
    if (
      !description ||
      !selectedWeekday ||
      !startTime ||
      !endTime ||
      !selectedClassroomID ||
      !selectedProfessorID ||
      !selectedDisciplineID ||
      !selectedCourseID
    ) {
      setShowError(true);
      return;
    }
    if (new Date(startTime) >= new Date(endTime)) {
      setShowDateError(true);
      return;
    }

    if (isEditing && item) {
      await updateEvent(
        item.id,
        description,
        selectedWeekday,
        dateToTimeString(startTime),
        dateToTimeString(endTime),
        selectedClassroomID,
        selectedProfessorID,
        selectedCourseID,
        selectedDisciplineID,
        onError
      );
      onSuccess();
      return;
    }

    await createEvent(
      description,
      selectedWeekday,
      dateToTimeString(startTime),
      dateToTimeString(endTime),
      selectedClassroomID,
      selectedProfessorID,
      selectedCourseID,
      selectedDisciplineID,
      onError,
      onSuccess
    );
  };

  const onSuccess = () => {
    navigation.goBack();
    Toast.show({
      type: "success",
      text1: isEditing
        ? "Event updated successfully!"
        : "Event created successfully!",
    });
  };

  return {
    description,
    setDescription,

    weekdays,
    setWeekdays,
    selectedWeekday,
    setSelectedWeekday,

    startTime,
    setStartTime,
    endTime,
    setEndTime,

    courses,
    setCourses,
    selectedCourseID,
    setSelectedCourseID,

    classrooms,
    setClassrooms,
    selectedClassroomID,
    setSelectedClassroomID,

    professors,
    setProfessors,
    selectedProfessorID,
    setSelectedProfessorID,

    disciplines,
    setDisciplines,
    selectedDisciplineID,
    setSelectedDisciplineID,

    showError,
    showDateError,

    handlePress,
    onError,
    onSuccess,
  };
};

export { useEventsFormViewModel };
