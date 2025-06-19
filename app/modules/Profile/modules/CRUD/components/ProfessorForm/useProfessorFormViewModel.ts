import { APIError } from "@common/axios";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { ProfessorFormViewModel } from "./types/ProfessorFormViewModel";
import { createProfessor, updateProfessor } from "@common/axios/admin/professors/professors";
import { Professor } from "@common/types/Professor";

const useProfessorFormViewModel = (item?: Professor, isEditing?: boolean): ProfessorFormViewModel => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);
  const navigation = useNavigation<RootStackNavigationProp>();

  const handlePress = async () => {
    setShowError(false);
    if (!name || !email) {
      setShowError(true);
      return;
    }

    if (isEditing && item) {
      await updateProfessor(item.id, name, email.toLowerCase(), onError);
      onSuccess()
      return
    }

    await createProfessor(name, email.toLowerCase(), onError, onSuccess);
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
      text1: isEditing ? "Professor updated successfully!" : "Professor created successfully!",
    });
  };

  return {
    name,
    setName,

    email,
    setEmail,

    showError,
    handlePress,
    onError,
    onSuccess,
  };
};

export { useProfessorFormViewModel };
