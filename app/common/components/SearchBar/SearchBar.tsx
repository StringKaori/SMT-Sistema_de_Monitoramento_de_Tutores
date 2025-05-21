import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SearchIcon from "@assets/search_icon.svg";

const SearchBar = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="Search rooms or professors"
          placeholderTextColor="#45B71B"
          style={styles.input}
        />
        <TouchableOpacity style={styles.searchButton}>
            <SearchIcon/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#45B71B",
  },
  input: {
    position: "relative",
    marginTop: 16,
    width: "90%",
    backgroundColor: "#ddffd9",
    borderRadius: 50,
    paddingHorizontal: 16,
  },
  searchButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: 10,
    bottom: 5,
    width: 30,
    height: 30,
  },
});

export { SearchBar };
