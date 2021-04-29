import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

export default CartIcon = () => {
    return (
        <View style={{
            justifyContent: 'left',
            alignItems: 'center',
            flexDirection: 'column',
            height: 400,
        }}>
            <Text>items in cart : 0</Text>
            <Text>total price in cart : 0</Text>
        </View>
    )
}