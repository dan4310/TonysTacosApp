import { NavigationContainer, useIsFocused, useFocusEffect } from '@react-navigation/native';
import React, { useRef, useContext } from 'react';
import { 
  SafeAreaView,
  Text, 
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';


import { COLORS, 
  SIZES, 
  icons, 
  images,
} from '../constants';
import { CartContext } from '../context/CartContext';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import firebase from '../firebase'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import * as Animatable from 'react-native-animatable';

const Account = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [cart, setCart] = useContext(CartContext);
  const {user, setUser, logout} = useContext(AuthContext);
  const numItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const [phone, setPhone] = React.useState(null);

  React.useEffect(() => {
    if (user) {
      firebase.database().ref('users/'+user.uid+'/phone').on('value', function(snap) {
        setPhone(snap.val());
      });
    }
  })

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

  function onLogout() {
    logout();
    setUser(null);
  }
  function renderInfoIcon(sec) {
    switch (sec) {
      case 'Account Name':
        return (
          <FontAwesome 
            name='user-o'
            color={COLORS.white}
            size={20}
          />
        )
      case 'Email':
        return (
          <Feather 
            name='mail'
            color={COLORS.white}
            size={20}
          />
        )
      case 'Phone Number':
        return (
          <Feather 
            name='phone'
            color={COLORS.white}
            size={20}
          />
        )
        
    }
  }

  function renderInfo(section, info) {
    return (<>
      <View style={{
        paddingTop: 20,
      }}>
        <Text style={{...styles.title, fontSize: SIZES.h3, fontWeight: SIZES.w2, paddingLeft: 5}}>
          {section}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onPressedInfo(section, info)}
      >
        <View style={{
          marginTop: 5,
          backgroundColor: COLORS.secondary,
          marginLeft: 2,
          width: SIZES.width*0.95,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 5,
        }}>
          {renderInfoIcon(section)}
          <Text style={{...styles.info, padding: 10}}>
            {info}
          </Text>
        </View>
      </TouchableOpacity>
    </>)
  }

  function onPressedInfo(section, info) {
    navigation.navigate('EditInfo', {infoType: section, info: info})
  }

  function renderAccountInfo() {
      return (
        <View style={{
          flexDirection: 'column',
        }}>
          <Text style={{...styles.title, padding: 5, paddingBottom: 0}}>Your Profile</Text>
        
          
        
            <TouchableOpacity
              onPress={() => onLogout()}
            >
            <Text style={{...styles.desc, paddingLeft: 5}}>
              Sign Out
            </Text>
          </TouchableOpacity>
          {renderInfo('Account Name', user.displayName)}
          {renderInfo('Email', user.email)}
          {renderInfo('Phone Number', phone)}
        </View>
      )
  
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
          {renderAccountInfo()}
      </SafeAreaView>
    )
  
}

const styles = StyleSheet.create({
  title: {
    color: COLORS.pink, 
    fontSize: SIZES.h1,
    fontWeight: SIZES.w1,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 2,
      height: -2,
    },
    shadowOpacity: 1,
    shadowRadius: 1
  },
  desc: {
    color: COLORS.darkBlue,
    fontSize: SIZES.h4,
    fontWeight: SIZES.w5,
    shadowColor: COLORS.white,
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  info: {
    color: COLORS.white,
    fontSize: SIZES.h4,
    fontWeight: SIZES.w5,
    shadowColor: COLORS.pink,
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  }
})

export default Account;