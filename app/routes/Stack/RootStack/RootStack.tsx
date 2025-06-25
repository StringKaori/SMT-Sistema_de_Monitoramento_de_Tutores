import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/RootStackParamList";
import { useThemeStore } from "app/theme/useThemeStore";

import { BottomTab } from "@routes/Tab/BottomTab/BottomTab";
import { ProfessorScreen } from "@modules/Professor/ProfessorScreen";
import { LoginScreen } from "@modules/Login/LoginScreen";
import { RoomsMoreInfo } from "@modules/Rooms/RoomsMoreInfo";
import { CRUDScreen } from "@modules/Profile/modules/CRUD/CRUDScreen";
import { DefaultForm } from "@modules/Profile/modules/CRUD/components/DefaultForm";
import { ResetPasswordForm } from "@modules/Profile/modules/ResetPasswordForm";
import { SearchResultScreen } from "@modules/SearchResult/SearchResultScreen";

interface Props {
  firstScreen: keyof RootStackParamList;
}

const RootStack = (props: Props) => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { theme } = useThemeStore();

  return (
    <Stack.Navigator
      initialRouteName={props.firstScreen}
      screenOptions={{
        headerShown: true,
        headerTitle: ``,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.highlightedText,
      }}
    >
      <Stack.Screen
        name={"LoginScreen"}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"BottomTab"}
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={"ProfessorScreen"} component={ProfessorScreen} />
      <Stack.Screen name={"RoomsMoreInfoScreen"} component={RoomsMoreInfo} />

      <Stack.Screen name={"CRUDScreen"} component={CRUDScreen} />

      <Stack.Screen name={"DefaultForm"} component={DefaultForm} />
      <Stack.Screen name={"ResetPasswordForm"} component={ResetPasswordForm} />
      <Stack.Screen name={"SearchResultScreen"} component={SearchResultScreen} />
    </Stack.Navigator>
  );
};

export { RootStack };
