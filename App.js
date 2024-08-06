import React, { useState } from 'react';
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
  const [text, setText] = useState('');
  const [cityName, setCityName] = useState('');

  function CustomDrawerContent({ navigation }) {
    return (
      <DrawerContentScrollView>
        <View className='px-4 py-6'>
          <View className='flex-row items-center justify-between pr-2 gap-5'>
            <TextInput
              onChangeText={() => setText()}
              value={text}
              className="border-[1.5px] px-3 py-2 rounded-full text-xl font-extrabold flex-1"
              placeholder="Search City"
            />
            <TouchableOpacity onPress={() => setCityName(text)}>
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
          children={() => <HomeScreen city={cityName || "New Delhi"} />}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
