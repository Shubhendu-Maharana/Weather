import React from 'react'
import { View, Text, Image } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useFonts, Comfortaa_400Regular, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';

const HourlyForecastRow = ({ data }) => {

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

    const getRotationAngle = (direction) => {
        switch (direction) {
            case 'N':
                return "0";
            case 'NNE':
                return "22.5";
            case 'NE':
                return "45";
            case 'ENE':
                return "67.5";
            case 'E':
                return "90";
            case 'ESE':
                return "112.5";
            case 'SE':
                return "135";
            case 'SSE':
                return "157.5";
            case 'S':
                return "180";
            case 'SSW':
                return "202.5";
            case 'SW':
                return "225";
            case 'WSW':
                return "247.5";
            case 'W':
                return "270";
            case 'WNW':
                return "292.5";
            case 'NW':
                return "315";
            case 'NNW':
                return "337.5";
            default:
                return "0";
        }
    };

    return (
        <View style={{
            alignItems: 'center',
            gap: 5
        }}>
            <Text style={{
                fontFamily: 'Comfortaa_700Bold'
            }}>{data?.temp_c}&deg;</Text>
            <Image source={{
                height: 60,
                width: 60,
                uri: `https:${data?.condition.icon}`
            }} />
            <View style={{
                flexDirection: 'row',
                gap: 5
            }}>
                <FontAwesome6 style={{
                    transform: [{ rotate: `${getRotationAngle(data?.wind_dir) - 45}deg` }]
                }}
                    name="location-arrow"
                    size={18}
                    color="black" />
                <Text style={{
                    fontFamily: 'Comfortaa_700Bold'
                }}>{data?.wind_kph}km/h</Text>
            </View>
            <Text style={{
                fontFamily: 'Comfortaa_400Regular',
                color: '#555'
            }}>{formatTime(data?.time)}</Text>
        </View>
    )
}

export default HourlyForecastRow
