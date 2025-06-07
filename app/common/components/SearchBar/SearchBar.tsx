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

// TODO: melhorar isso aqui como um todo
const SearchBar = () => {
  const { width, height, theme } = useThemeStore();
  const iconSize = height*0.035
  const styles = createStyles(width, height, theme.colors, iconSize)
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="Search rooms or professors"
          placeholderTextColor={theme.colors.secondaryText}
          style={styles.input}
        />
        <TouchableOpacity style={styles.searchButton}>
            <SearchIcon width={iconSize} height={iconSize}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (height: number, width: number, colors: ThemeColors, iconSize: number) => StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  input: {
    position: "relative",
    marginTop: 16,
    height: height * 0.1,
    width: "90%",
    backgroundColor: colors.background,
    borderRadius: 50,
    paddingHorizontal: 16,
  },
  searchButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    bottom: 5,
    width: iconSize + (width * 0.02),
    height: iconSize + (height * 0.02),
  },
});

export { SearchBar };
