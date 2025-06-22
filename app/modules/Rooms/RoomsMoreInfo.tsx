import { getAllEventsFromClassroomById } from "@common/axios/dashboard/dashboard";
import { GenericScroller } from "@common/components";
import { Classrooms, ClassroomsWithEvents } from "@common/types/Classrooms";
import { DaysEnum } from "@common/types/DaysEnum";
import { Events } from "@common/types/Events";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@routes/Stack/RootStack/types/RootStackParamList";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Prop {
  route: RouteProp<RootStackParamList, "RoomsMoreInfoScreen">;
}

const RoomsMoreInfo = ({ route }: Prop) => {
  const { theme, height } = useThemeStore();
  const styles = createStyles(theme.colors, height);
  const room: Classrooms = route.params;
  const [events, setEvents] = useState<Record<DaysEnum, Events[]>>();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const getAllEvents = async () => {
      const response = await getAllEventsFromClassroomById(room.id);
      const events: Events[] = response.events;

      const groupedByWeekday = events.reduce(
        (acc: Record<DaysEnum, Events[]>, event) => {
          const weekday = event.weekday as DaysEnum;

          if (!acc[weekday]) {
            acc[weekday] = [];
          }

          acc[weekday].push(event);
          return acc;
        },
        {
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
        }
      );

      setEvents(groupedByWeekday);
    };

    getAllEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.code}>{room.description}</Text>

      <Text style={styles.subtitle}>Capacity</Text>
      <Text style={styles.text}>{room.capacity}</Text>

      <Text style={styles.subtitle}>Notes</Text>
      <Text style={styles.text}>{room.observation}</Text>
      <ScrollView
        style={{ marginBottom: insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {events &&
          Object.values(DaysEnum).map((day) =>
            events[day].length > 0 ? (
              <GenericScroller key={day} title={day} events={events[day]} />
            ) : null
          )}
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: ThemeColors, height: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      alignItems: "center",
    },
    code: {
      color: colors.primary,
      fontSize: height * 0.03,
      fontWeight: "bold",
      paddingBottom: 10,
      textAlign: "center",
    },
    subtitle: {
      color: colors.primary,
      fontSize: height * 0.02,
      fontWeight: "600",
      textAlign: "center",
    },
    text: {
      paddingBottom: 10,
      color: colors.secondaryText,
      fontWeight: "600",
      textAlign: "center",
    },
  });

export { RoomsMoreInfo };
