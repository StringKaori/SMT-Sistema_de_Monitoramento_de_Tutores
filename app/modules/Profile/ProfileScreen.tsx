import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { TitleView } from "@common/components";
import { MenuItem } from "./Helpers/MenuItem";
import { AdminModule } from "./modules/AdminModule";
import { useProfileViewModel } from "./useProfileViewModel";
import { ProfileImageModal } from "./Helpers/ProfileImageModal";

const ProfileScreen = () => {
  const { theme, width, height } = useThemeStore();
  const styles = createStyles(theme.colors, width, height);
  const viewModel = useProfileViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => viewModel.setIsModalVisible(true)}>
          <Image
            style={styles.profileImage}
            source={viewModel.imageBase64 ? { uri: viewModel.imageBase64 } : require('@assets/profile_picture.png')}
          />
        </TouchableOpacity>
        <View style={styles.column}>
          <Text style={styles.name}>
            {viewModel.user?.fullName}
          </Text>
          <Text style={styles.id}>{viewModel.user?.enrollment}</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {viewModel.isAdmin && <AdminModule viewModel={viewModel} />}

        <TitleView title={"Account"} />
        <MenuItem title={"Reset Password"} action={viewModel.navigateToResetPassword} />
        <MenuItem title={"Log Out"} action={viewModel.logOut} />
      </ScrollView>
      {viewModel.isModalVisible && <ProfileImageModal
        modalVisible={viewModel.isModalVisible}
        setModalVisible={viewModel.setIsModalVisible}
        imageBase64={viewModel.imageBase64}
        setImageBase64={viewModel.setImageBase64}
      />}
    </View>
  );
};

const createStyles = (colors: ThemeColors, width: number, height: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: colors.background,
    },
    profileImage: {
      width: width * 0.35,
      height: width * 0.35,
      borderRadius: width * 0.35,
      marginRight: 20,
    },
    name: {
      color: colors.primaryText,
      fontWeight: "bold",
      fontSize: height * 0.025,
      textAlign: `center`,
    },
    id: {
      color: colors.primaryText,
      fontWeight: "bold",
      fontSize: height * 0.02,
    },
    button: {
      borderColor: colors.outline,
      borderWidth: 2,
      borderRadius: 10,
      paddingVertical: 2,
      paddingHorizontal: 15,
    },
    buttonText: {
      color: colors.primaryText,
      fontWeight: "600",
      fontSize: height * 0.02,
    },
    row: {
      justifyContent: "space-evenly",
      flexDirection: "row",
      padding: height * 0.025,
    },
    column: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
      maxWidth: `50%`,
    },
  });

export { ProfileScreen };
