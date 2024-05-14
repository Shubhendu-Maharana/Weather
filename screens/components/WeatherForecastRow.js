import React from 'react'
import { View, Text, Image } from 'react-native'
import { useFonts, Comfortaa_400Regular, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';

const WeatherForecastRow = ({ forecastData, day }) => {

    const [fontsLoaded] = useFonts({
        Comfortaa_400Regular,
        Comfortaa_700Bold
    });

    if (!fontsLoaded) return null;

    function getDayName(dateString) {
        if (dateString === "Today") return "Today";
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const date = new Date(dateString);
        const dayIndex = date.getDay();
        return days[dayIndex];
    }

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20
        }}>
            <View style={{
                flexDirection: 'row',
                gap: 8,
                flex: 1,
                alignItems: 'center'
            }}>
                <Image source={{
                    height: 30,
                    width: 30,
                    uri: `https:${forecastData?.day.condition.icon}`
                }} />
                <Text style={{
                    fontFamily: 'Comfortaa_400Regular',
                    color: '#ccc'
                }}>{getDayName(day)}</Text>
                <Text style={{
                    fontFamily: 'Comfortaa_400Regular',
                    color: '#ccc'
                }}>{forecastData?.day.condition.text}</Text>
            </View>
            <Text style={{
                fontFamily: 'Comfortaa_400Regular',
                color: '#ccc'
            }}>{forecastData?.day.maxtemp_c}&deg;&nbsp;/&nbsp;{forecastData?.day.mintemp_c}&deg;</Text>
        </View>
    )
}

export default WeatherForecastRow
