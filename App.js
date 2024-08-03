import React, { useCallback, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import * as Location from 'expo-location';
import HomeScreen from './screens/HomeScreen';

const PRIMARY_COLOR = "blue";

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [currentWeatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const API_KEY = "12ff0dc2354044f397f112153241801"

  useEffect(() => {
    const getWeatherData = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'denied') {
        status = await Location.requestForegroundPermissionsAsync();
      }
      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        const position = `${currentLocation.coords.latitude},${currentLocation.coords.longitude}`;
        const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${position}&days=6`;
        const res = await fetch(API_URL);
        const data = await res.json();
        setWeatherData(data);
        setForecastData(data.forecast);
      } catch (error) {
        console.error(error);;
      }
    }
    getWeatherData();
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
      <StatusBar translucent={false} style='light' backgroundColor={PRIMARY_COLOR} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HomeScreen currentWeatherData={currentWeatherData} forecastData={forecastData} />

      </ScrollView>
    </SafeAreaView>
  );
}
