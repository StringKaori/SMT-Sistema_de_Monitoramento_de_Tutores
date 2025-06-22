import { FlatList, View } from "react-native";
import { TitleView } from "../TitleView/TitleView";
import { GenericTwoLineCard } from "../Cards/GenericTwoLineCard/GenericTwoLineCard";
import { Events } from "@common/types/Events";

interface Props {
  title: string;
  events: Events[];
}

const GenericScroller = (props: Props) => {
  const { title, events } = props;
  
  return (
    <View style={{paddingVertical: 10, alignItems: 'center'}}>
      <TitleView title={title} />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={events}
        renderItem={({ item }) => (
          <GenericTwoLineCard title={item.description} subtitle={`${item.startTime.slice(0, 5)} - ${item.endTime.slice(0, 5)}`} />
        )}
      />
    </View>
  );
};

export { GenericScroller };
