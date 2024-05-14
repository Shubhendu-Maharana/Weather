import React from 'react';
import Test2 from "./Test2"
import { StatusBar, currentHeight, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFonts, Comfortaa_400Regular, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';
import WeatherForecastRow from './components/WeatherForecastRow';
import Test3 from './Test3';


const Test = ({ currentWeatherData, forecastData }) => {

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
                            }}>{currentWeatherData?.current.temp_c}&deg;</Text>
                        </View>
                        <View>
                            <Text style={{
                                fontFamily: 'Comfortaa_400Regular',
                                color: 'white',
                                fontSize: 20
                            }}>{forecastData?.forecastday[0].day.maxtemp_c}&deg;/{forecastData?.forecastday[0].day.mintemp_c}&deg;</Text>
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
                    backgroundColor: 'rgba(0, 0, 0, .25)',
                    paddingVertical: 20,
                    paddingHorizontal: 18,
                    borderRadius: 20,
                    gap: 20,
                    marginTop: 60
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 5
                        }}>
                            <MaterialIcons name="date-range" size={24} color="#ccc" />
                            <Text style={{
                                fontFamily: 'Comfortaa_400Regular',
                                color: '#ccc'
                            }}>5-day forecast</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            gap: 5
                        }}>
                            <Text style={{
                                fontFamily: 'Comfortaa_400Regular',
                                color: '#ccc'
                            }}>More Details</Text>
                            <MaterialIcons name="arrow-forward-ios" size={24} color="#ccc" />
                        </View>
                    </View>

                    <View style={{
                        gap: 15
                    }}>
                        <WeatherForecastRow forecastData={forecastData?.forecastday[0]} day={"Today"} />
                        <WeatherForecastRow forecastData={forecastData?.forecastday[1]} day={forecastData?.forecastday[1].date} />
                        <WeatherForecastRow forecastData={forecastData?.forecastday[2]} day={forecastData?.forecastday[2].date} />
                    </View>

                    <TouchableOpacity
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
                    </TouchableOpacity>
                </View>
            </View>

            <Test2 forecastData={forecastData} />
            <Test3 weatherData={currentWeatherData} />

        </View>
    )
}

export default Test
