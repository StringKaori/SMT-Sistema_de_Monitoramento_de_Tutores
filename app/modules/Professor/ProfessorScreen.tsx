import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@routes/Stack/RootStack/types/RootStackParamList";
import { View, Text, StyleSheet } from "react-native";

interface Prop {
    route: RouteProp<RootStackParamList, "ProfessorScreen">;
}

const ProfessorScreen = ({ route }: Prop) => {
    const professor = route.params
    return (
        <View style={styles.container}>
            <Text>{professor.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    }
})

export { ProfessorScreen }