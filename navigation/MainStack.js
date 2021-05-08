import React from 'react';
import { Food, Cart, EditInfo} from '../screens';
import Tabs from './tabs';
import { createStackNavigator } from '@react-navigation/stack';

const MainStack = () => {
    const Stack = createStackNavigator();
    
        return (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false          
                    }}
                    initialRouteName={"Home"}
                > 
                    <Stack.Screen name="Home" component={Tabs} />
                    <Stack.Screen name="Food" component={Food} />
                    <Stack.Screen name="Cart" component={Cart} />
                    <Stack.Screen name="EditInfo" component={EditInfo} />
                </Stack.Navigator>

        )
    
    
}

export default MainStack;