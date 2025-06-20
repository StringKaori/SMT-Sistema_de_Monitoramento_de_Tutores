import {
  View,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; //MARK: - uso de câmera aqui
import { BooleanSetter, StringOrUndefinedSetter } from "@common/types/SetStateType";

interface Props {
  modalVisible: boolean;
  setModalVisible: BooleanSetter;
  imageBase64: string | undefined;
  setImageBase64: StringOrUndefinedSetter;
}

const ProfileImageModal = (props: Props) => {
  const { modalVisible, setModalVisible, imageBase64, setImageBase64 } = props;

  const processImageResult = (result: ImagePicker.ImagePickerResult) => {
    if (result.canceled || !result.assets || result.assets.length === 0) {
      return;
    }

    const asset = result.assets[0];
    const { uri, base64 } = asset;

    if (!base64 || !uri) {
      alert("Failed to load image");
      return;
    }

    const extension = uri.split(".").pop()?.toLowerCase();
    const validExtensions = ["jpeg", "jpg", "png", "webp"];

    if (!extension || !validExtensions.includes(extension)) {
      alert(
        "Unsupported image format. Please select a JPEG, PNG, or WebP image."
      );
      return;
    }

    const mimeType = `image/${extension === "jpg" ? "jpeg" : extension}`;
    const base64WithMime = `data:${mimeType};base64,${base64}`;

    return base64WithMime;
  };

  const getImagePickerOptions = (): ImagePicker.ImagePickerOptions => ({
    mediaTypes: "images",
    quality: 0.5,
    base64: true,
    allowsEditing: true,
  });

  const openImagePicker = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        alert("Permission required to access gallery");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync(
        getImagePickerOptions()
      );

      const processedImage = processImageResult(result);
      if (processedImage) {
        setImageBase64(processedImage);
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("An error occurred while selecting the image. Please try again.");
    }
  };

  const openCamera = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        alert("Permission required to use camera");
        return;
      }

      const result = await ImagePicker.launchCameraAsync(
        getImagePickerOptions()
      );

      const processedImage = processImageResult(result);
      if (processedImage) {
        setImageBase64(processedImage);
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      alert("An error occurred while taking the photo. Please try again.");
    }
  };

  return (
    <View>
      <Modal visible={modalVisible} transparent={false} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Image source={{ uri: imageBase64 }} style={styles.fullscreenImage} />

          <TouchableOpacity onPress={openImagePicker} style={styles.button}>
            <Text style={styles.text}>Choose from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openCamera} style={styles.button}>
            <Text style={styles.text}>Take a Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.text}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "100%",
    height: "70%",
    resizeMode: "contain",
    borderRadius: 0,
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  text: {
    color: "#000",
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 8,
    zIndex: 10,
  },
  backText: {
    color: "#fff",
    fontSize: 18,
  },
});

export { ProfileImageModal };
