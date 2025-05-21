import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/RootStackParamList";
import { BottomTab } from "@routes/Tab/BottomTab/BottomTab";

const RootStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"BottomTab"} component={BottomTab} />
    </Stack.Navigator>
  );
};

export { RootStack };
