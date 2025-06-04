import { RoomData } from "@common/types/RoomCardData";
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from "react-native";

interface RoomCardProps {
  data: RoomData
}

const RoomCard = (props: RoomCardProps) => {
  const { code } = props.data;
  const { width, height } = useWindowDimensions();

  const styles = createStyles(width, height);

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>
        {code}
      </Text>
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
    height: height * 0.06,
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

export { RoomCard };
