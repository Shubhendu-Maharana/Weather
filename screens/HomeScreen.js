import React, { useCallback, useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { useFonts, Comfortaa_400Regular, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = ({ setCityName, refreshing, setRefreshing, currentWeatherData, forecastData }) => {
    const navigation = useNavigation();

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'denied') {
            status = await Location.requestForegroundPermissionsAsync();
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setCityName(`${currentLocation.coords.latitude},${currentLocation.coords.longitude}`);
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

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

    const currentHour = new Date().getHours();

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

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;

        return `${day}/${month} ${hours}:${minutes}${ampm}`;
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View className='bg-[#3c619c] min-h-screen p-3 pt-8'>
                <View className='flex-row items-center justify-between px-2'>
                    <View className='flex-row gap-4 items-center'>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <MaterialIcons name="menu" size={40} color="white" />
                        </TouchableOpacity>
                        <Text className='text-[30px] text-white mb-1' style={styles.setFontFamily}>{currentWeatherData?.location.name}</Text>
                    </View>
                    <TouchableOpacity onPress={() => getLocation()}>
                        <FontAwesome6 name="location-dot" size={25} color="white" />
                    </TouchableOpacity>
                </View>

                <View className='bg-inherit flex-row px-2 relative'>
                    <View className='gap-[50px]'>
                        <View>
                            <Text className='text-[65px] text-white' style={styles.setFontFamily}>{Math.round(currentWeatherData?.current.temp_c)}&deg;</Text>
                            <Text className='text-[18px] text-white' style={styles.setFontFamily}>{currentWeatherData?.current.condition.text}</Text>
                        </View>
                        <View>
                            <Text className='text-[18px] text-white' style={styles.setFontFamily}>{Math.round(forecastData?.forecastday[0].day.maxtemp_c)}&deg; / {Math.round(forecastData?.forecastday[0].day.mintemp_c)}&deg; Feels like {Math.round(currentWeatherData?.current.feelslike_c)}&deg;</Text>
                        </View>
                    </View>

                    <View className='absolute right-0 h-full w-[65%] -z-10'>
                        <Image
                            source={{
                                uri: `https:${currentWeatherData?.current.condition.icon}`
                            }}
                            className='h-full'
                        />
                    </View>
                </View>

                <View className='mt-10 bg-white/[.25] px-4 py-4 rounded-3xl'>
                    <View className='flex-row gap-1 items-center'>
                        <MaterialCommunityIcons name="hours-24" size={24} color={'white'} />
                        <Text className='text-white text-base'>Hourly forecast</Text>
                    </View>
                    <View className='border-b-[1px] border-gray-300 my-3'></View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{
                            flexDirection: 'row',
                            gap: 20
                        }}>
                            {forecastData?.forecastday[0].hour.map((hourlyData, key) => (
                                isMatchingHour(hourlyData.time) ? <HourlyForecast key={key} data={hourlyData} /> : null
                            ))}
                            {forecastData?.forecastday[1].hour
                                .filter((hourlyData) => {
                                    const hour = new Date(hourlyData.time).getHours();
                                    return hour <= currentHour;
                                })
                                .map((hourlyData, key) => (
                                    <HourlyForecast key={key} data={hourlyData} />
                                ))}
                        </View>
                    </ScrollView>
                </View>

                <View className='mt-5 bg-white/[.25] px-4 py-4 rounded-3xl'>
                    <View className='flex-row gap-1 items-center'>
                        <MaterialCommunityIcons name="calendar-today" size={24} color={'white'} />
                        <Text className='text-white text-base'>Daily forecast</Text>
                    </View>
                    <View className='border-b-[1px] border-gray-300 my-3'></View>

                    <DailyForecast forecastData={forecastData?.forecastday[0]} day={"Today"} />
                    <DailyForecast forecastData={forecastData?.forecastday[1]} day={forecastData?.forecastday[1].date} />
                    <DailyForecast forecastData={forecastData?.forecastday[2]} day={forecastData?.forecastday[2].date} />
                </View>

                <View className='mt-5 flex-row flex-wrap justify-between'>
                    <View className='bg-white/[.25] px-4 py-4 rounded-3xl w-[49%] my-1'>
                        <View className='flex-row items-center gap-2'>
                            <FontAwesome6 name="wind" size={15} color="white" />
                            <Text className='text-white text-[15px]'>Wind</Text>
                        </View>
                        <View className='flex-row items-center gap-3'>
                            <FontAwesome6 style={{
                                transform: [{ rotate: `${getRotationAngle(currentWeatherData?.current.wind_dir) - 45}deg` }]
                            }}
                                name="location-arrow"
                                size={20}
                                color="white" />
                            <Text className='text-white text-base'>{currentWeatherData?.current.wind_kph}km/h</Text>
                        </View>
                    </View>
                    <View className='bg-white/[.25] px-4 py-4 rounded-3xl w-[49%] my-1'>
                        <View className='flex-row gap-1 items-center'>
                            <Ionicons name="water-outline" size={15} color={'white'} />
                            <Text className='text-white text-[15px]'>Humidity</Text>
                        </View>
                        <Text className='text-white text-2xl'>{currentWeatherData?.current.humidity}%</Text>
                    </View>
                    <View className='bg-white/[.25] px-4 py-4 rounded-3xl w-[49%] my-1'>
                        <View className='flex-row gap-1 items-center'>
                            <FontAwesome name="compress" size={15} color="white" />
                            <Text className='text-white text-[15px]'>Pressure</Text>
                        </View>
                        <Text className='text-white text-2xl'>{currentWeatherData?.current.pressure_mb}mbar</Text>
                    </View>
                    <View className='bg-white/[.25] px-4 py-4 rounded-3xl w-[49%] my-1'>
                        <View className='flex-row gap-1 items-center'>
                            <FontAwesome6 name="cloud-rain" size={15} color="white" />
                            <Text className='text-white text-[15px]'>Chance of rain</Text>
                        </View>
                        <Text className='text-white text-2xl'>{forecastData?.forecastday[0].day.daily_chance_of_rain}%</Text>
                    </View>
                    <View className='bg-white/[.25] px-4 py-4 rounded-3xl w-[49%] my-1'>
                        <View className='flex-row gap-1 items-center'>
                            <MaterialIcons name="visibility" size={15} color="white" />
                            <Text className='text-white text-[15px]'>Visibility</Text>
                        </View>
                        <Text className='text-white text-2xl'>{currentWeatherData?.current.vis_km}km</Text>
                    </View>
                    <View className='bg-white/[.25] px-4 py-4 rounded-3xl w-[49%] my-1'>
                        <View className='flex-row gap-1 items-center'>
                            <MaterialIcons name="dew-point" size={15} color="white" />
                            <Text className='text-white text-[15px]'>Dew point</Text>
                        </View>
                        <Text className='text-white text-2xl'>{Math.round(currentWeatherData?.current.dewpoint_c)}&deg;</Text>
                    </View>
                    <View className='bg-white/[.25] px-4 py-4 rounded-3xl w-[100%] my-1 flex-row justify-around'>
                        <View>
                            <View className='flex-row gap-1 items-center justify-center'>
                                <Feather name="sunrise" size={15} color="white" />
                                <Text className='text-white text-[15px]'>Sunrise</Text>
                            </View>
                            <Text className='text-white text-2xl'>{forecastData?.forecastday[0].astro.sunrise}</Text>
                        </View>
                        <View>
                            <View className='flex-row gap-1 items-center justify-center'>
                                <Feather name="sunset" size={15} color="white" />
                                <Text className='text-white text-[15px]'>Sunset</Text>
                            </View>
                            <Text className='text-white text-2xl'>{forecastData?.forecastday[0].astro.sunset}</Text>
                        </View>
                    </View>
                    <View className='bg-white/[.25] px-4 py-4 rounded-3xl w-[100%] my-1 flex-row justify-around'>
                        <View>
                            <Text className='text-white text-[15px] text-center'>Moonrise</Text>
                            <Text className='text-white text-2xl'>{forecastData?.forecastday[0].astro.moonrise}</Text>
                        </View>
                        <View>
                            <Text className='text-white text-[15px] text-center'>Moonset</Text>
                            <Text className='text-white text-2xl'>{forecastData?.forecastday[0].astro.moonset}</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <Text className='text-white text-right p-2'>Updated on {formatDate(currentWeatherData?.current.last_updated)}</Text>
                </View>

            </View>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    setFontFamily: {
        fontFamily: 'Comfortaa_700Bold'
    },
});
