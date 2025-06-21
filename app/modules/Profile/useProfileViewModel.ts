import { useUserStore } from "global/UserData/useUserStore";
import { ProfileViewModel } from "./types/ProfileViewModel";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { removeToken, removeUserID } from "global/SecureStore";
import { CRUDScreenData } from "@common/types/CRUDScreenData";
import { useEffect, useState } from "react";

const useProfileViewModel = (): ProfileViewModel => {
  const { user } = useUserStore();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [imageBase64, setImageBase64] = useState<string>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const authorities = user?.authoritiesList;
  const isAdmin = authorities?.includes("ROLE_ADMIN_USER");

  useEffect(()=>{
    setImageBase64(user?.profilePhoto);
  }, [user])

  const logOut = async () => {
    try {
      await removeToken();
      await removeUserID();
      navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
    } catch (error) {
      console.error(error);
    }
  };

  const navigateTo = (params: CRUDScreenData) => {
    navigation.navigate("CRUDScreen", params);
  };

  return {
    user,
    isModalVisible,
    setIsModalVisible,
    imageBase64,
    setImageBase64,
    isAdmin,

    logOut,
    navigateTo,
  };
};

export { useProfileViewModel };
