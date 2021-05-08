import { StatusBar } from 'expo-status-bar';
import React, {useContext} from 'react';
import { Image, View, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Tabs from './navigation/tabs';

import { Home, Menu, Account, Deals, Food, Cart, Login } from './screens';
import {COLORS} from './constants';
import { CartProvider } from './context/CartContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Routes from './navigation/Routes';
import Toast from 'react-native-fast-toast';

import { AuthProvider } from './context/AuthContext';

const App = () => {
 
  return (
    <AuthProvider>
      <CartProvider>
        <Routes/>
        <Toast 
          ref={(ref) => global['toast'] = ref}
          placement='top'
          dangerColor={COLORS.pink}
          dangerIcon={
            <FontAwesome 
              name='warning'
              color={COLORS.white}
              size={20}
            />}
          successColor={COLORS.secondary}
          successIcon={
            <FontAwesome 
              name='check'
              color={COLORS.white}
              size={20}
            />}
        />
      </CartProvider>
    </AuthProvider>
    
  )
}

export default App;