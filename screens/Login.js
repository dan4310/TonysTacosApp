import React, { useRef, useContext } from 'react';
import { 
  SafeAreaView,
  Text, 
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';


import { 
  COLORS, 
  SIZES, 
  icons, 
  images,
} from '../constants';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';
import firebase from '../firebase';

const Login = ({ navigation }) => {
    const [isTyping, setIsTyping] = React.useState(0);
    const [isRegistering, setRegistering] = React.useState(0);
    const [bounceIn, setBounceIn] = React.useState(0);
    const {register, login, user, setUser} = useContext(AuthContext);

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        check_nameInputChange: false,
        check_numberInputChange: false,
        secureTextEntry: true,
    });

    const textInputChange = (val) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(val)) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    // reg data
    const [reg_data, setRegData] = React.useState({
        email: '',
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
        check_textInputChange: false,
        check_nameInputChange: false,
        check_phoneInputChange: false,
        secureTextEntry: true,
        confirmSecureTextEntry: true,
    });

    const reg_textInputChange = (val) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(val) != 0) {
            setRegData({
                ...reg_data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setRegData({
                ...reg_data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const reg_nameInputChange = (val) => {
        if (val.length != 0) {
            setRegData({
                ...reg_data,
                name: val,
                check_nameInputChange: true
            });
        } else {
            setRegData({
                ...reg_data,
                name: val,
                check_nameInputChange: false
            });
        }
    }

    const reg_phoneInputChange = (val) => {
        if (/^\d{10}$/.test(val) || /\d{3}-\d{3}-\d{4}$/.test(val)) {
            setRegData({
                ...reg_data,
                phone: /^\d{10}/.test(val) ? val.slice(0,3)+"-"+val.slice(3,6)+"-"+val.slice(6) : val,
                check_phoneInputChange: true
            });
        } else {
            setRegData({
                ...reg_data,
                phone: val,
                check_phoneInputChange: false
            });
        }
    }

    const reg_handlePasswordChange = (val) => {
        setRegData({
            ...reg_data,
            password: val,
        });
    }

    const reg_handleConfirmPasswordChange = (val) => {
        setRegData({
            ...reg_data,
            confirmPassword: val,
        });
    }

    const reg_updateSecureTextEntry = () => {
        setRegData({
            ...reg_data,
            secureTextEntry: !reg_data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setRegData({
            ...reg_data,
            confirmSecureTextEntry: !reg_data.confirmSecureTextEntry
        });
    }

    function errorAlert(message) {
        toast.show(message, {type: 'danger'})
    }

    function onRegister() {
        if (reg_data.password === reg_data.confirmPassword
            && reg_data.check_textInputChange && reg_data.check_nameInputChange
            && reg_data.check_phoneInputChange) {
              
            register(reg_data.email, reg_data.password, reg_data.name, reg_data.phone)
            .then(() => {
                if (firebase.auth().currentUser.email === reg_data.email) {
                    toast.show('Registered!', {type: 'success'})
                    //navigation.goBack();
                }
            })
            .catch((error) => {console.log(error)})
         } else {
            if (!reg_data.check_textInputChange) {
                errorAlert('Invalid email!');
            } else if (!reg_data.check_nameInputChange) {
                errorAlert('Must enter a name!')
            } else if (!reg_data.check_phoneInputChange) {
                errorAlert('Invalid phone number!')
            } else if (reg_data.password !== reg_data.confirmPassword) {
                errorAlert('Passwords do not match!')
            }
        }
        
    }

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
              onPress={() => {
                  //navigation.goBack()
                }}
            >
                
            </TouchableOpacity>


            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: SIZES.width/10,
                paddingLeft: SIZES.width/10,
            }}>
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

    function renderSplash() {
        return (
            <View style={styles.background}>
                <Animatable.View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -SIZES.width*1.3,
                }}
                animation='fadeInDownBig'
                >
                    <Image
                        style={{ 
                        height: SIZES.largeTitle*1.5,
                        }}
                        resizeMode="contain"
                        source={images.tonysBanner}
                    />
                    <Image
                        style={{ 
                        height: SIZES.largeTitle*1.2,
                        }}
                        resizeMode="contain"
                        source={icons.pepper}
                    />
                </Animatable.View>
            </View>
        )
    }

    function onLogin() {
        login(data.email, data.password)
        .catch((error) => console.log(error));
        setUser(firebase.auth().currentUser);
        Keyboard.dismiss();
        setIsTyping(0);
    }

    function renderLogIn() {
        return (
        <View style={{...styles.container, marginTop: -(isTyping == 0 ? (isRegistering == 0 ? SIZES.height*0.7 : SIZES.height*0.42) : SIZES.height*1.12)}}>
            
            <Animatable.View 
                style={{...styles.foreground}}
                animation={isTyping == 1 ? 'slideInUp' : ( bounceIn == 0 ? 'bounceInUp' : 'bounceOutDown')}
                duration={bounceIn == 0 ? 1000 : 375}
            >
                <View style={{
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    backgroundColor: COLORS.secondary,
                    width: SIZES.width,
                    paddingTop: SIZES.padding*1.5,
                }}>
                    <Text style={{ ...styles.title, paddingLeft: SIZES.padding*1.5 }}>Sign in with your account!</Text>
                    <Text style={{ ...styles.details, paddingLeft: SIZES.padding*1.5, paddingBottom: SIZES.padding }}>Enter your account info</Text>
                </View>


                <View style={{
                    width: SIZES.width*0.85,
                    justifyContent: 'left',
                    alignItems: 'left',
                }}>
                    <View style={{
                        backgroundColor: COLORS.secondary,
                        padding: 5,
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
                        paddingBottom: 5,
                        paddingTop: 5,
                    }}
                    >
                        <FontAwesome 
                            name='user-o'
                            color={COLORS.primary}
                            size={20}
                        />
                        <TextInput 
                            placeholder='Enter an email'
                            autoCapitalize='none'
                            style={{...styles.details, 
                                flex: 1, 
                                fontSize: SIZES.body4,
                                paddingLeft: SIZES.padding,
                                
                            }}
                            textContentType="emailAddress"
                            onChangeText={(val) => textInputChange(val)}
                            onFocus={() => setIsTyping(1)}
                            onSubmitEditing={() => setIsTyping(0)}
                        />
                        {data.check_textInputChange ?
                        <Animatable.View
                            animation='bounceIn'
                        >
                            <Feather 
                                name='check-circle'
                                color={COLORS.secondary}
                                size={20}
                            />
                        </Animatable.View>
                        : null
                        }
                        
                    </View>
                </View>

                <View style={{
                    width: SIZES.width*0.85,
                    justifyContent: 'left',
                    alignItems: 'left',
                }}>
                    <View style={{
                        backgroundColor: COLORS.secondary,
                        padding: 5,
                        marginTop: 10,
                        marginBottom: 5,
                    }}>
                        <Text style={styles.text}>Password</Text>
                    </View>
                    
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.primary,
                        paddingBottom: 5,
                        paddingTop: 5,
                    }}
                    >
                        <Feather 
                            name='lock'
                            color={COLORS.primary}
                            size={20}
                        />

                        <TextInput 
                            placeholder='Enter a password'
                            style={{...styles.details, 
                                flex: 1, 
                                fontSize: SIZES.body4,
                                paddingLeft: SIZES.padding,
                            }}
                            textContentType="password"
                            secureTextEntry={data.secureTextEntry}
                            onFocus={() => setIsTyping(1)}
                            onSubmitEditing={() => setIsTyping(0)}
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={() => updateSecureTextEntry()}
                        >
                            {data.secureTextEntry ?
                                <Feather 
                                    name='eye-off'
                                    color={COLORS.primary}
                                    size={20}
                                />
                            :
                                <Feather 
                                    name='eye'
                                    color={COLORS.primary}
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: SIZES.padding,
                    flexDirection: 'row',
                }}>
                    <View style={{flex: 1, paddingRight: 10,}}>
                        <TouchableOpacity style={{
                                padding: SIZES.padding,
                                //backgroundColor: COLORS.secondary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                            }}
                            onPress={() => {
                                Keyboard.dismiss();
                                setRegistering(1);
                                setIsTyping(0);
                                setBounceIn(1);
                            }}
                        >
                            <Text style={styles.register}> Register </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, paddingRight: 10,}}>
                        <TouchableOpacity style={{
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                            }} 
                            onPress={() => onLogin()}
                        >
                            <Text style={styles.login}> Sign In </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{paddingTop: 10}}>
                    <TouchableOpacity style={{
                            //padding: SIZES.padding,
                            //backgroundColor: COLORS.secondary,
                            alignItems: 'center',
                            //borderRadius: SIZES.radius,
                        }} 
                        onPress={() => navigation.navigate("ForgotPassword")}
                    >
                        <Text style={{...styles.register, fontSize: SIZES.h6, fontWeight: SIZES.w4}}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>

            </Animatable.View>
        </View>
        )
    }

    function renderRegister() {
        return (
            <View style={{...styles.container, marginTop: -SIZES.height*1.12}}>
            
            <Animatable.View 
                style={styles.foreground}
                animation={bounceIn == 1 ? 'bounceInUp' : 'bounceOutDown'}
            >
                <View style={{
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    backgroundColor: COLORS.secondary,
                    width: SIZES.width,
                    paddingTop: SIZES.padding*1.5,
                }}>
                    <Text style={{ ...styles.title, paddingLeft: SIZES.padding*1.5 }}>Stay connected with Tony's Tacos!</Text>
                    <Text style={{ ...styles.details, paddingLeft: SIZES.padding*1.5, paddingBottom: SIZES.padding }}>Create an account</Text>
                </View>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={SIZES.height*0.12}
                    behavior="padding"
                    enabled={true}
                >
                <Animated.ScrollView
                    showsVerticalScrollIndicator="false"
                >

                <View style={{
                    width: SIZES.width*0.85,
                    justifyContent: 'left',
                    alignItems: 'left',
                }}>
                    <View style={{
                        backgroundColor: COLORS.secondary,
                        padding: 5,
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
                        paddingBottom: 5,
                        paddingTop: 5,
                    }}
                    >
                        <Feather 
                            name='mail'
                            color={COLORS.primary}
                            size={20}
                        />
                        <TextInput 
                            placeholder='Enter an email'
                            autoCapitalize='none'
                            style={{...styles.details, 
                                flex: 1, 
                                fontSize: SIZES.body4,
                                paddingLeft: SIZES.padding,
                                
                            }}
                            textContentType="emailAddress"
                            onChangeText={(val) => reg_textInputChange(val)}
                        />
                        {reg_data.check_textInputChange ?
                        <Animatable.View
                            animation='bounceIn'
                        >
                            <Feather 
                                name='check-circle'
                                color={COLORS.secondary}
                                size={20}
                            />
                        </Animatable.View>
                        : null
                        }
                        
                    </View>
                </View>

                <View style={{
                    width: SIZES.width*0.85,
                    justifyContent: 'left',
                    alignItems: 'left',
                }}>
                    <View style={{
                        backgroundColor: COLORS.secondary,
                        padding: 5,
                        marginTop: 10,
                        marginBottom: 5,
                    }}>
                        <Text style={styles.text}>Name</Text>
                    </View>
                    
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.primary,
                        paddingBottom: 5,
                        paddingTop: 5,
                    }}
                    >
                        <FontAwesome 
                            name='user-o'
                            color={COLORS.primary}
                            size={20}
                        />
                        <TextInput 
                            placeholder='Enter your name'
                            autoCapitalize='none'
                            textContentType="givenName"
                            style={{...styles.details, 
                                flex: 1, 
                                fontSize: SIZES.body4,
                                paddingLeft: SIZES.padding,
                                
                            }}
                            secureTextEntry={false}
                            onChangeText={(val) => reg_nameInputChange(val)}
                        />
                        {reg_data.check_nameInputChange ?
                        <Animatable.View
                            animation='bounceIn'
                        >
                            <Feather 
                                name='check-circle'
                                color={COLORS.secondary}
                                size={20}
                            />
                        </Animatable.View>
                        : null
                        }
                        
                    </View>
                </View>

                <View style={{
                    width: SIZES.width*0.85,
                    justifyContent: 'left',
                    alignItems: 'left',
                }}>
                    <View style={{
                        backgroundColor: COLORS.secondary,
                        padding: 5,
                        marginTop: 10,
                        marginBottom: 5,
                    }}>
                        <Text style={styles.text}>Phone Number</Text>
                    </View>
                    
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.primary,
                        paddingBottom: 5,
                        paddingTop: 5,
                    }}
                    >
                        <Feather 
                            name='phone'
                            color={COLORS.primary}
                            size={20}
                        />
                        <TextInput 
                            placeholder='Enter a phone number'
                            autoCapitalize='none'
                            textContentType="telephoneNumber"
                            style={{...styles.details, 
                                flex: 1, 
                                fontSize: SIZES.body4,
                                paddingLeft: SIZES.padding,
                                
                            }}
                            onChangeText={(val) => reg_phoneInputChange(val)}
                        />
                        {reg_data.check_phoneInputChange ?
                        <Animatable.View
                            animation='bounceIn'
                        >
                            <Feather 
                                name='check-circle'
                                color={COLORS.secondary}
                                size={20}
                            />
                        </Animatable.View>
                        : null
                        }
                        
                    </View>
                </View>

                <View style={{
                    width: SIZES.width*0.85,
                    justifyContent: 'left',
                    alignItems: 'left',
                }}>
                    <View style={{
                        backgroundColor: COLORS.secondary,
                        padding: 5,
                        marginTop: 10,
                        marginBottom: 5,
                    }}>
                        <Text style={styles.text}>Password</Text>
                    </View>
                    
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.primary,
                        paddingBottom: 5,
                        paddingTop: 5,
                    }}
                    >
                        <Feather 
                            name='lock'
                            color={COLORS.primary}
                            size={20}
                        />

                        <TextInput 
                            placeholder='Enter a password'
                            style={{...styles.details, 
                                flex: 1, 
                                fontSize: SIZES.body4,
                                paddingLeft: SIZES.padding,
                            }}
                            textContentType="newPassword"
                            secureTextEntry={reg_data.secureTextEntry}
                            onChangeText={(val) => reg_handlePasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={() => reg_updateSecureTextEntry()}
                        >
                            {reg_data.secureTextEntry ?
                                <Feather 
                                    name='eye-off'
                                    color={COLORS.primary}
                                    size={20}
                                />
                            :
                                <Feather 
                                    name='eye'
                                    color={COLORS.primary}
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    
                </View>

                <View style={{
                    width: SIZES.width*0.85,
                    justifyContent: 'left',
                    alignItems: 'left',
                }}>
                    <View style={{
                        backgroundColor: COLORS.secondary,
                        padding: 5,
                        marginTop: 10,
                        marginBottom: 5,
                    }}>
                        <Text style={styles.text}>Confirm Password</Text>
                    </View>
                    
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.primary,
                        paddingBottom: 5,
                        paddingTop: 5,
                    }}
                    >
                        <Feather 
                            name='lock'
                            color={COLORS.primary}
                            size={20}
                        />

                        <TextInput 
                            placeholder='Confirm your password'
                            style={{...styles.details, 
                                flex: 1, 
                                fontSize: SIZES.body4,
                                paddingLeft: SIZES.padding,
                            }}
                            textContentType="newPassword"
                            secureTextEntry={reg_data.confirmSecureTextEntry}
                            onChangeText={(val) => reg_handleConfirmPasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={() => updateConfirmSecureTextEntry()}
                        >
                            {reg_data.confirmSecureTextEntry ?
                                <Feather 
                                    name='eye-off'
                                    color={COLORS.primary}
                                    size={20}
                                />
                            :
                                <Feather 
                                    name='eye'
                                    color={COLORS.primary}
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: SIZES.padding,
                    flexDirection: 'row',
                }}>
                    <View style={{flex: 1, paddingRight: 10,}}>
                        <TouchableOpacity style={{
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                            }}
                            onPress={() => {
                                Keyboard.dismiss();
                                onRegister();
                            }}
                        >
                            <Text style={styles.login}> Register </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, paddingRight: 10,}}>
                        <TouchableOpacity style={{
                                padding: SIZES.padding,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                            }}
                            onPress={() => {
                                Keyboard.dismiss();
                                setBounceIn(0);
                                setRegistering(0);
                            }}
                        >
                            <Text style={styles.register}> Sign In </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </Animated.ScrollView>
                </KeyboardAvoidingView>

            </Animatable.View>
        </View>
        )
    }

    function renderBoth() {
        return (
            
            
            <View>
                {renderRegister()}
                {renderLogIn()}
            </View>
            
            
        )
        
      }

    
    return (
      <SafeAreaView style={{
          backgroundColor: COLORS.white,
          height: SIZES.height+100,
      }}>     
            <SafeAreaView>
                {renderHeader()}
            </SafeAreaView>       
            
        
            <SafeAreaView style={{
                 height: SIZES.height+100,
              }}>
                {renderSplash()}
            </SafeAreaView>

            <SafeAreaView style={{
                
                //backgroundColor: COLORS.primary,
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
              }}>
                {isRegistering == 0 ? renderLogIn() : renderRegister()}
            </SafeAreaView>
            
      </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    foreground: {
        alignItems: 'center',
        backgroundColor: COLORS.white,
        height: SIZES.height,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: -100,
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
    details: {
        color: COLORS.darkBlue,
        fontSize: SIZES.body6,
        fontWeight: SIZES.w4,
        shadowColor: COLORS.white,
        shadowOffset: {
          width: -2,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
    },
    login: {
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
    register: {
        color: COLORS.darkBlue, 
        fontSize: SIZES.h4,
        fontWeight: SIZES.w3,
        padding: 3,
        shadowColor: COLORS.white,
        shadowOffset: {
          width: -2,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 1
    },
    text: {
        color: COLORS.darkBlue, 
        fontSize: SIZES.body3,
        fontWeight: SIZES.w3,
        shadowColor: COLORS.white,
        shadowOffset: {
          width: -2,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 1
    },
});

export default Login;