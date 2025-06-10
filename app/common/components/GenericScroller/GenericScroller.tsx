import { FlatList, View } from "react-native";
import { TitleView } from "../TitleView/TitleView";
import { GenericTwoLineCard } from "../GenericTwoLineCard/GenericTwoLineCard";

interface Props {
  title: string;
}

const GenericScroller = (props: Props) => {
  const { title } = props;
  const mock = [
    { title: "A505", subtitle: "19:50 - 20:40" },
    { title: "A505", subtitle: "19:50 - 20:40" },
    { title: "A505", subtitle: "19:50 - 20:40" },
    { title: "A505", subtitle: "19:50 - 20:40" },
    { title: "A505", subtitle: "19:50 - 20:40" },
    { title: "A505", subtitle: "19:50 - 20:40" },
    { title: "A505", subtitle: "19:50 - 20:40" },
    { title: "A505", subtitle: "19:50 - 20:40" },
    { title: "A505", subtitle: "19:50 - 20:40" },
  ];
  return (
    <View>
      <TitleView title={title} />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={mock}
        renderItem={({ item }) => (
          <GenericTwoLineCard title={item.title} subtitle={item.subtitle} />
        )}
      />
    </View>
  );
};

export { GenericScroller };
