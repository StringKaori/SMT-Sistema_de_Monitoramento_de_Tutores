import { View, Text, StyleSheet } from "react-native";

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Favorites</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})

export { FavoritesScreen };