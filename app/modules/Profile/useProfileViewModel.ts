import { useUserStore } from "global/UserData/useUserStore";
import { ProfileViewModel } from "./types/ProfileViewModel";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { removeToken, removeUserID } from "global/SecureStore";
import { CRUDScreenData } from "@common/types/CRUDScreenData";

const useProfileViewModel = (): ProfileViewModel => {
    const { user } = useUserStore();
    const navigation = useNavigation<RootStackNavigationProp>();
    const authorities = user?.authoritiesList
    const isAdmin = authorities?.includes("ROLE_ADMIN_USER");

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
        navigation.navigate("CRUDScreen", params)
    }

    return {
        user,
        isAdmin,

        logOut,
        navigateTo
    };
}

export { useProfileViewModel };