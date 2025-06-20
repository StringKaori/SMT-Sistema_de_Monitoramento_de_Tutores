import React, { useState } from "react";
import {
  View,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { BooleanSetter, StringSetter } from "@common/types/SetStateType";

interface Props {
  modalVisible: boolean;
  setModalVisible: BooleanSetter;
  imageUri: string;
  setImageUri: StringSetter;
}

const ProfileImageModal = (props: Props) => {
  const { modalVisible, setModalVisible, imageUri, setImageUri } = props;
  const openImagePicker = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission required to access gallery");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Permission required to use camera");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      setModalVisible(false);
      
      console.log(imageUri);
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
          <Image source={{ uri: imageUri }} style={styles.fullscreenImage} />

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
