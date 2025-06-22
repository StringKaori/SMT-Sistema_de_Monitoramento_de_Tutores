import { getEventDetailedInfo } from "@common/axios/dashboard/dashboard";
import { timeStringShortToDate } from "@common/helpers/dateConverters";
import { EventDetailedInfoType } from "@common/types/EventDetailedInfoType";
import { Events } from "@common/types/Events";
import { ProfessorCardData } from "@common/types/ProfessorCardData";
import { RootStackNavigationProp } from "@common/types/RootStackNavigationProp";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ProfessorCardProps {
  data: ProfessorCardData;
  navigation: RootStackNavigationProp;
}

const ProfessorCard = (props: ProfessorCardProps) => {
  const { data, navigation } = props;
  const { name, events } = data;
  const { width, height, theme } = useThemeStore();
  const [closestEvent, setClosestEvent] = useState<Events>();
  const [eventMoreInfo, setEventMoreInfo] = useState<EventDetailedInfoType>();

  useEffect(() => {
    const testDate1 = new Date(2025, 5, 23, 19, 0);
    const today = testDate1.toLocaleDateString("en-US", {
      weekday: "long",
    });
    
    if (!events || events.length === 0 || events[0].weekday !== today) return;
    
    const now = testDate1;
    let foundEvent = undefined;

    for (const event of events) {
      const startTime = timeStringShortToDate(event.startTime);
      const endTime = timeStringShortToDate(event.endTime);
      const getTimeInMinutes = (date: Date) =>
        date.getUTCHours() * 60 + date.getUTCMinutes();
      const nowMinute = getTimeInMinutes(now);
      const startTimeMinute = getTimeInMinutes(startTime);
      const endTimeMinute = getTimeInMinutes(endTime);

      if (nowMinute >= startTimeMinute && nowMinute <= endTimeMinute) {
        foundEvent = event;
        break;
      }
    }
    
    setClosestEvent(foundEvent);
  }, [events]);

  useEffect(() => {
    const getEventMoreInfo = async () => {
      if (closestEvent?.id) {
        try {
          const response = await getEventDetailedInfo(closestEvent.id);
          setEventMoreInfo(response);
        } catch (error) {
          console.error('Error fetching event details:', error);
        }
      }
    };
    
    getEventMoreInfo();
  }, [closestEvent]);

  const styles = createStyles(width, height, theme.colors);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("ProfessorScreen", data)}
    >
      <Text style={styles.text}>{name}</Text>

      <View style={styles.verticalView}>
        <Text style={[styles.secondaryText]}>
          {closestEvent?.startTime && closestEvent?.endTime && eventMoreInfo?.classroom?.description
            ? `${eventMoreInfo.classroom.description}  ${closestEvent.startTime.slice(0, 5)} - ${closestEvent.endTime.slice(0, 5)}`
            : "Not currently in class"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (width: number, height: number, colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: colors.outline,
      borderRadius: 10,
      paddingHorizontal: 10,
      width: width * 0.45,
      height: height * 0.078,
      margin: 5,
    },

    verticalView: {
      flexDirection: "row",
    },

    text: {
      fontSize: height * 0.017,
      color: colors.primaryText,
      fontWeight: "bold",
      textAlign: "center",
    },

    secondaryText: {
      fontSize: height * 0.017,
      color: colors.secondaryText,
      fontWeight: "400",
    },
  });

export { ProfessorCard };