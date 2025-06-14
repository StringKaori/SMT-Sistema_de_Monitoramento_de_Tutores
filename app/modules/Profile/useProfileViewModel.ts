import { useUserStore } from "global/UserData/useUserStore";
import { ProfileViewModel } from "./types/ProfileViewModel";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { removeToken, removeUserID } from "global/SecureStore";

const useProfileViewModel = (): ProfileViewModel => {
    const { user } = useUserStore();
    const navigation = useNavigation<RootStackNavigationProp>();
    const isAdmin = user?.authorities.includes("ROLE_ADMIN_USER");

    const logOut = async () => {
      try {
        await removeToken();
        await removeUserID();
        navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
      } catch (error) {
        console.error(error);
      }
    };

    return {
        user,
        isAdmin,
        
        logOut
    };
}

export { useProfileViewModel };