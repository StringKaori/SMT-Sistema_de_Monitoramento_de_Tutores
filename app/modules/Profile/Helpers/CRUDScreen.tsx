import { CRUDScreenData } from "@common/types/CRUDScreenData";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@routes/Stack/RootStack/types/RootStackParamList";
import { View, Text } from "react-native";

interface Prop {
  route: RouteProp<RootStackParamList, "CRUDScreen">;
}

const CRUDScreen = ({ route }: Prop) => {
  const data: CRUDScreenData = route.params;
  return (
    <View>
      <Text>{data.entityType}</Text>
    </View>
  );
};

export { CRUDScreen };
