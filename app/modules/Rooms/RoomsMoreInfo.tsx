import { GenericScroller } from "@common/components";
import { Classrooms } from "@common/types/Classrooms";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@routes/Stack/RootStack/types/RootStackParamList";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { View, Text, StyleSheet } from "react-native";

interface Prop {
    route: RouteProp<RootStackParamList, "RoomsMoreInfoScreen">;
}

const RoomsMoreInfo = ({ route }: Prop) => {
    const { theme, width, height } = useThemeStore();
    const styles = createStyles(theme.colors, height);
    const room: Classrooms = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.code}>{room.description}</Text>

            <Text style={styles.subtitle}>Capacity</Text>
            <Text style={styles.text}>{room.capacity}</Text>

            <Text style={styles.subtitle}>Notes</Text>
            <Text style={styles.text}>{room.observation}</Text>
            <GenericScroller title={"Wednesday"}/>
        </View>
    );
}

const createStyles = (colors: ThemeColors, height: number) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    code: {
        color: colors.primary,
        fontSize: height * 0.03,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    subtitle: {
        color: colors.primary,
        fontSize: height * 0.02,
        fontWeight: '600',
    },
    text: {
        paddingBottom: 10,
        color: colors.secondaryText,
        fontWeight: '600',
    }
})

export { RoomsMoreInfo }