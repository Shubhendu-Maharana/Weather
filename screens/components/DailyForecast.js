import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
import { useFonts, Comfortaa_400Regular, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';
import Ionicons from '@expo/vector-icons/Ionicons';

const DailyForecast = ({ forecastData, day }) => {

    const [fontsLoaded] = useFonts({
        Comfortaa_400Regular,
        Comfortaa_700Bold
    });

    if (!fontsLoaded) return null;

    function getDayName(dateString) {
        if (dateString === "Today") return "Today";
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        const dayIndex = date.getDay();
        return days[dayIndex];
    }

    return (
        <View className='flex-row justify-between items-center'>
            <View className='min-w-[25%]'>
                <Text className='text-white' style={styles.setFontFamily}>{getDayName(day)}</Text>
            </View>
            <View className='flex-row flex-1 justify-evenly items-center'>
                <Text className='text-gray-300 text-[15px]' style={styles.setFontFamily}>
                    <Ionicons name="water-outline" size={13} />
                    {forecastData?.day.daily_chance_of_rain}%
                </Text>
                <Image
                    source={{
                        uri: `https:${forecastData?.day.condition.icon}`
                    }}
                    style={{
                        height: 45,
                        width: 45
                    }}
                />
                <Text className='text-white' style={styles.setFontFamily}>{Math.round(forecastData?.day.maxtemp_c)}&deg; / {Math.round(forecastData?.day.mintemp_c)}&deg;</Text>
            </View>
        </View>
    )
}

export default DailyForecast

const styles = StyleSheet.create({
    setFontFamily: {
        fontFamily: 'Comfortaa_400Regular'
    },
});
