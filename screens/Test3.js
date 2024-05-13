import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFonts, Comfortaa_400Regular, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';

const Test3 = ({ weatherData }) => {

    const [fontsLoaded] = useFonts({
        Comfortaa_400Regular,
        Comfortaa_700Bold
    });

    if (!fontsLoaded) return null;

    return (
        <View style={{
            backgroundColor: 'white',
            marginTop: 20,
            padding: 20,
            borderRadius: 20,
            gap: 5
        }}>
            <View style={styles.row}>
                <Text style={styles.font}>Humidity</Text>
                <Text style={styles.font}>{weatherData?.current.humidity}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.font}>Real feel</Text>
                <Text style={styles.font}>{weatherData?.current.feelslike_c}&deg;</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.font}>UV</Text>
                <Text style={styles.font}>{weatherData?.current.uv}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.font}>Pressure</Text>
                <Text style={styles.font}>{weatherData?.current.pressure_mb}mbar</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.font}>Chance of rain</Text>
                <Text style={styles.font}>{weatherData?.forecast.forecastday[0].day.daily_chance_of_rain}%</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.font}>Visibilty</Text>
                <Text style={styles.font}>{weatherData?.current.vis_km}km</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.font}>Sunrise</Text>
                <Text style={styles.font}>{weatherData?.forecast.forecastday[0].astro.sunrise}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.font}>Sunset</Text>
                <Text style={styles.font}>{weatherData?.forecast.forecastday[0].astro.sunset}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#999',
        paddingVertical: 5
    },
    font: {
        fontFamily: 'Comfortaa_400Regular'
    }
})

export default Test3

