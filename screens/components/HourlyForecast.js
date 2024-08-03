import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Comfortaa_400Regular, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';

const HourlyForecast = ({ data }) => {

    const [fontsLoaded] = useFonts({
        Comfortaa_400Regular,
        Comfortaa_700Bold
    });

    if (!fontsLoaded) return null;

    function formatTime(inputDateTime) {
        const date = new Date(inputDateTime);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const currentDate = new Date();

        if (date.getHours() === currentDate.getHours() && date.getDate() === currentDate.getDate()) {
            return "Now";
        } else {
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            return formattedHours + ':' + formattedMinutes + ' ' + ampm;
        }
    }

    return (
        <View className='items-center gap-[5px]'>
            <Text className='text-white' style={styles.setFontFamily}>{formatTime(data?.time)}</Text>
            <Image
                source={{
                    uri: `https:${data?.condition.icon}`
                }}
                style={{
                    height: 45,
                    width: 45
                }}
            />
            <Text className='text-white' style={styles.setFontFamily}>{Math.round(data?.temp_c)}&deg;</Text>
            <Text className='text-gray-300 text-[15px]' style={styles.setFontFamily}>
                <Ionicons name="water-outline" size={13} />
                {data?.chance_of_rain}%
            </Text>
        </View>
    )
}

export default HourlyForecast

const styles = StyleSheet.create({
    setFontFamily: {
        fontFamily: 'Comfortaa_700Bold'
    },
});
