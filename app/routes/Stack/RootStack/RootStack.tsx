import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/RootStackParamList";
import { BottomTab } from "@routes/Tab/BottomTab/BottomTab";
import { ProfessorScreen } from "@modules/ProfessorScreen/ProfessorScreen";

const RootStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#45B71B",
        },
        headerTintColor: "#ddffd9"
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
