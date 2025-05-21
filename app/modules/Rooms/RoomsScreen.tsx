import { View, Text, StyleSheet } from "react-native";

const RoomsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Rooms</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})

export { RoomsScreen };