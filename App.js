import { StatusBar } from 'expo-status-bar';
import React, {useContext} from 'react';
import { Image, View, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Tabs from './navigation/tabs';

import { Home, Menu, Account, Deals, Food, Cart, Login } from './screens';
import { COLORS, images, SIZES } from './constants';
import { CartProvider } from './context/CartContext';


import { AuthProvider } from './context/AuthContext';

const Stack = createStackNavigator();

const App = () => {

  

  return (
    <AuthProvider>
      <CartProvider>
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
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  )
}

export default App;