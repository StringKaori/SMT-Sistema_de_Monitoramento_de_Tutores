import { SafeAreaView } from "react-native-safe-area-context";
import LogoSVG from "@assets/LogoSMT.svg";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@routes/Stack/RootStack/types/RootStackParamList";
import { useState } from "react";

type NavigationType = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);
  const navigation = useNavigation<NavigationType>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <SafeAreaView style={styles.container}>
      <LogoSVG />
      <Text style={styles.title}>Login</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={theme.colors.secondaryText}
        style={styles.input}
      />
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={theme.colors.secondaryText}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.reset({ index: 0, routes: [{ name: "BottomTab" }] })
        }
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      color: colors.primary,
      fontSize: 36,
      fontWeight: "bold",
      paddingVertical: 15,
    },
    input: {
      width: "90%",
      borderColor: colors.outline,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
      padding: 15
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      width: "90%",
      height: 58,
      borderRadius: 10,
    },
    buttonText: {
      color: colors.highlightedText,
      fontSize: 20,
      fontWeight: "bold",
    },
  });

export { LoginScreen };
