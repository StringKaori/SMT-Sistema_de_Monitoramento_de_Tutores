import { FlatList, View } from "react-native";
import { TitleView } from "../TitleView/TitleView";
import { GenericTwoLineCard } from "../Cards/GenericTwoLineCard/GenericTwoLineCard";
import { Events } from "@common/types/Events";

interface Props {
  title: string;
  events: Events[];
  isProfessor?: boolean;
}

const GenericScroller = (props: Props) => {
  const { title, events, isProfessor } = props;

  return (
    <View style={{ paddingVertical: 10, alignItems: "center" }}>
      <TitleView title={title} />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={events}
        renderItem={({ item }) => (
          <GenericTwoLineCard
            isProfessor={isProfessor ?? false}
            event={item} />
        )}
      />
    </View>
  );
};

export { GenericScroller };
