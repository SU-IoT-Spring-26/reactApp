import {useEffect, useState} from "react";

export interface SensorData {
    sensor_id: string;
    last_update: string;
    occupancy: number;
    room_temperature: number;
    building?: string;
}

const nullData: SensorData = {
    sensor_id: "None",
    last_update: "1970-00-00T00:00:00.000000",
    occupancy: 0,
    room_temperature: 0,
    building: "None"
}


export async function getApiData(apiString: string | undefined): Promise<SensorData[]> {
    if (!apiString) return [nullData];
    try {
        const response = await (await fetch(apiString)).json();
        // Convert { "sensor1": { ... }, "sensor2": { ... } } into SensorData[]
        return Object.entries(response).map(([sensorId, data]: [string, any]) => ({
            sensor_id: sensorId,
            last_update: data.last_update,
            occupancy: data.occupancy,
            room_temperature: data.room_temperature,
            building: data.building ?? "Other",
        }));
    } catch (error) {
        console.error(error);
        return [nullData];
    }
}

export function useApiData(apiString: string | undefined) {
    const [data, setData] = useState<SensorData[]>([]);
    useEffect(() => {
        const fetchData = () => {
            getApiData(apiString).then(results => {
                setData(results.sort((a, b) => a.sensor_id.localeCompare(b.sensor_id)));
            });
        };
        fetchData();
        const intervalSpeed = 30;
        const interval = setInterval(fetchData, intervalSpeed * 1000);
        return () => clearInterval(interval);
    }, [apiString]);
    return data;
}