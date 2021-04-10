import React from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';
import { createBottomTabNavigator, ButtonTabBar } from '@react-navigation/bottom-tabs';

import {Home, Menu, Account, Deals} from "../screens";

import { COLORS, icons, SIZES } from "../constants";
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();


const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                labelStyle: {
                    color: COLORS.white,
                },
                style: {
                    backgroundColor: COLORS.primary,
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: SIZES.padding}}>
                            <Image
                                source={icons.house}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.pink : COLORS.darkBlue,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            /> 
                            <Text 
                                style={{
                                    justifyContent: 'center',
                                    color: focused ? COLORS.pink : COLORS.darkBlue,
                                    fontWeight: focused ? '800' : '300',
                                    fontSize: SIZES.body5,
                                    paddingTop: 2,
                                }}
                            >
                                Home
                            </Text>
                        </View>
                    )
                }}    
            >
            </Tab.Screen>

            <Tab.Screen
                name="Menu"
                component={Menu}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: SIZES.padding}}>
                            <Image
                                source={icons.taco}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.pink : COLORS.darkBlue,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            /> 
                            <Text 
                                style={{
                                    justifyContent: 'center',
                                    color: focused ? COLORS.pink : COLORS.darkBlue,
                                    fontWeight: focused ? '800' : '300',
                                    fontSize: SIZES.body5,
                                    paddingTop: 2,
                                }}
                            >
                                Order
                            </Text>
                        </View>
                    )
                }}    
            >
            </Tab.Screen>

            <Tab.Screen
                name="Deals"
                component={Deals}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: SIZES.padding}}>
                            <Image
                                source={icons.tag}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.pink : COLORS.darkBlue,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            /> 
                            <Text 
                                style={{
                                    justifyContent: 'center',
                                    color: focused ? COLORS.pink : COLORS.darkBlue,
                                    fontWeight: focused ? '800' : '300',
                                    fontSize: SIZES.body5,
                                    paddingTop: 2,
                                }}
                            >
                                Deals
                            </Text>
                        </View>
                    )
                }}    
            >
            </Tab.Screen>

            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: SIZES.padding}}>
                            <Image
                                source={icons.user}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.pink : COLORS.darkBlue,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            /> 
                            <Text 
                                style={{
                                    justifyContent: 'center',
                                    color: focused ? COLORS.pink : COLORS.darkBlue,
                                    fontWeight: focused ? '800' : '300',
                                    fontSize: SIZES.body5,
                                    paddingTop: 2,
                                }}
                            >
                                Account
                            </Text>
                        </View>
                    )
                }}    
            >
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default Tabs;