import { TitleView } from "@common/components";
import { MenuItem } from "../Helpers/MenuItem";
import { FlatList, View } from "react-native";
import { ProfileViewModel } from "../types/ProfileViewModel";
import { EntityTypes } from "@common/types/CRUDScreenData";
interface Props {
  viewModel : ProfileViewModel
}

const AdminModule = (props: Props) => {
  const { viewModel } = props;
  const model = Object.entries(EntityTypes).map(([key, value]) => ({
    title: key,
    entityType: value,
  }));

  return (
    <View>
      <TitleView title={"Admin"} />
      <FlatList
        scrollEnabled={false}
        data={model}
        renderItem={({ item }) => <MenuItem title={item.title} action={() => viewModel.navigateTo({entityType: item.entityType})}/>}
      />
    </View>
  );
};

export { AdminModule };
