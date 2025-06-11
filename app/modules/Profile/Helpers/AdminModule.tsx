import { TitleView } from "@common/components";
import { MenuItem } from "./MenuItem";
import { FlatList, View } from "react-native";

const AdminModule = () => {
  const data = [
    { title: "Professors"},
    { title: "Classrooms"},
    { title: "Events"},
    { title: "Courses"},
    { title: "Users"},
    { title: "Subjects"},
  ];
  return (
    <View>
      <TitleView title={"Admin"} />

      {/* Just so it do the ScrollView for me */}
      <FlatList
        data={data}
        renderItem={({ item }) => <MenuItem title={item.title} />}
      />
    </View>
  );
};

export { AdminModule };
