import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Tabs from './navigation/tabs';

import { Home, Menu, Account, Deals, Food, Cart } from './screens';
import { COLORS, images, SIZES } from './constants';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
            headerShown: false          
        }}
        initialRouteName={"Home"}
      > 
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Food" component={Food} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;