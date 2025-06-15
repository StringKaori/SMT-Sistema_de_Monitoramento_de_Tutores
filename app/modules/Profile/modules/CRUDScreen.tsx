import { CRUDScreenData, EntityTypes } from "@common/types/CRUDScreenData";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@routes/Stack/RootStack/types/RootStackParamList";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CRUDItem } from "../Helpers/CRUDItem";

interface Prop {
  route: RouteProp<RootStackParamList, "CRUDScreen">;
}

const CRUDScreen = ({ route }: Prop) => {
  const { theme, height } = useThemeStore();
  const styles = createStyles(theme.colors, height);
  const data: CRUDScreenData = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.entityType}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add New</Text>
      </TouchableOpacity>
      {/* TODO: Transformar em flatlist assim q tiver o get implementado */}
      <CRUDItem title={"Rafael Muniz"}/>
    </View>
  );
};

const createStyles = (colors: ThemeColors, height: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.background
    },
    title: {
      color: colors.primary,
      fontSize: height * 0.032,
      fontWeight: 'bold'
    },
    button: {
      backgroundColor: colors.background,
      borderColor: colors.primary,
      borderWidth: 2,
      borderRadius: 10,
      paddingHorizontal: 40,
      paddingVertical: 10,
      marginTop: 15
    },
    buttonText: {
      color: colors.primary,
      fontWeight: '600',
      fontSize: height * 0.022
    },
  });

export { CRUDScreen };
