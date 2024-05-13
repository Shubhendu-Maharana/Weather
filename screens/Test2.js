import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import HourlyForecastRow from './HourlyForecastRow';
import { useFonts, Comfortaa_400Regular, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';
import { FontAwesome6 } from '@expo/vector-icons';

const Test2 = ({ forecastData }) => {

    const [fontsLoaded] = useFonts({
        Comfortaa_400Regular,
        Comfortaa_700Bold
    });

    if (!fontsLoaded) return null;

    function isMatchingHour(inputDate) {
        const inputDateTime = new Date(inputDate);
        const currentHour = new Date().getHours();
        return inputDateTime.getHours() >= currentHour;
    }


    return (
        <View style={{
            backgroundColor: 'white',
            marginTop: 20,
            padding: 20,
            borderRadius: 20,
            gap: 15
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5
            }}>
                <FontAwesome6 name='clock' size={15} color='#555' />
                <Text style={{
                    fontFamily: 'Comfortaa_400Regular',
                    color: '#555'
                }}>Hourly forecast</Text>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{
                    flexDirection: 'row',
                    gap: 20
                }}>
                    {forecastData?.forecastday[0].hour.map((hourlyData, key) => (
                        isMatchingHour(hourlyData.time) ? <HourlyForecastRow key={key} data={hourlyData} /> : null
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default Test2
