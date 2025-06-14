import { TitleView } from "@common/components";
import { MenuItem } from "./MenuItem";
import { FlatList, View } from "react-native";
import { ProfileViewModel } from "../types/ProfileViewModel";
import { EntityTypes } from "@common/types/CRUDScreenData";
interface Props {
  viewModel : ProfileViewModel
}

const AdminModule = (props: Props) => {
  const { viewModel } = props;
  const model = Object.values(EntityTypes)

  return (
    <View>
      <TitleView title={"Admin"} />

      {/* Just so it do the ScrollView for me */}
      <FlatList
        data={model}
        renderItem={({ item }) => <MenuItem title={item} action={() => viewModel.navigateTo({entityType: item})}/>}
      />
    </View>
  );
};

export { AdminModule };
