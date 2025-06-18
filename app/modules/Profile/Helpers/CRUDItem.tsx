import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import EditSVG from "@assets/edit_icon.svg";
import DeleteSVG from "@assets/delete_icon.svg";
import { useThemeStore } from "app/theme/useThemeStore";
import { AnySetter, BooleanSetter } from "@common/types/SetStateType";

interface Props {
  item: any;
  showModal: BooleanSetter;
  setSelectedItem: AnySetter;
}

const CRUDItem = (props: Props) => {
  const { item, showModal, setSelectedItem } = props;
  const { theme, height, width } = useThemeStore();
  const styles = createStyles(theme.colors.secondaryText, height, width);

  const didPressDelete = () => {
    showModal(true)
    setSelectedItem(item)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.name || item.fullName}</Text>
      <View style={styles.iconsView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("edit")}
        >
          <EditSVG/>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={didPressDelete}
        >
          <DeleteSVG />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (textColor: string, height: number, width: number) =>
  StyleSheet.create({
    container: {
      width: width * 0.95,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
    },
    text: {
      color: textColor,
      fontSize: height * 0.022,
      maxWidth: `75%`,
      fontWeight: "bold",
    },
    iconsView: {
      flexDirection: "row",
      width: `25%`,
      justifyContent: `space-between`,
    },
    button: {
        alignItems: `center`,
        justifyContent: `center`,
        height: height * 0.03,
        width: width * 0.1,
    },
  });

export { CRUDItem };
