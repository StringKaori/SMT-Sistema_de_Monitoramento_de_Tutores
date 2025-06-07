import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/RootStackParamList";
import { BottomTab } from "@routes/Tab/BottomTab/BottomTab";
import { ProfessorScreen } from "@modules/ProfessorScreen/ProfessorScreen";
import { useThemeStore } from "app/theme/useThemeStore";

const RootStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { theme } = useThemeStore();

  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.highlightedText
      }}
    >
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
