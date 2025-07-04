import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SearchIcon from "@assets/search_icon.svg";
import { useThemeStore } from "app/theme/useThemeStore";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";

const SearchBar = () => {
  const { width, height, theme } = useThemeStore();
  const iconSize = height * 0.035;
  const [query, setQuery] = useState<string>("");

  const styles = createStyles(width, height, theme.colors, iconSize);
  const navigation = useNavigation<RootStackNavigationProp>();

  const onSubmit = () => {
    navigation.navigate("SearchResultScreen", {query: query});
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search rooms or professors"
          placeholderTextColor={theme.colors.secondaryText}
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={onSubmit}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          accessibilityLabel="Search"
          onPress={onSubmit}
        >
          <SearchIcon width={iconSize} height={iconSize} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (
  width: number,
  height: number,
  colors: ThemeColors,
  iconSize: number
) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primary,
      paddingVertical: height * 0.02,
    },
    searchContainer: {
      width: "90%",
      position: "relative",
      justifyContent: "center",
    },
    input: {
      height: height * 0.055,
      backgroundColor: colors.background,
      borderRadius: 50,
      paddingHorizontal: 20,
      fontSize: 16,
      paddingRight: iconSize + width * 0.06,
      color: 'black'
    },
    iconContainer: {
      position: "absolute",
      right: 12,
      top: "43%",
      transform: [{ translateY: -iconSize / 2 }],
      width: iconSize + width * 0.02,
      height: iconSize + width * 0.02,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export { SearchBar };

  