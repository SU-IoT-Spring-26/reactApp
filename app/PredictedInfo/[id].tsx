import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Stack, useLocalSearchParams} from "expo-router";
import {useTheme} from "@react-navigation/core";
import {useApiData} from "@/lib/apiUtils";


export default function CurrentTempDataScreen() {
    const isDark = useTheme().dark;
    const {building} = useLocalSearchParams();
    const currentDataKey: string = process.env.EXPO_PUBLIC_CURRENT_READINGS ?? "";
    const thermalReadings = useApiData(currentDataKey).filter(room => room.building === building);

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

    const roomList = thermalReadings.map((sensor) => {
        const occupied: boolean = sensor.occupancy >= 1;
        const dateTime = new Date(sensor.last_update + "Z");
        console.log("Raw:", sensor.last_update);
        console.log("With Z:", sensor.last_update + "Z");
        console.log("getHours:", dateTime.getHours());
        console.log("getUTCHours:", dateTime.getUTCHours());

        return (<View key={sensor.sensor_id} style={styles.roomInfoContainer}>
            <Text style={styles.roomTitle}>{sensor.sensor_id}:</Text>
            <View style={styles.roomStatusContainer}>
                <Text style={styles.roomStatusWord}>Status: </Text>
                <Text style={[styles.roomStatus, {backgroundColor: occupied ? "#fa4848" : "#3da129",}]}>
                    {occupied ? "Occupied" : "Empty"}</Text>
            </View>
            <Text style={styles.roomTimestamp}>
                Last updated at {formatTime(dateTime)} on {formatDate(dateTime)}</Text>
        </View>);
    }); // end of roomList construction

    const noRoomsMessage = [<Text key={""} style={styles.emptyBuildingText}>No rooms listed in this building.</Text>]

    return (
        <>
            <Stack.Screen options={{
                title: building.toString(),
                headerTitleStyle: styles.headerTitleStyle,
                headerStyle: styles.headerStyle,
                headerBackButtonDisplayMode: "minimal"
            }}>
            </Stack.Screen>
            <ScrollView
                style={{flex: 1, backgroundColor: isDark ? "#2b2b2b" : "#ededed", marginBottom: 100,}}
                contentContainerStyle={{
                    flexGrow: 1, justifyContent: roomList.length === 0 ? "center" : "flex-start"
                }}
                showsVerticalScrollIndicator={false}>
                {roomList.length === 0 ? noRoomsMessage : roomList}
                <View style={{height: 100}}></View>
            </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 30,
        color: "#ff7106",
    },
    headerStyle: {
        backgroundColor: "#151e67",
    },
    roomInfoContainer: {
        borderWidth: 2,
        borderRadius: 15,
        borderColor: "#000000",
        backgroundColor: "#d1d1d1",
        margin: 10,
        padding: 10,
    },
    roomTitle: {
        fontSize: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#000000",
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
    emptyBuildingText: {
        fontSize: 30,
        color: "#000000",
        textAlign: "center",
    }
});
