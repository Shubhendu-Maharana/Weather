import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Drawer = createDrawerNavigator();

export default function App() {
  const [cityName, setCityName] = useState('New Delhi');
  const [refreshing, setRefreshing] = useState(false);
  const [currentWeatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const API_KEY = "12ff0dc2354044f397f112153241801"
  var n = ''

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=6`;
        const res = await fetch(API_URL);
        const data = await res.json();
        setWeatherData(data);
        setForecastData(data.forecast);
      } catch (error) {
        console.error(error);;
      }
    }
    getWeatherData();
  }, [refreshing, cityName]);

  function CustomDrawerContent() {
    return (
      <DrawerContentScrollView>
        <View className='px-4 py-6'>
          <View className='flex-row items-center justify-between pr-2 gap-5'>
            <TextInput
              onChangeText={(val) => n = val}
              onEndEditing={() => setCityName(n)}
              className="border-[1.5px] px-3 py-2 rounded-full text-xl font-extrabold flex-1"
              placeholder="Search City"
            />
            <TouchableOpacity onPress={() => setCityName(n)}>
              <FontAwesome6 name="magnifying-glass" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar translucent={true} style='light' />
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: 'skyblue',
            width: "80%",
          },
        }}
      >
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Home"
          children={() => <HomeScreen setCityName={setCityName} refreshing={refreshing} setRefreshing={setRefreshing} currentWeatherData={currentWeatherData} forecastData={forecastData} />}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
