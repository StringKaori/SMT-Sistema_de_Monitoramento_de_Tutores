import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { TitleView } from "@common/components";
import { MenuItem } from "./Helpers/MenuItem";
import { AdminModule } from "./Helpers/AdminModule";
import { useProfileViewModel } from "./useProfileViewModel";

const ProfileScreen = () => {
  const { theme, width, height } = useThemeStore();
  const styles = createStyles(theme.colors, width, height);
  const viewModel = useProfileViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://m.imageimg.net/upload/artist_img/REVOF/498397007683e7c354a07b6772e6a5249c657e46_633ba2168ff16.jpg",
          }}
        />
        <View style={styles.column}>
          <Text style={styles.name}>{viewModel.user?.username}</Text>
          {/* TODO: falar pro tavos adicionar prontuário */}
          <Text style={styles.id}>BP304002X</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {viewModel.isAdmin && <AdminModule />}

      <TitleView title={"Account"} />
      <MenuItem title={"Reset Password"} />
      <MenuItem title={"Log Out"} action={viewModel.logOut} />
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
    },
  });

export { ProfileScreen };
