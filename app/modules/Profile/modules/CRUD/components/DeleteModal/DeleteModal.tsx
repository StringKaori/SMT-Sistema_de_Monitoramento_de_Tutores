import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: (event: GestureResponderEvent) => void;
  onConfirm: (event: GestureResponderEvent) => void;
};

const DeleteModal = (props: Props) => {
  const { visible, onClose, onConfirm } = props;
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>WARNING</Text>
          <Text style={styles.message}>
            Are you sure you want to delete? This can't be undone.
          </Text>
          <View style={styles.line} />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export { DeleteModal };

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: colors.background,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    padding: 20,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.error,
  },
  message: {
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonRow: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginLeft: 10,
    padding: 10
  },
  cancelText: {
    paddingHorizontal: 20,
    color: colors.secondaryText,
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteText: {
    paddingHorizontal: 20,
    color: colors.error,
    fontSize: 16,
    fontWeight: "bold",
  },
  line: {
    backgroundColor: colors.outline,
    height: "1%",
  }
});
