import RoomFrame from "@/components/RoomFrame";
import {ScrollView, Text, View} from "react-native";
import {styles} from "@/constants/roomListStyles";
import {Stack} from "expo-router";
import {SensorData} from "@/lib/apiUtils";
import {useTheme} from "@react-navigation/core";
import PredictedRoomFrame from "@/components/PredictedRoomFrame";

export type RoomListScrollFrameProps = {
    building?: string,
    thermalReadings: SensorData[],
    prediction?: boolean,
}


export default function RoomListScrollFrame(
    {building="Other", thermalReadings, prediction=false}: RoomListScrollFrameProps):
    React.JSX.Element{


    const isDark = useTheme().dark;
    const roomList = thermalReadings.map((sensor) => {
        if (prediction)
            return <PredictedRoomFrame key={sensor.sensor_id} room={sensor}/>
        return <RoomFrame key={sensor.sensor_id} room={sensor}/>
    }); // end of roomList construction

    const noRoomsMessage =
        [<Text key={""} style={styles.emptyBuildingText}>No rooms listed in this building.</Text>]

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
                style={{flex: 1, backgroundColor: isDark ? "#2b2b2b" : "#ededed",}} contentContainerStyle={{
                flexGrow: 1, justifyContent: roomList.length === 0 ? "center" : "flex-start"
            }}
                showsVerticalScrollIndicator={false}>
                {roomList.length === 0 ? noRoomsMessage : roomList}
                <View style={{height: 100}}></View>
            </ScrollView>
        </>
    );
}