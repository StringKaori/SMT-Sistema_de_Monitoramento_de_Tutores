import { StyleSheet, View } from "react-native";
import { SvgProps } from "react-native-svg";

interface TabBarIconProps {
    focused: boolean;
    SVG: React.FC<SvgProps>;
}

const TabBarIcon = (props: TabBarIconProps) => {
    const {focused, SVG} = props;
    const styles = createStyles(focused);

    return (
        <View style={styles.container}>
            <SVG />
        </View>
    )
}

const createStyles = (focused: boolean) => StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        width: 64,
        height: 32,
        backgroundColor: focused ? '#B3FF98' : 'transparent',
    }
})

export { TabBarIcon };