import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { LoginViewModel } from "./types/LoginViewModel";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { loginUser, LoginDataType, APIError } from "@common/axios";
import { saveToken, saveUserID } from "global/SecureStore";
import { useUserStore } from "global/UserData/useUserStore";
import { User } from "@common/types/User";

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
    console.log(e.message);
  };

  const onSuccess = (data: LoginDataType) => {
    saveToken(data.data.token);
    saveUserID(data.data.id);

    setUser(data.data as User)

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
