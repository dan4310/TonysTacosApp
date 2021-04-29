import React from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';
import { createBottomTabNavigator, ButtonTabBar } from '@react-navigation/bottom-tabs';

import {Home, Menu, Account, Deals} from "../screens";

import { COLORS, icons, SIZES } from "../constants";
import {AuthContext} from '../context/AuthContext';
import firebase from '../firebase';

const Tab = createBottomTabNavigator();


const Tabs = () => {

    const {logout} = React.useContext(AuthContext);

    React.useEffect(() => {
        logout();
    }, [])
 
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
                            
                        </View>
                    )
                }}    
            >
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default Tabs;

/*
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
/Text>
*/