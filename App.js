import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts, Comfortaa_400Regular, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';
import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

export default function App() {
  const [cityName, setCityName] = useState('New Delhi');
  const [refreshing, setRefreshing] = useState(false);
  const [currentWeatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [error, setError] = useState(null);
  const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
  var n = '';

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=6`;
        const res = await fetch(API_URL);
        if (!res.ok) {  // Check if the response is not ok
          throw new Error('City not found');
        }
        const data = await res.json();
        setWeatherData(data);
        setForecastData(data.forecast);

        const currentTemp = data.current?.temp_c;
        const iconUrl = data.current?.condition?.icon;

        if (cityName && currentTemp && iconUrl) {
          await updateSearchHistory({ city: data.location?.name, temp: currentTemp, icon: iconUrl });
        }
        setError(null);

      } catch (error) {
        console.error(error);
        setError('City doesn\'t exist');
      }
    }
    getWeatherData();
  }, [refreshing, cityName]);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('searchHistory');
        if (history) {
          setSearchHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSearchHistory();
  }, []);

  const updateSearchHistory = async (newEntry) => {
    try {
      let history = [newEntry, ...searchHistory];
      history = history.filter((item, index) =>
        item.city && item.temp && item.icon &&
        history.findIndex(h => h.city === item.city) === index
      ).slice(0, 10);
      setSearchHistory(history);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
    } catch (error) {
      console.error(error);
    }
  };

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem('searchHistory');
      setSearchHistory([]);
    } catch (error) {
      console.error(error);
    }
  };

  const [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Comfortaa_700Bold
  });

  if (!fontsLoaded) return null;

  function CustomDrawerContent() {
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = async () => {
      if (searchInput.trim()) {
        setCityName(searchInput.trim());
        await updateSearchHistory({ city: searchInput.trim(), temp: '', icon: '' });
      }
    };

    const handleRowPress = async (city) => {
      setCityName(city);
    };

    return (
      <DrawerContentScrollView>
        <View className='px-4 py-6'>
          <View className='flex-row items-center justify-between pr-2 gap-5'>
            <TextInput
              value={searchInput}
              onChangeText={setSearchInput}
              onEndEditing={handleSearch}
              className="border-[1.5px] px-3 py-2 rounded-full text-xl font-extrabold flex-1"
              placeholder="Search City"
            />
            <TouchableOpacity onPress={handleSearch}>
              <FontAwesome6 name="magnifying-glass" size={30} color="black" />
            </TouchableOpacity>
          </View>
          {error && <Text className='text-red-500 mt-1' style={styles.ComfortaaRegular}>{error}</Text>}

          <View className='py-5'>
            <View className='gap-3'>
              {searchHistory.map((entry, index) => (
                entry.city && entry.temp && entry.icon ? (
                  <TouchableOpacity key={index} onPress={() => handleRowPress(entry.city)}>
                    <View key={index} className='flex-row bg-[#fffb] py-2 px-3 rounded-full items-center'>
                      <Text className='text-lg flex-1' style={styles.ComfortaaRegular}>{entry.city}</Text>
                      <Image
                        source={{
                          uri: `https:${entry.icon}`,
                        }}
                        className='w-8 h-full mr-3'
                      />
                      <Text className='text-lg' style={styles.ComfortaaRegular}>{Math.round(entry.temp)}&deg;</Text>
                    </View>
                  </TouchableOpacity>
                ) : null
              ))}
            </View>
          </View>
          <TouchableOpacity onPress={clearSearchHistory}>
            <Text className='text-md text-right mr-2' style={styles.ComfortaaRegular}>Clear history</Text>
          </TouchableOpacity>
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

const styles = StyleSheet.create({
  ComfortaaBold: {
    fontFamily: 'Comfortaa_700Bold'
  },
  ComfortaaRegular: {
    fontFamily: 'Comfortaa_400Regular'
  },
});