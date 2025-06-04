import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SearchBar } from "@common/components";
import HomeSVG from "@assets/home_icon.svg";
import FavoriteSVG from "@assets/favorite_icon.svg";
import RoomsSVG from "@assets/rooms_icon.svg";
import { TabBarIcon } from "../../utils/TabBarIcon";
import { BottomTabParamList } from "./types/BottomTabParamList";
import { HomeScreen } from "@modules/Home/HomeScreen";
import { FavoritesScreen } from "@modules/Favorites/FavoritesScreen";
import { RoomsScreen } from "@modules/Rooms/RoomsScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomTab = () => {
  const Tab = createBottomTabNavigator<BottomTabParamList>();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarStyle: {
          
          height: 60 + insets.bottom,
          elevation: 0,
          borderTopWidth: 1,
          borderTopColor: "#e2e2e2",
          backgroundColor: "#DDFFD9",
        },
        tabBarLabelStyle: {
          color: "#45B71B",
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
            <TabBarIcon focused={focused} SVG={HomeSVG} />
          ),
        }}
      />

      <Tab.Screen
        name={"FavoritesScreenTab"}
        component={FavoritesScreen}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} SVG={FavoriteSVG} />
          ),
        }}
      />

      <Tab.Screen
        name={"RoomsScreenTab"}
        component={RoomsScreen}
        options={{
          tabBarLabel: "Rooms",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} SVG={RoomsSVG} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export { BottomTab };
