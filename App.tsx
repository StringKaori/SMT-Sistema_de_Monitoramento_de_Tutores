import { Platform, useWindowDimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "@routes/Stack/RootStack/RootStack";
import { useThemeStore } from "app/theme/useThemeStore";
import { useEffect, useState } from "react";
import { getToken, getUserID } from "global/SecureStore";
import { RootStackParamList } from "@routes/Stack/RootStack/types/RootStackParamList";
import Toast from "react-native-toast-message";
import { useUserStore } from "global/UserData/useUserStore";
import { updateConnectorToken } from "@common/axios/connector";
import { getUserProfile } from "@common/axios/profile/profile";
import { APIError } from "@common/axios";

import * as Location from "expo-location";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const { width, height } = useWindowDimensions();
  const { setWidth, setHeight } = useThemeStore();
  const { setUser } = useUserStore();

  const [firstScreen, setFirstScreen] =
    useState<keyof RootStackParamList>("LoginScreen");

  const onError = (e: APIError) => {
    console.error(e.message);
    Toast.show({
      type: "error",
      text1: e.message,
    });
  };

  useEffect(() => {
    // set the width and height only once at the
    // theme state, so i don't need to call
    // useWindowDimensions at every module
    setWidth(width), setHeight(height);
  }, []);

  useEffect(() => {
    const handleAlreadyAuth = async () => {
      try {
        const token = await getToken();
        const userID = await getUserID();

        if (token && userID) {
          updateConnectorToken(token);
          const user = await getUserProfile(onError);

          if (user) {
            setUser(user);
            setFirstScreen("BottomTab");
            return;
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };
    handleAlreadyAuth();
  }, []);

  useEffect(() => {
    async function handlePermissions() {
      try {
        await Location.requestForegroundPermissionsAsync();
        await Notifications.requestPermissionsAsync();
      } catch (err) {
        console.warn("Permission error:", err);
      }
    }
    handlePermissions();
  }, []);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("main", {
          name: "main",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    };
    registerForPushNotificationsAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack firstScreen={firstScreen} key={firstScreen} />
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
