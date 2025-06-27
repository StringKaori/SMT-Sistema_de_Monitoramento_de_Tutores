import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SearchBar } from "@common/components";
import { TabBarIcon } from "../../utils/TabBarIcon";
import { BottomTabParamList } from "./types/BottomTabParamList";
import { HomeScreen } from "@modules/Home/HomeScreen";
// import { FavoritesScreen } from "@modules/Favorites/FavoritesScreen";
import { RoomsScreen } from "@modules/Rooms/RoomsScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeStore } from "app/theme/useThemeStore";

import HomeSVG from "@assets/home_icon.svg";
import FocusedHomeSVG from "@assets/focused_home_icon.svg";
// import FavoriteSVG from "@assets/favorite_icon.svg";
// import FocusedFavoriteSVG from "@assets/focused_favorite_icon.svg";
import ExtrasSVG from "@assets/extras_icon.svg";
import FocusedExtrasSVG from "@assets/focused_extras_icon.svg";
import RoomsSVG from "@assets/rooms_icon.svg";
import FocusedRoomsSVG from "@assets/focused_rooms_icon.svg";
import ProfileSVG from "@assets/profile_icon.svg";
import FocusedProfileSVG from "@assets/focused_profile_icon.svg";
import { ProfileScreen } from "@modules/Profile/ProfileScreen";
import { RequiredResources } from "@modules/RequiredResources/RequiredResources";

const BottomTab = () => {
  const Tab = createBottomTabNavigator<BottomTabParamList>();
  const insets = useSafeAreaInsets();
  const { theme } = useThemeStore();

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarStyle: {
          height: 60 + insets.bottom,
          elevation: 0,
          borderTopWidth: 1,
          borderTopColor: theme.colors.outline,
          backgroundColor: theme.colors.primary,
        },
        tabBarLabelStyle: {
          color: theme.colors.highlightedText,
          fontWeight: "600",
          fontSize: 12,
        },
        tabBarLabelPosition: "below-icon",
        headerShown: true,
        header: () => <SearchBar />,
      })}
    >
      <Tab.Screen
        name={"HomeScreenTab"}
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} DefaultSVG={HomeSVG} FocusedSVG={FocusedHomeSVG } />
          ),
        }}
      />

      {/* <Tab.Screen
        name={"FavoritesScreenTab"}
        component={FavoritesScreen}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} DefaultSVG={FavoriteSVG} FocusedSVG={FocusedFavoriteSVG} />
          ),
        }}
      /> */}

      <Tab.Screen
        name={"RequiredResourcesTab"}
        component={RequiredResources}
        options={{
          tabBarLabel: "Extras",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} DefaultSVG={ExtrasSVG} FocusedSVG={FocusedExtrasSVG} />
          ),
        }}
      />

      <Tab.Screen
        name={"RoomsScreenTab"}
        component={RoomsScreen}
        options={{
          tabBarLabel: "Rooms",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} DefaultSVG={RoomsSVG} FocusedSVG={FocusedRoomsSVG} />
          ),
        }}
      />

      <Tab.Screen
        name={"ProfileScreenTab"}
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} DefaultSVG={ProfileSVG} FocusedSVG={FocusedProfileSVG} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export { BottomTab };
