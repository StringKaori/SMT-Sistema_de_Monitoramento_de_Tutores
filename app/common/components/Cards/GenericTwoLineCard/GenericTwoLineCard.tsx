import { getEventDetailedInfo } from "@common/axios/dashboard/dashboard";
import { EventDetailedInfoType } from "@common/types/EventDetailedInfoType";
import { Events } from "@common/types/Events";
import { ThemeColors } from "app/theme/types/ThemeType";
import { useThemeStore } from "app/theme/useThemeStore";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

interface Props {
  event: Events;
  isProfessor?: boolean;
}

const GenericTwoLineCard = (props: Props) => {
  const { theme, width, height } = useThemeStore();
  const styles = createStyles(theme.colors, width, height);
  const { event, isProfessor } = props;
  const [eventMoreInfo, setEventMoreInfo] = useState<EventDetailedInfoType>();

  useEffect(() => {
    const getEventMoreInfo = async () => {
      if(!isProfessor) { return; }
      if (event?.id) {
        try {
          const response = await getEventDetailedInfo(event.id);
          setEventMoreInfo(response);
        } catch (error) {
          console.error("Error fetching event details:", error);
        }
      }
    };

    getEventMoreInfo();
  }, [event]);

  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>{event.description}</Text>
      <Text style={styles.cardSubtitle}>
        {eventMoreInfo && `${eventMoreInfo.classroom.description}`}  {`${event.startTime.slice( 0, 5 )} - ${event.endTime.slice(0, 5)}`}
      </Text>
    </View>
  );
};

const createStyles = (colors: ThemeColors, width: number, height: number) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 5,
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
      width: width * 0.6,
      height: height * 0.078,
      borderColor: colors.outline,
      borderWidth: 2,
      borderRadius: 10,
      marginHorizontal: 5,
    },
    cardTitle: {
      color: colors.primaryText,
      fontWeight: "bold",
      fontSize: height * 0.018,
      textAlign: "center",
    },
    cardSubtitle: {
      color: colors.secondaryText,
      fontWeight: "600",
      fontSize: height * 0.016,
    },
  });

export { GenericTwoLineCard };
