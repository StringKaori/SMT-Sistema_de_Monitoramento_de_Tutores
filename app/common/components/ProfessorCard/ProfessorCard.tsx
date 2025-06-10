import { ProfessorData } from "@common/types/ProfessorCardData";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { useNavigation,  } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@routes/Stack/RootStack/types/RootStackParamList";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ProfessorCardProps {
  data: ProfessorData, 
  navigation: RootStackNavigationProp
}

const ProfessorCard = (props: ProfessorCardProps) => {
  const { data, navigation } = props
  const { name, room, initialDate, endDate } = data;
  const { width, height, theme } = useThemeStore();

  const styles = createStyles(width, height, theme.colors);

  return (
    <TouchableOpacity 
     style={styles.container}
     onPress={() => navigation.navigate("ProfessorScreen", data)}>

      <Text style={styles.text}>
        {name}
      </Text>

      <View style={styles.verticalView}>
        <Text style={[styles.secondaryText]}>
          {room} {initialDate} - {endDate}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (width: number, height: number, colors: ThemeColors) => StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: 'center',
    
    borderWidth: 2,
    borderColor: colors.outline,
    borderRadius: 10,

    width: width * 0.45,
    height: height * 0.078,
    margin: 5
    
  },

  verticalView: {
    flexDirection: "row",
  },

  text: {
    fontSize: height * 0.017,
    color: colors.primaryText,
    fontWeight: 'bold'
  },

  secondaryText: {
    fontSize: height * 0.017,
    color: colors.secondaryText,
    fontWeight: '400'
  }
});

export { ProfessorCard };
