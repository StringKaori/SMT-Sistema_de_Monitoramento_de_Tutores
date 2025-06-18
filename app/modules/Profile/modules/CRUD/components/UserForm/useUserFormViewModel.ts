import { APIError } from "@common/axios";
import { createUser } from "@common/axios/admin/users/users";
import { useState } from "react";
import { UserFormViewModel } from "./types/UserFormViewModel";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";

const useUserFormViewModel = (): UserFormViewModel => {
  const [fullName, setFullName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);
  const navigation = useNavigation<RootStackNavigationProp>();

  const handlePress = async () => {
    setShowError(false);
    if (!fullName || !email) {
      setShowError(true);
      return;
    }

    await createUser(fullName, email, onError, onSuccess);
  };

  const onError = (e: APIError) => {
    console.error(e.message);
    Toast.show({
      type: "error",
      text1: e.message,
    });
  };

  const onSuccess = () => {
    navigation.goBack();
    Toast.show({
      type: "success",
      text1: "User create successfully!",
    });
  };

  return {
    fullName,
    setFullName,

    email,
    setEmail,

    showError,
    handlePress,
    onError,
    onSuccess,
  };
};

export { useUserFormViewModel };
