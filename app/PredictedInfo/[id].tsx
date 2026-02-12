import {useLocalSearchParams} from "expo-router";
import {useApiData} from "@/lib/apiUtils";
import RoomListScrollFrame from "@/components/RoomListScrollFrame";


export default function CurrentTempDataScreen() {
    const {building}: {building: string} = useLocalSearchParams();
    const currentDataKey: string = process.env.EXPO_PUBLIC_PREDICTED_READINGS ?? "";
    const thermalReadings =
        useApiData(currentDataKey).filter(
            room => room.building === building);

    return (
        <RoomListScrollFrame building={building} thermalReadings={thermalReadings} prediction={true}>

        </RoomListScrollFrame>
    );
}
