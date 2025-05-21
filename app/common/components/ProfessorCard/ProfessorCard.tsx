import { ProfessorCardData } from "@common/types/ProfessorCardData";
import { View, Text, StyleSheet } from "react-native";

interface ProfessorCardProps {
  data: ProfessorCardData
}

const ProfessorCard = (props: ProfessorCardProps) => {
  const { name, room, initialDate, endDate } = props.data;

  return (
    <View style={styles.container}>

      <Text style={styles.text}>
        {name}
      </Text>

      <View style={styles.verticalView}>
        <Text style={styles.text}>
          {room} {initialDate} - {endDate}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: 'center',
    
    borderWidth: 2,
    borderColor: '#B3FF98',
    borderRadius: 10,

    width: 185,
    height: 72,
    
  },

  verticalView: {
    flexDirection: "row",
  },

  text: {
    color: '#49454F',
    fontWeight: 'bold'
  }
});

export { ProfessorCard };
