import { NavigationContainer } from '@react-navigation/native';
import React, { useRef, useContext } from 'react';
import { 
  SafeAreaView,
  Text, 
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';


import { COLORS, 
  SIZES, 
  icons, 
  images,
} from '../constants';
import { CartContext } from '../context/CartContext';
import * as Animatable from 'react-native-animatable';

const Account = ({ navigation }) => {
  const [cart, setCart] = useContext(CartContext);
  const numItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  function renderHeader() {
    return (
      <View style={{ 
          flexDirection: 'row', 
          height: 100,
          backgroundColor: COLORS.primary,
          marginTop: -50,
        }}
      >
        <View
          style={{
            width: 50,
            paddingLeft: SIZES.padding *2,
            justifyContent: 'center',
          }}
        >
            
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
                      style={{ 
                        width: 200, 
                        height: SIZES.largeTitle,
                        marginTop: 50
                      }}
                      resizeMode="contain"
                      source={images.tonysBanner}
                  />
          </View>

        <TouchableOpacity
          style={{
            width: 50,
            //justifyContent: 'center',
            paddingRight: SIZES.padding *2,
            marginTop: 30,
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate("Cart",{ orderItem: {} })}
        >
          {renderCartIcon()}
        </TouchableOpacity>

      </View>
    )
  }


  function renderCartIcon() {
    if (cart.length > 0) {
      return (<>
        <Image 
              source={icons.shoppingCart}
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,
                tintColor: COLORS.darkBlue,
              }}
            />
        

          
            <Animatable.View style={{
              backgroundColor: COLORS.pink,
              width: 20,
              height: 20,
              marginTop: 0,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -43,
              marginLeft: 20,
            }}
            animation='bounceIn'
            duration={1500}
            >
              <Text style={{
                color: COLORS.white,
              }}> {numItems} </Text>
            </Animatable.View>
        </>
      )
    } else {

      return (
        <Image 
          source={icons.shoppingCart}
          resizeMode="contain"
          style={{
            width: 35,
            height: 35,
            tintColor: COLORS.darkBlue,
            marginTop: 17,
          }}
        />
      )

    }
  }


    return (
      <SafeAreaView style={{
          backgroundColor: 'white',
          height: SIZES.height,
        }}
      >
        <SafeAreaView>
          {renderHeader()}
        </SafeAreaView>
        <TouchableOpacity style={{
          paddingTop: SIZES.height*0.5-100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
          onPress={() => navigation.navigate('Login', {})}
        >
          <Text style={{
            fontSize: 20,
          }}> Login </Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

export default Account;