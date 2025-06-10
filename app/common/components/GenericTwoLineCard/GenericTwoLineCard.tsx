import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { StyleSheet, View, Text } from "react-native";

interface Props {
    title: string,
    subtitle: string,
}

const GenericTwoLineCard = (props: Props) => {
    const { theme, width, height } = useThemeStore();
    const styles = createStyles(theme.colors, width, height)
    const {title, subtitle} = props;
    return(
        <View style={styles.container}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
    );
}

const createStyles = (colors: ThemeColors, width: number, height: number) => StyleSheet.create({
    container: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.3,
        height: height * 0.07,
        borderColor: colors.outline,
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 10
    },
    cardTitle: {
        color: colors.primaryText,
        fontWeight: 'bold',
        fontSize: height * 0.018
    },
    cardSubtitle: {
        color: colors.secondaryText,
        fontWeight: '600',
        fontSize: height * 0.016
    }
})

export { GenericTwoLineCard };