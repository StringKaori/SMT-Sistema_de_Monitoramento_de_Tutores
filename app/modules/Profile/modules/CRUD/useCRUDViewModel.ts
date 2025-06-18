import { APIError } from "@common/axios";
import { CRUDScreenData } from "@common/types/CRUDScreenData";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { CRUDViewModel } from "./types/CRUDViewModel";
import { entityRESTMap } from "./helpers/entityRESTMap";

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

  const onError = (e: APIError) => {
    console.error(e.message);
  };

  const onSuccess = (data: any) => {
    setApiData(data);
  };

  const onDeleteItem = async () => {
    setModalVisible(false);
    await entityRESTMap[routeData.entityType]["delete"](
      selectedItem.id,
      onError
    );
  };

  useEffect(() => {
    const loadData = async () => {
      await entityRESTMap[routeData.entityType]["get"](onError, onSuccess);
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
    onDeleteItem,
  };
};

export { useCRUDViewModel };
