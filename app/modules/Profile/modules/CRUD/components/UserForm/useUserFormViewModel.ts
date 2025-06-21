import { APIError } from "@common/axios";
import { createUser, updateUser } from "@common/axios/admin/users/users";
import { useState } from "react";
import { UserFormViewModel } from "./types/UserFormViewModel";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { User } from "@common/types/User";

const useUserFormViewModel = (item?: User, isEditing?: boolean): UserFormViewModel => {
  const [fullName, setFullName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [enrollment, setEnrollment] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigation = useNavigation<RootStackNavigationProp>();

  const handlePress = async () => {
    setShowError(false);
    if (!fullName || !email || !enrollment) {
      setShowError(true);
      return;
    }

    if (isEditing && item) {
      await updateUser(item.id, fullName, email.toLowerCase(), enrollment, isAdmin, onError);
      onSuccess()
      return
    }

    await createUser(fullName, email.toLowerCase(), enrollment, isAdmin, onError, onSuccess);
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
      text1: isEditing ? "User updated successfully!" : "User created successfully!",
    });
  };

  return {
    fullName,
    setFullName,

    email,
    setEmail,

    enrollment, 
    setEnrollment,

    isAdmin,
    setIsAdmin,

    showError,
    
    handlePress,
    onError,
    onSuccess,
  };
};

export { useUserFormViewModel };
