import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/RootStackParamList";
import { useThemeStore } from "app/theme/useThemeStore";

import { BottomTab } from "@routes/Tab/BottomTab/BottomTab";
import { ProfessorScreen } from "@modules/Professor/ProfessorScreen";
import { LoginScreen } from "@modules/Login/LoginScreen";

const RootStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { theme } = useThemeStore();

  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
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
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export { RootStack };
