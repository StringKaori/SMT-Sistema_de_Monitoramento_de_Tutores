import { EntityTypes } from "@common/types/CRUDScreenData";
import { DefaultFormData } from "@common/types/DefaultFormData";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@routes/Stack/RootStack/types/RootStackParamList";
import { useThemeStore } from "app/theme/useThemeStore";
import { JSX } from "react";
import { Text, View, StyleSheet } from "react-native";
import { UserForm } from "./UserForm";

interface Prop {
  route: RouteProp<RootStackParamList, "DefaultForm">;
}

const DefaultForm = ({ route }: Prop) => {
  const data: DefaultFormData = route.params;

  const formInputMap: Record<EntityTypes, JSX.Element> = {
    [EntityTypes.Classrooms]: <></>,
    [EntityTypes.Courses]: <></>,
    [EntityTypes.Disciplines]: <></>,
    [EntityTypes.Events]: <></>,
    [EntityTypes.Professors]: <></>,
    [EntityTypes.User]: <UserForm />,
  };

  const getFormInputs = () => {
    return formInputMap[data.entityType] || <></>;
  };

  const { theme, height } = useThemeStore();
  const styles = createStyles(
    theme.colors.background,
    theme.colors.primary,
    height
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New {data.entityType}</Text>
      {getFormInputs()}
    </View>
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
