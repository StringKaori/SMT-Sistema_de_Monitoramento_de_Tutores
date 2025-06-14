import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { LoginViewModel } from "./types/LoginViewModel";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { loginUser, LoginDataType, APIError } from "@common/axios";

const useLoginViewModel = (): LoginViewModel => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSignIn = async () => {
    if (!email || !password) {
      return;
    }
    const data = await loginUser(email, password, onError, onSuccess);
  };

  const onError = (e: APIError) => {
    console.log(e.message);
  };

  const onSuccess = (data: LoginDataType) => {
    console.log(data);
    // navigation.reset({ index: 0, routes: [{ name: "BottomTab" }] })
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSignIn,
  };
};

export { useLoginViewModel };
