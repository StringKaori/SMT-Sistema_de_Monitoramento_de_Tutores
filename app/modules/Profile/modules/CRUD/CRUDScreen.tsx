import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@routes/Stack/RootStack/types/RootStackParamList";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { CRUDItem } from "../../Helpers/CRUDItem";
import { useCRUDViewModel } from "./useCRUDViewModel";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import { SafeAreaView } from "react-native-safe-area-context";

interface Prop {
  route: RouteProp<RootStackParamList, "CRUDScreen">;
}

const CRUDScreen = ({ route }: Prop) => {
  const { theme, height } = useThemeStore();
  const styles = createStyles(theme.colors, height);
  const viewModel = useCRUDViewModel(route.params);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{route.params.entityType}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => viewModel.navigateToForm(false)}
      >
        <Text style={styles.buttonText}>Add New</Text>
      </TouchableOpacity>
      {viewModel.apiData && viewModel.apiData.length === 0 ? (
        <Text style={{ paddingTop: 10 }}>
          No {route.params.entityType} registered
        </Text>
      ) : (
        <FlatList
          data={viewModel.apiData}
          renderItem={({ item }) => (
            <CRUDItem
              item={item}
              showModal={viewModel.setModalVisible}
              setSelectedItem={viewModel.setSelectedItem}
              didPressEdit={viewModel.didPressEdit}
            />
          )}
        />
      )}

      <DeleteModal
        visible={viewModel.modalVisible}
        onClose={() => viewModel.setModalVisible(false)}
        onConfirm={viewModel.onDeleteItem}
      />
    </SafeAreaView>
  );
};

const createStyles = (colors: ThemeColors, height: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.background,
    },
    title: {
      color: colors.primary,
      fontSize: height * 0.032,
      fontWeight: "bold",
    },
    button: {
      backgroundColor: colors.background,
      borderColor: colors.primary,
      borderWidth: 2,
      borderRadius: 10,
      paddingHorizontal: 40,
      paddingVertical: 10,
      marginTop: 15,
    },
    buttonText: {
      color: colors.primary,
      fontWeight: "600",
      fontSize: height * 0.022,
    },
  });

export { CRUDScreen };
