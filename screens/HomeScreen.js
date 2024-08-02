import React from 'react';
import HourlyForecastBox from "./HourlyForecastBox"
import { StatusBar, currentHeight, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFonts, Comfortaa_400Regular, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';
import WeatherForecastRow from './components/WeatherForecastRow';
import MoreInfo from './MoreInfo';


const HomeScreen = ({ currentWeatherData, forecastData }) => {

    const [fontsLoaded] = useFonts({
        Comfortaa_400Regular,
        Comfortaa_700Bold
    });

    if (!fontsLoaded) return null;

    return (
        <View style={{
            paddingTop: StatusBar.currentHeight,
            backgroundColor: '#4085ff',
            padding: 10,
        }}>
            <View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Image source={{
                            height: 200,
                            width: 200,
                            uri: `https:${currentWeatherData?.current.condition.icon}`
                        }} />
                    </View>

                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        marginTop: -10
                    }}>
                        <View style={{
                            marginBottom: -15
                        }}>
                            <Text style={{
                                fontFamily: 'Comfortaa_400Regular',
                                color: 'white',
                                fontSize: 20,
                            }}>{currentWeatherData?.location.name}</Text>
                        </View>
                        <View>
                            <Text style={{
                                fontFamily: 'Comfortaa_700Bold',
                                color: 'white',
                                fontSize: 100,
                                marginVertical: -15
                            }}>{Math.round(currentWeatherData?.current.temp_c)}&deg;</Text>
                        </View>
                        <View>
                            <Text style={{
                                fontFamily: 'Comfortaa_400Regular',
                                color: 'white',
                                fontSize: 20
                            }}>{Math.round(forecastData?.forecastday[0].day.maxtemp_c)}&deg;/{Math.round(forecastData?.forecastday[0].day.mintemp_c)}&deg;</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            gap: 5,
                            backgroundColor: 'rgba(255, 255, 255, .3)',
                            alignItems: 'center',
                            paddingHorizontal: 12,
                            paddingVertical: 4,
                            borderRadius: 100,
                            marginTop: 10,
                        }}>
                            <Ionicons name='leaf-outline' size={20} color='white' />
                            <Text style={{
                                fontFamily: 'Comfortaa_700Bold',
                                color: 'white',
                                fontSize: 14
                            }}>{currentWeatherData?.current.condition.text}</Text>
                        </View>
                    </View>
                </View>

                <View style={{
                    backgroundColor: 'white',
                    paddingVertical: 20,
                    paddingHorizontal: 18,
                    borderRadius: 20,
                    gap: 20,
                    marginTop: 30
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1, // Remove this after enabling "More Details button"
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 5
                        }}>
                            <MaterialIcons name="date-range" size={24} color="#555" />
                            <Text style={{
                                fontFamily: 'Comfortaa_400Regular',
                                color: '#555'
                            }}>5-day forecast</Text>
                        </View>
                        {/* <View style={{
                            flexDirection: 'row',
                            gap: 5
                        }}>
                            <Text style={{
                                fontFamily: 'Comfortaa_400Regular',
                                color: '#ccc'
                            }}>More Details</Text>
                            <MaterialIcons name="arrow-forward-ios" size={24} color="#ccc" />
                        </View> */}
                    </View>

                    <View style={{
                        gap: 15
                    }}>
                        <WeatherForecastRow forecastData={forecastData?.forecastday[0]} day={"Today"} />
                        <WeatherForecastRow forecastData={forecastData?.forecastday[1]} day={forecastData?.forecastday[1].date} />
                        <WeatherForecastRow forecastData={forecastData?.forecastday[2]} day={forecastData?.forecastday[2].date} />
                    </View>

                    {/* <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 255, 255, .3)',
                            borderRadius: 20,
                            paddingVertical: 14
                        }}>
                        <Text style={{
                            fontFamily: 'Comfortaa_700Bold',
                            color: 'white',
                            fontSize: 18,
                            marginTop: -4
                        }}>Full forecast</Text>
                    </TouchableOpacity> */}
                </View>
            </View>

            <HourlyForecastBox forecastData={forecastData} />
            <MoreInfo weatherData={currentWeatherData} />

        </View>
    )
}

export default HomeScreen
