import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/RootStackParamList";
import { useThemeStore } from "app/theme/useThemeStore";

import { BottomTab } from "@routes/Tab/BottomTab/BottomTab";
import { ProfessorScreen } from "@modules/Professor/ProfessorScreen";
import { LoginScreen } from "@modules/Login/LoginScreen";
import { RoomsMoreInfo } from "@modules/Rooms/RoomsMoreInfo";

interface Props {
  firstScreen: keyof RootStackParamList
}

const RootStack = (props: Props) => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { theme } = useThemeStore();

  return (
    <Stack.Navigator
      initialRouteName={props.firstScreen}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.highlightedText
      }}
    >
      <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
      <Stack.Screen name={"BottomTab"} component={BottomTab} />
      <Stack.Screen
        name={"ProfessorScreen"}
        component={ProfessorScreen}
        options={{ headerShown: true, headerTitle: '' }}
      />
      <Stack.Screen
        name={"RoomsMoreInfoScreen"}
        component={RoomsMoreInfo}
        options={{ headerShown: true, headerTitle: '' }}/>
    </Stack.Navigator>
  );
};

export { RootStack };
