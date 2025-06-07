import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { StyleSheet, View } from "react-native";
import { SvgProps } from "react-native-svg";

interface TabBarIconProps {
    focused: boolean;
    DefaultSVG: React.FC<SvgProps>;
    FocusedSVG: React.FC<SvgProps>;
}

const TabBarIcon = (props: TabBarIconProps) => {
    const {focused, DefaultSVG, FocusedSVG} = props;
    const { theme } = useThemeStore()
    const styles = createStyles(focused, theme.colors);

    return (
        <View style={styles.container}>
            {focused ? <FocusedSVG /> : <DefaultSVG />}
        </View>
    )
}

const createStyles = (focused: boolean, colors: ThemeColors) => StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        width: 64,
        height: 32,
        backgroundColor: focused ? colors.secondary : 'transparent',
    }
})

export { TabBarIcon };