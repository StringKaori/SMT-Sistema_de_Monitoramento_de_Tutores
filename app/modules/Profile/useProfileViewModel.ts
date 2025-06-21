import { useUserStore } from "global/UserData/useUserStore";
import { ProfileViewModel } from "./types/ProfileViewModel";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { removeToken, removeUserID } from "global/SecureStore";
import { CRUDScreenData } from "@common/types/CRUDScreenData";
import { useEffect, useState } from "react";
import { getAndSetUserPicture } from "@common/axios/profile/profile";
import { APIError } from "@common/axios";
import Toast from "react-native-toast-message";

const useProfileViewModel = (): ProfileViewModel => {
  const { user } = useUserStore();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [imageBase64, setImageBase64] = useState<string>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const authorities = user?.authoritiesList;
  const isAdmin = authorities?.includes("ROLE_ADMIN_USER");

  const { setProfilePicture } = useUserStore();
  const onError = (e: APIError) => {
    Toast.show({
      type: "error",
      text1: e.message,
    });
  };

  const onSuccess = (encodedBase64Image: string) => {
    setProfilePicture(encodedBase64Image);
    setImageBase64(encodedBase64Image);
  };

  useEffect(() => {
    const getUserProfilePicture = async () => {
      await getAndSetUserPicture(onSuccess, onError);
    };

    getUserProfilePicture();
    
  }, []);

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
