import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { View, Text, StyleSheet } from "react-native";

interface Props {
    title: string
}

const TitleView = (props: Props) => {
    const { title } = props
    const { theme, height, width } = useThemeStore();
    const styles = createStyles(theme.colors, height, width);
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
}

const createStyles = (colors: ThemeColors, height: number, width: number) => StyleSheet.create({
    container: {
        width: width * 0.95,
        height: height * 0.05,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary
    },
    text: {
        color: colors.highlightedText,
        fontSize: height * 0.028,
        fontWeight: '600'
    }
})

export { TitleView };