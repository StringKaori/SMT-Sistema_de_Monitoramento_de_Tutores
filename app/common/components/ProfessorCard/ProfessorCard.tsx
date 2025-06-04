import { ProfessorData } from "@common/types/ProfessorCardData";
import { useNavigation,  } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@routes/Stack/RootStack/types/RootStackParamList";
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from "react-native";

interface ProfessorCardProps {
  data: ProfessorData
}

type MyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfessorCard = (props: ProfessorCardProps) => {
  const data = props.data
  const { name, room, initialDate, endDate } = data;
  const { width, height } = useWindowDimensions();

  const styles = createStyles(width, height);
  const navigation = useNavigation<MyScreenNavigationProp>();

  return (
    <TouchableOpacity 
     style={styles.container}
     onPress={() => navigation.navigate("ProfessorScreen", data)}>

      <Text style={styles.text}>
        {name}
      </Text>

      <View style={styles.verticalView}>
        <Text style={styles.text}>
          {room} {initialDate} - {endDate}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (width: number, height: number) => StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: 'center',
    
    borderWidth: 2,
    borderColor: '#B3FF98',
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
    color: '#49454F',
    fontWeight: 'bold'
  }
});

export { ProfessorCard };
