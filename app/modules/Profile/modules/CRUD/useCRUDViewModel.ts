import { APIError } from "@common/axios";
import { CRUDScreenData } from "@common/types/CRUDScreenData";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { CRUDViewModel } from "./types/CRUDViewModel";
import { entityRESTMap } from "./helpers/entityRESTMap";
import Toast from "react-native-toast-message";

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
    Toast.show({
      type: "error",
      text1: e.message,
    });
  };

  const onSuccess = (data: any) => {
    const filteredData = data.filter(
      (i: { id: any }) => i.id !== "684ddff87e78a2f37d190f12"
    );
    setApiData(filteredData);
  };

  const loadData = useCallback(async () => {
    await entityRESTMap[routeData.entityType]["get"](onError, onSuccess);
  }, [routeData.entityType, onError, onSuccess]);

  const onDeleteItem = async () => {
    setModalVisible(false);
    const message = await entityRESTMap[routeData.entityType]["delete"](
      selectedItem.id,
      onError
    );
    if(message) {
      Toast.show({
        type: "success",
        text1: message,
      });
      loadData();
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

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
