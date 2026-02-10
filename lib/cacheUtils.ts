import AsyncStorage from "@react-native-async-storage/async-storage";


export async function readFromCache<T>(table: string, setter: (v: T) => void): Promise<void> {
    const raw = await AsyncStorage.getItem(table);
    if (raw) setter(JSON.parse(raw) as T);
}


export async function writeToCache<T>(table: string, value: T): Promise<void> {
    await AsyncStorage.setItem(table, JSON.stringify(value));
}


export async function removeFromCache(table: string){
    await AsyncStorage.removeItem(table);
}