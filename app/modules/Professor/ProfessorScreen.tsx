import { getAllEventsFromProfessorById } from "@common/axios/dashboard/dashboard";
import { GenericScroller } from "@common/components";
import { DaysEnum } from "@common/types/DaysEnum";
import { Events } from "@common/types/Events";
import { ProfessorCardData } from "@common/types/ProfessorCardData";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@routes/Stack/RootStack/types/RootStackParamList";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface Prop {
  route: RouteProp<RootStackParamList, "ProfessorScreen">;
}

const ProfessorScreen = ({ route }: Prop) => {
  const { theme, height } = useThemeStore();

  const insets = useSafeAreaInsets();
  const styles = createStyles(theme.colors, height);
  const professor: ProfessorCardData = route.params;
  const [allEvents, setAllEvents] = useState<Record<DaysEnum, Events[]>>()

  useEffect(() => {
    const getAllEvents = async () => {
      const response = await getAllEventsFromProfessorById(professor.id);
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
      setAllEvents(groupedByWeekday);
      
    };

    getAllEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{professor.name}</Text>
      <ScrollView
        style={{ marginBottom: insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {allEvents && Object.values(DaysEnum).map((day) => (
          allEvents[day].length > 0 ? <GenericScroller key={day} title={day} events={allEvents[day]} /> : null
        ))}
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: ThemeColors, height: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    name: {
      color: colors.primary,
      fontSize: height * 0.03,
      fontWeight: "bold",
      paddingBottom: 20,
      textAlign: 'center'
    },
  });

export { ProfessorScreen };
