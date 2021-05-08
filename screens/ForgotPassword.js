import React from 'react';
import { 
    View, 
    Image ,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Text,
    StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {icons, COLORS, SIZES, images} from '../constants';
import {AuthContext} from '../context/AuthContext';

const ForgotPassword = ({navigation}) => {
    const {user, resetPassword, isReset}  = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('');

    function renderHeader() {
        return (
        <View style={{ 
              flexDirection: 'row',
              height: 100,
              backgroundColor: COLORS.primary,
              marginTop: -50,
            }}
        >
            <TouchableOpacity
              style={{
                width: 50,
                paddingLeft: SIZES.padding *2,
                justifyContent: 'center',
                flex: 1,
              }}
              onPress={() => navigation.goBack()}
            >
                <Image 
                  source={icons.arrow}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: COLORS.darkBlue,
                    marginTop: 50
                  }}
                />
            </TouchableOpacity>


            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: SIZES.width/10,
                paddingLeft: SIZES.width/10,
            }}>
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
                justifyContent: 'center',
                alignItems: 'right',
              }}
            >
                
            </TouchableOpacity>
    
        </View>
        )
    }

    function renderForm() {
        return (
            <View style={{
                width: SIZES.width*0.85,
                //justifyContent: 'left',
                alignItems: 'left',
                marginLeft: 5,
                flexDirection: 'column',
            }}>
                <View style={{
                    padding: 5,
                    paddingTop: 10,
                }}>
                    <Text style={styles.title}>Forgot your password?</Text>
                </View>

                <View style={{
                    padding: 5,
                    paddingTop: 10,
                    paddingBottom: 20,
                }}>
                    <Text style={styles.details}>Enter your email address and we'll tell you how to reset your password.</Text>
                </View>

                <View style={{
                    backgroundColor: COLORS.secondary,
                    padding: 5,
                    marginLeft: 5,
                    marginTop: 10,
                    marginBottom: 5,
                }}>
                    <Text style={styles.text}>Email</Text>
                </View>
                
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.primary,
                    padding: 5,
                    paddingTop: 10,
                    marginLeft: 5,
                }}
                >
                    <Feather 
                        name='mail'
                        color={COLORS.primary}
                        size={20}
                    />
                    <TextInput 
                        placeholder='Enter your email'
                        autoCapitalize='none'
                        style={{...styles.details, 
                            flex: 1, 
                            fontSize: SIZES.body3,
                            paddingLeft: SIZES.padding,
                            
                        }}
                        textContentType="emailAddress"
                        onChangeText={(val) => setEmail(val)}
                    />
                    
                </View>

                
            </View>
        )
    }

    function onResetPassword() {
        resetPassword(email);  
    }

    function renderButton() {
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 30,
            }}>
                <TouchableOpacity style={{
                        padding: SIZES.padding,
                        backgroundColor: COLORS.primary,                        
                        borderRadius: SIZES.radius,
                    }} 
                    onPress={() => onResetPassword()}
                >
                    <Text style={styles.reset}>Reset Password</Text>
                </TouchableOpacity>
        </View>
        )
    }

    return (
        <SafeAreaView>
            {renderHeader()}
            {renderForm()}
            {renderButton()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    details: {
        color: COLORS.darkBlue,
        fontSize: SIZES.body4,
        fontWeight: SIZES.w4,
        shadowColor: COLORS.white,
        shadowOffset: {
          width: -2,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
    },
    text: {
        color: COLORS.darkBlue, 
        fontSize: SIZES.body2,
        fontWeight: SIZES.w3,
        shadowColor: COLORS.white,
        shadowOffset: {
          width: -2,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 1
    },
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
      reset: {
        color: COLORS.white, 
        fontSize: SIZES.h4,
        fontWeight: SIZES.w3,
        padding: 3,
        shadowColor: COLORS.pink,
        shadowOffset: {
          width: -2,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 1
      },
})

export default ForgotPassword;