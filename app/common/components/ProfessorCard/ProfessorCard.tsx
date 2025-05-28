import { ProfessorData } from "@common/types/ProfessorCardData";
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from "react-native";

interface ProfessorCardProps {
  data: ProfessorData
}

const ProfessorCard = (props: ProfessorCardProps) => {
  const { name, room, initialDate, endDate } = props.data;
  const { width, height } = useWindowDimensions();

  const styles = createStyles(width, height);

  return (
    <TouchableOpacity style={styles.container}>

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
