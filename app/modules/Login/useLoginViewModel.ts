import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { LoginViewModel } from "./types/LoginViewModel";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { loginUser, LoginUserDataType, APIError } from "@common/axios";
import { saveToken, saveUserID } from "global/SecureStore";
import { useUserStore } from "global/UserData/useUserStore";
import { LoginUser, User } from "@common/types/User";
import { updateConnectorToken } from "@common/axios/connector";
import { getUserProfile } from "@common/axios/profile/profile";
import Toast from "react-native-toast-message";

const useLoginViewModel = (): LoginViewModel => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { setUser } = useUserStore();
  // MARK: - States
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [shouldShowError, setShouldShowError] = useState<boolean>(false);

  const handleSignIn = async () => {
    setShouldShowError(false);

    if (!email || !password) {
      setShouldShowError(true);
      return;
    }

    await loginUser(email.toLowerCase(), password, onError, onSuccess);
  };

  const onError = (e: APIError) => {
    console.error(e.message);
    Toast.show({
      type: "error",
      text1: e.message,
    });
  };

  const onSuccess = async (data: LoginUserDataType) => {
    saveToken(data.data.token);
    saveUserID(data.data.id);
    updateConnectorToken(data.data.token);

    const user = await getUserProfile(onError);
    if (user) setUser(user);

    navigation.reset({ index: 0, routes: [{ name: "BottomTab" }] });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    shouldShowError,

    handleSignIn,
  };
};

export { useLoginViewModel };
