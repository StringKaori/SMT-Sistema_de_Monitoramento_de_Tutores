import { EntityTypes } from "@common/types/CRUDScreenData";
import { DefaultFormData } from "@common/types/DefaultFormData";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@routes/Stack/RootStack/types/RootStackParamList";
import { useThemeStore } from "app/theme/useThemeStore";
import { JSX } from "react";
import { Text, StyleSheet, KeyboardAvoidingView } from "react-native";
// TODO: melhorar esses imports
import { UserForm } from "./UserForm/UserForm";
import { User } from "@common/types/User";
import { ClassroomForm } from "./ClassroomsForm/ClassroomsForm";
import { Classrooms } from "@common/types/Classrooms";
import { CourseForm } from "./CourseForm/CourseForm";
import { Course } from "@common/types/Course";

interface Prop {
  route: RouteProp<RootStackParamList, "DefaultForm">;
}

const DefaultForm = ({ route }: Prop) => {
  const data: DefaultFormData = route.params;

  const formInputMap: Record<EntityTypes, () => JSX.Element> = {
    [EntityTypes.Classrooms]: () => <ClassroomForm isEditing={data.isEditing} item={data.item as Classrooms}/>,
    [EntityTypes.Courses]: () => <CourseForm isEditing={data.isEditing} item={data.item as Course} />,
    [EntityTypes.Disciplines]: () => <></>,
    [EntityTypes.Events]: () => <></>,
    [EntityTypes.Professors]: () => <></>,
    [EntityTypes.User]: () => <UserForm isEditing={data.isEditing} item={data.item as User}/>,
  };

  const getFormInputs = () => {
    return formInputMap[data.entityType]() || <></>;
  };

  const { theme, height } = useThemeStore();
  const styles = createStyles(
    theme.colors.background,
    theme.colors.primary,
    height
  );
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>{data.isEditing ? "Edit" : "Add New"} {data.entityType}</Text>
      {getFormInputs()}
    </KeyboardAvoidingView>
  );
};

const createStyles = (
  backgroundColor: string,
  primaryColor: string,
  height: number
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: backgroundColor,
    },
    title: {
      color: primaryColor,
      fontSize: height * 0.032,
      fontWeight: "bold",
    },
  });

export { DefaultForm };
