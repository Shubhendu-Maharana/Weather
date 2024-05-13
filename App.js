import React, { useCallback, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import Test from './screens/Test';
import * as Location from 'expo-location';

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
        const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${position}&days=6&aqi=yes&alerts=yes`;
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
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Test currentWeatherData={currentWeatherData} forecastData={forecastData} />
      </ScrollView>
    </SafeAreaView>
  );
}
