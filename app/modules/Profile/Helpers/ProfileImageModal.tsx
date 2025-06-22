import {
  View,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; //MARK: - uso de câmera aqui
import {
  BooleanSetter,
  StringOrUndefinedSetter,
} from "@common/types/SetStateType";
import { useState } from "react";
import { APIError } from "@common/axios";
import Toast from "react-native-toast-message";
import { updateUserPicture } from "@common/axios/profile/profile";

interface Props {
  modalVisible: boolean;
  setModalVisible: BooleanSetter;
  imageBase64: string | undefined;
  setImageBase64: StringOrUndefinedSetter;
}

const ProfileImageModal = (props: Props) => {
  const { modalVisible, setModalVisible, imageBase64, setImageBase64 } = props;
  const [temporaryImage, setTemporaryImage] = useState<string>(
    imageBase64 ?? ""
  );

  // YEAH I KNOW this is fvcking ugly, but i don't have time rn
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
        setTemporaryImage(processedImage);
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
        setTemporaryImage(processedImage);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      alert("An error occurred while taking the photo. Please try again.");
    }
  };

  const handleBack = () => {
    setTemporaryImage("");
    setModalVisible(false);
  };

  const onError = (e: APIError) => {
    console.error(e.message);
    Toast.show({
      type: "error",
      text1: e.message,
    });
  };

  const onSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Profile picture updated successfully!",
    });
    handleBack();
  };

  const handleConfirm = async () => {
    setImageBase64(temporaryImage);
    updateUserPicture(temporaryImage, onSuccess, onError)
    handleBack();
  };

  return (
    <View>
      <Modal visible={modalVisible} transparent={false} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backText}>{`<- Back`}</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: temporaryImage }}
            style={styles.fullscreenImage}
          />

          <TouchableOpacity onPress={openImagePicker} style={styles.button}>
            <Text style={styles.text}>Choose from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openCamera} style={styles.button}>
            <Text style={styles.text}>Take a Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleConfirm} style={styles.button}>
            <Text style={styles.text}>Confirm</Text>
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
    marginTop: 10,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  text: {
    color: "#000",
    fontSize: 16,
  },
  backButton: {
    textAlign: 'center',
    position: "absolute",
    top: 5,
    left: 5,
    padding: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  backText: {
    color: "#fff",
    fontSize: 18,
  },
});

export { ProfileImageModal };
