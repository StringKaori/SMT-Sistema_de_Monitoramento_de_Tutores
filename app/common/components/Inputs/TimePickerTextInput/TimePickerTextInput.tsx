import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useThemeStore } from "app/theme/useThemeStore";
import { DateOrUndefinedSetter } from "@common/types/SetStateType";

interface TimePickerProps {
  value: Date | undefined;
  onChange: DateOrUndefinedSetter;
  placeholder: string;
  placeholderTextColor?: string;
  disabled?: boolean;
}

const TimePickerTextInput = (props: TimePickerProps) => {
  const { value, onChange, placeholder, disabled = false } = props;
  const { theme, width } = useThemeStore();
  const styles = createStyles(theme.colors.outline, width);
  
  const [show, setShow] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    
    if (selectedTime) {
      onChange(selectedTime);
    }
  };

  const showTimePicker = () => {
    if (!disabled) {
      setShow(true);
    }
  };

  const displayText = value ? formatTime(value) : placeholder;

  return (
    <>
      <TouchableOpacity
        style={[styles.input, disabled && styles.disabled]}
        onPress={showTimePicker}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <Text style={[styles.text]}>
          {displayText}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={false}
          onChange={handleTimeChange}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        />
      )}
    </>
  );
};

const createStyles = (outlineColor: string, width: number) =>
  StyleSheet.create({
    input: {
      width: width * 0.9,
      borderColor: outlineColor,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
      padding: 15,
      paddingRight: 35,
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    disabled: {
      opacity: 0.6,
    },
    text: {
      fontSize: 16,
    },
  });

export { TimePickerTextInput };