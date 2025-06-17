import { CRUDScreenData, EntityTypes } from "@common/types/CRUDScreenData";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@routes/Stack/RootStack/types/RootStackParamList";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { CRUDItem } from "../../Helpers/CRUDItem";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { getUsersList } from "@common/axios/admin/users/users";
import { APIError } from "@common/axios";
import { UserDataType } from "@common/axios/types/UserDataType";
import { useEffect, useState } from "react";

interface Prop {
  route: RouteProp<RootStackParamList, "CRUDScreen">;
}

const CRUDScreen = ({ route }: Prop) => {
  const { theme, height } = useThemeStore();
  const styles = createStyles(theme.colors, height);
  const routeData: CRUDScreenData = route.params;
  const [apiData, setApiData] = useState<any>();

  const navigation = useNavigation<RootStackNavigationProp>();
  const navigateToForm = (isEditing: boolean) => {
    navigation.navigate("DefaultForm", {
      isEditing: isEditing,
      entityType: routeData.entityType,
    });
  };

  const entityGetMap: Record<
    EntityTypes,
    (onError: (e: APIError) => void, onSuccess: (data: any) => void) => void
  > = {
    [EntityTypes.Classrooms]: () => {},
    [EntityTypes.Courses]: () => {},
    [EntityTypes.Disciplines]: () => {},
    [EntityTypes.Events]: () => {},
    [EntityTypes.Professors]: () => {},
    [EntityTypes.User]: async (onError, onSuccess) => {
      const data = await getUsersList(onError, onSuccess);
    },
  };

  const onError = (e: APIError) => {
    console.error(e.message);
  };

  const onSuccess = (data: any) => {
    setApiData(data);
  };

  useEffect(() => {
    const loadData = async () => {
      await entityGetMap[routeData.entityType](onError, onSuccess);
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{routeData.entityType}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToForm(false)}
      >
        <Text style={styles.buttonText}>Add New</Text>
      </TouchableOpacity>
      {/* TODO: Transformar em flatlist genérica
          assim q tiver o get implementado */}

      <FlatList
        data={apiData}
        renderItem={({ item }) => <CRUDItem title={item.name || item.fullName} />}
      />
    </View>
  );
};

const createStyles = (colors: ThemeColors, height: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.background,
    },
    title: {
      color: colors.primary,
      fontSize: height * 0.032,
      fontWeight: "bold",
    },
    button: {
      backgroundColor: colors.background,
      borderColor: colors.primary,
      borderWidth: 2,
      borderRadius: 10,
      paddingHorizontal: 40,
      paddingVertical: 10,
      marginTop: 15,
    },
    buttonText: {
      color: colors.primary,
      fontWeight: "600",
      fontSize: height * 0.022,
    },
  });

export { CRUDScreen };
