import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Login, ForgotPassword} from '../screens';

const AuthStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false          
            }}
            initialRouteName={"Login"}
        > 
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    )
}

export default AuthStack;