import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {Stack, useRouter} from "expo-router";
import {useTheme} from "@react-navigation/core";
import {Ionicons} from "@expo/vector-icons";
import {useApiData} from "@/lib/apiUtils";

export default function Index() {
    const router = useRouter();
    const isDark = useTheme().dark;

    const roomList = useApiData(process.env.EXPO_PUBLIC_PREDICTED_READINGS);
    const buildings = [...new Set(roomList.map(room => room.building))];
    const buildingList = buildings.map((building) => {
        return <Pressable key={building} style={styles.buildingButton} onPress={() => {
            handlePress(router, !building ? "" : building);
        }}>
            <Text style={styles.buildingText}>{building}</Text>
            <Ionicons name="chevron-forward" style={styles.goArrow}/>
        </Pressable>
    });

    return (
        <>
            <Stack.Screen options={{
                title: "Predicted Occupancy",
                headerTitleStyle: styles.headerTitleStyle,
                headerStyle: styles.headerStyle
            }}>
            </Stack.Screen>
            <ScrollView
                style={{flex: 1, backgroundColor: isDark ? "#2b2b2b" : "#ededed", padding: 10,}}
                contentContainerStyle={{
                    flexGrow: 1
                }}
                showsVerticalScrollIndicator={false}>
                {buildingList}
                <View style={{height: 100}}></View>
            </ScrollView>
        </>
    );
}

async function handlePress(router: any, building: string) {
    router.push({
        pathname: "/PredictedInfo/[id]",
        params: {building: building}
    });
}


const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 23,
        color: "#ff7106",
    },
    headerStyle: {
        backgroundColor: "#151e67",
    },
    buildingButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ff983f",
        borderRadius: 15,
        margin: 5,
    },
    buildingText: {
        margin: 10,
        marginLeft: 15,
        fontSize: 25,
    },
    goArrow: {
        color: "#000000",
        fontSize: 20,
        marginRight: 15,
    }
});
