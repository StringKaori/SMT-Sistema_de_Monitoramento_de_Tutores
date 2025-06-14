import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { LoginViewModel } from "./types/LoginViewModel";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { loginUser, LoginDataType, APIError } from "@common/axios";
import { getToken, getUserID, removeToken,removeUserID, saveToken, saveUserID } from "global/SecureStore";

const useLoginViewModel = (): LoginViewModel => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  useEffect(() => {
    // TODO: passar essa lógica para o APP.tsx para que
    // não pisque a tela de login
    const handleAlreadyAuth = async () => {
      try {
        const token = await getToken();
        const userID = await getUserID();
        if(token && userID) {
            // TODO: será necessário mais lógica para que isso funcione
            // corretamente, quando for esse caso, será preciso dar um
            // getUser com o ID antes de mostrar a home, caso contrário
            // alguns dados vão ficar faltando e o app pode quebrar
            navigation.reset({ index: 0, routes: [{ name: "BottomTab" }] })
            return; 
        }
      } catch (error) {}
    };
    handleAlreadyAuth();
  }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      return;
    }
    await loginUser(email, password, onError, onSuccess);
    return;
  };

  const onError = (e: APIError) => {
    console.log(e.message);
  };

  const onSuccess = (data: LoginDataType) => {
    saveToken(data.data.token);
    saveUserID(data.data.id);
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
