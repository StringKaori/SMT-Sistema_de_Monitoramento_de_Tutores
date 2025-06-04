import { View, Text, TouchableOpacity } from "react-native";

const CourseSelector = () => {
    return (
        <View style={{ alignSelf: `flex-start`, padding: 10 }}>
            <TouchableOpacity>
                <Text>ADS *</Text>
            </TouchableOpacity>
        </View>
    )
}

export { CourseSelector };