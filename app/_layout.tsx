import { ThemeProvider} from "@react-navigation/core";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import {useColorScheme} from "react-native";
import {NativeTabs, Label, Icon} from "expo-router/unstable-native-tabs";

export default function RootLayout() {
  const colorScheme = useColorScheme();
    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <NativeTabs>
                <NativeTabs.Trigger name="CurrentInfo">
                    <Label>Occupancy</Label>
                    <Icon
                        sf={{ default: 'person.3', selected: 'person.3.fill' }}
                    />
                </NativeTabs.Trigger>

                <NativeTabs.Trigger name="PredictedInfo">
                    <Label>Predicted</Label>
                    <Icon
                        sf={{ default: 'chart.line.uptrend.xyaxis', selected: 'chart.line.uptrend.xyaxis' }}
                    />
                </NativeTabs.Trigger>
            </NativeTabs>
        </ThemeProvider>
    );
}
