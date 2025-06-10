import { GenericScroller } from "@common/components";
import { ProfessorData } from "@common/types/ProfessorCardData";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@routes/Stack/RootStack/types/RootStackParamList";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { View, Text, StyleSheet } from "react-native";

interface Prop {
    route: RouteProp<RootStackParamList, "ProfessorScreen">;
}

const ProfessorScreen = ({ route }: Prop) => {
    const { theme, width, height } = useThemeStore();
    const styles = createStyles(theme.colors, height);
    const professor: ProfessorData = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{professor.name}</Text>
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
    name: {
        color: colors.primary,
        fontSize: height * 0.03,
        fontWeight: 'bold',
        paddingBottom: 20
    }
})

export { ProfessorScreen }