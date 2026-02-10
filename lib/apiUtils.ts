import {useEffect, useState} from "react";

interface SensorData {
    sensor_id: string;
    last_update: string;
    occupancy: number;
    min_temp: number;
    max_temp: number;
    building?: string;
}

const nullData: SensorData = {
    sensor_id: "None",
    last_update: "1970-00-00T00:00:00.000000",
    occupancy: 0,
    min_temp: 0,
    max_temp: 0,
    building: "None"
}


export async function getApiData(apiString: string | undefined): Promise<any[]>{
    if (!apiString) return [nullData];
    try {
        return await (await fetch(apiString)).json();
    }
    catch (error){
        console.error(error);
        return [nullData];
    }
}

export function useApiData(apiString: string | undefined){
    const [data, setData] = useState<SensorData[]>([]);
    useEffect(() => {
        const fetchData = () => {
            getApiData(apiString).then(results => {
                const wrapped = Array.isArray(results) ? results : [results];
                const enriched = wrapped.map(item => ({
                    ...item,
                    building: "Other",
                }));

                setData(prev => {
                    const updated = [...prev];
                    for (const item of enriched) {
                        const index = updated.findIndex(d => d.sensor_id === item.sensor_id);
                        if (index >= 0) {
                            updated[index] = item; // update existing
                        } else {
                            updated.push(item); // add new
                        }
                    }
                    return updated.sort((a, b) => a.sensor_id.localeCompare(b.sensor_id));
                });
            });
        };
        fetchData();
        const intervalSpeed = 5;
        const interval = setInterval(fetchData, intervalSpeed * 1000);

        // Cleanup: stop polling when component unmounts
        return () => clearInterval(interval);
    }, [apiString]);
    return data;
}