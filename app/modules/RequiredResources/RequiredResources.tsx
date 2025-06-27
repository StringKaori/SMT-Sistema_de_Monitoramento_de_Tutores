import { SetStateAction, useCallback, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { DefaultTextInput, TitleView } from "@common/components";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";

import * as Location from "expo-location";
import * as Clipboard from "expo-clipboard";
import * as Notifications from "expo-notifications";

const RequiredResources = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();
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
        timeInterval: 0,
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
    title?: string,
    body?: string
  ) => {
    if(!title){title = "Push Notification"}
    if(!body){body = "This is a push notification"}
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
      <TitleView title={"Send notification"} />
      <View style={{paddingTop: 10}}/>
      <DefaultTextInput value={title} onChangeText={setTitle} placeholder={"Push title"}/>
      <DefaultTextInput value={body} onChangeText={setBody} placeholder={"Push body"}/>
      <TouchableOpacity style={styles.button} onPress={() => sendPush(title, body)}>
        <Text>Send Push</Text>
      </TouchableOpacity>

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
