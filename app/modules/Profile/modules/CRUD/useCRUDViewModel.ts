import { APIError } from "@common/axios";
import { deleteUser, getUsersList } from "@common/axios/admin/users/users";
import { CRUDScreenData, EntityTypes } from "@common/types/CRUDScreenData";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { CRUDViewModel } from "./types/CRUDViewModel";

const useCRUDViewModel = (routeData: CRUDScreenData): CRUDViewModel => {
  const [apiData, setApiData] = useState<any>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>();

  const navigation = useNavigation<RootStackNavigationProp>();
  const navigateToForm = (isEditing: boolean) => {
    navigation.navigate("DefaultForm", {
      isEditing: isEditing,
      entityType: routeData.entityType,
    });
  };

  const entityGetMap: Record<
    EntityTypes,
    {
      get: (
        onError: (e: APIError) => void,
        onSuccess: (data: any) => void
      ) => void;
      delete: (
        id: string,
        onError: (e: APIError) => void
      ) => any;
    }
  > = {
    [EntityTypes.Classrooms]: () => {},
    [EntityTypes.Courses]: () => {},
    [EntityTypes.Disciplines]: () => {},
    [EntityTypes.Events]: () => {},
    [EntityTypes.Professors]: () => {
      get: {
      }
    },
    [EntityTypes.User]: {
      get: async (onError, onSuccess) => {
        await getUsersList(onError, onSuccess);
      },
      delete: async (id, onError) => {
        await deleteUser(id, onError);
      }
    },
  };

  const onError = (e: APIError) => {
    console.error(e.message);
  };

  const onSuccess = (data: any) => {
    setApiData(data);
  };

  const onDeleteItem = async () => {
    setModalVisible(false);
    await entityGetMap[routeData.entityType]["delete"](selectedItem.id, onError);
  }

  useEffect(() => {
    const loadData = async () => {
      await entityGetMap[routeData.entityType]["get"](onError, onSuccess);
    };

    loadData();
  }, []);

  return {
    apiData,
    modalVisible,
    setModalVisible,

    selectedItem,
    setSelectedItem,

    navigateToForm,
    onDeleteItem
  };
};

export { useCRUDViewModel };
