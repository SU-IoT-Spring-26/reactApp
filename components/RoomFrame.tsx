import {SensorData} from "@/lib/apiUtils";
import {StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {useTheme} from "@react-navigation/core";


const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
};

const formatDate = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};


export default function RoomFrame({room}: { room: SensorData }) {
    const isDark = useTheme().dark;
    const styles = roomFrameStyles(isDark);
    const occupied: boolean = room.occupancy >= 1;
    const dateTime = new Date(room.last_update + "Z");

    return (
        <LinearGradient colors={["#c3c3c3", "#999999"]}
                        locations={[0.3, 0.7]}
                        style={styles.roomInfoContainer}>
            <Text style={styles.roomTitle}>{room.sensor_id}:</Text>
            <View style={styles.roomStatusContainer}>
                <Text style={styles.roomStatusWord}>Status: </Text>
                <Text style={[styles.roomStatus, {backgroundColor: occupied ? "#fa4848" : "#3da129",}]}>
                    {occupied ? "Occupied" : "Empty"}</Text>
            </View>
            <Text style={styles.roomTimestamp}>
                Last updated at {formatTime(dateTime)} on {formatDate(dateTime)}</Text>
        </LinearGradient>
    );
}


function roomFrameStyles(isDark: boolean){
    return StyleSheet.create({
        roomInfoContainer: {
            borderWidth: 2,
            borderRadius: 15,
            borderColor: isDark ? "#000000" : "#6c6c6c",
            // backgroundColor: isDark ? "#000000" : "#d1d1d1",
            margin: 10,
            padding: 10,
        },
        roomTitle: {
            fontSize: 20,
            borderBottomWidth: 2,
            borderBottomColor: isDark ? "#000000" : "#000000",
            marginBottom: 5,
        },
        roomStatusContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        roomStatusWord: {
            fontSize: 16,
        },
        roomStatus: {
            lineHeight: 20,
            fontSize: 16,
            borderRadius: 10,
            padding: 10,
        },
        roomTimestamp: {
            fontSize: 16
        },
    });
}
