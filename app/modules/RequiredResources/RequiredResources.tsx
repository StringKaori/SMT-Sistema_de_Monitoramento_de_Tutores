import { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Notifications from "expo-notifications";
import { TitleView } from "@common/components";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";

const RequiredResources = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);

  const startWatchingLocation = useCallback(async () => {
    setErrorMsg(null);
    setLocation(null);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    subscriptionRef.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000, // 1 second updates
        distanceInterval: 0,
      },
      (loc) => {
        setLocation(loc);
      }
    );
  }, []);

  useFocusEffect(
    useCallback(() => {
      startWatchingLocation();

      return () => {
        if (subscriptionRef.current) {
          subscriptionRef.current.remove();
          subscriptionRef.current = null;
        }
      };
    }, [startWatchingLocation])
  );

  const copyToClipboard = async () => {
    if (location) {
      const text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
      await Clipboard.setStringAsync(text);
      Alert.alert("Copied!", text);
    }
  };

  const sendPush = async (
    title: string = "Push Notification",
    body: string = "This is a push notification"
  ) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: null,
    });
  };

  return (
    <View style={styles.container}>
      <TitleView title={"Current Location"} />
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : location ? (
        <>
          <Text>Latitude: {location.coords.latitude.toFixed(6)}</Text>
          <Text>Longitude: {location.coords.longitude.toFixed(6)}</Text>
          <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
            <Text>Copy Location</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Getting location...</Text>
      )}

      <TitleView title={"Send notification"} />
      <TouchableOpacity style={styles.button} onPress={() => sendPush()}>
        <Text>Send Default Push</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 10,
      alignItems: "center",
    },
    error: {
      color: "red",
      marginTop: 10,
    },
    button: {
      borderColor: colors.outline,
      borderWidth: 2,
      borderRadius: 10,
      paddingVertical: 2,
      paddingHorizontal: 15,
      margin: 10
    },
  });

export { RequiredResources };
