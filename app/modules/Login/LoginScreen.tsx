import { SafeAreaView } from "react-native-safe-area-context";
import LogoSVG from "@assets/LogoSMT.svg";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { DefaultTextInput, PasswordTextInput } from "@common/components";
import { useLoginViewModel } from "./useLoginViewModel";

const LoginScreen = () => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);
  const viewModel = useLoginViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <LogoSVG />
      <Text style={styles.title}>Login</Text>

      <DefaultTextInput
        value={viewModel.email}
        onChangeText={viewModel.setEmail}
        placeholder="Email"
        placeholderTextColor={theme.colors.secondaryText}
      />

      <PasswordTextInput
        secureTextEntry
        value={viewModel.password}
        onChangeText={viewModel.setPassword}
        placeholder="Password"
        placeholderTextColor={theme.colors.secondaryText}
      />
      {/* TODO: create an custom error text component to make it responsive */}
      {viewModel.shouldShowError && (
        <Text style={{ color: `red`, paddingBottom: 10 }}>
          Error, all fields must be filled
        </Text>
      )}
      <TouchableOpacity style={styles.button} onPress={viewModel.handleSignIn}>
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
