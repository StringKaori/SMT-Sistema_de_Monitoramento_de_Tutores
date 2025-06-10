import { GenericScroller } from "@common/components";
import { RoomData } from "@common/types/RoomCardData";
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
    const room: RoomData = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.code}>{room.code}</Text>

            <Text style={styles.subtitle}>Capacity</Text>
            <Text style={styles.text}>30</Text>

            <Text style={styles.subtitle}>Notes</Text>
            <Text style={styles.text}>Inclui projetor e quadro branco</Text>
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