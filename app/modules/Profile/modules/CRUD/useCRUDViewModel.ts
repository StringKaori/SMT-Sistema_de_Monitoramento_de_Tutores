import { APIError } from "@common/axios";
import { getUsersList } from "@common/axios/admin/users/users";
import { CRUDScreenData, EntityTypes } from "@common/types/CRUDScreenData";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { CRUDViewModel } from "./types/CRUDViewModel";

const useCRUDViewModel = (routeData: CRUDScreenData): CRUDViewModel => {
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
      await getUsersList(onError, onSuccess);
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

  return {
    apiData,
    navigateToForm,
  };
};

export { useCRUDViewModel };
