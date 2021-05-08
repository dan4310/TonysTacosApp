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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firebase from '../firebase';

const EditInfo = ({navigation, route}) => {
    const [infoType, setInfoType] = React.useState('');
    const [info, setInfo] = React.useState('');
    const [icon, setIcon] = React.useState('');
    const {user, resetPassword, isReset}  = React.useContext(AuthContext);
    const [newInfo, setNewInfo] = React.useState('');

    React.useEffect(() => {
        setInfoType(route.params.infoType);
        setInfo(route.params.info);
        setIcon(() => {
            switch(infoType) {
                case 'Account Name':
                    return 'user-o';
                case 'Phone Number':
                    return 'phone';
                case 'Email':
                    return 'mail';
            }
        })
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
                    <Text style={styles.title}>Edit your {infoType.toLowerCase()}.</Text>
                </View>

                <View style={{
                    padding: 5,
                    paddingTop: 10,
                    paddingBottom: 20,
                }}>
                    <Text style={styles.details}>Change your {infoType.toLowerCase()} save changes or leave it as is and go back.</Text>
                </View>

                <View style={{
                    backgroundColor: COLORS.secondary,
                    padding: 5,
                    marginLeft: 5,
                    marginTop: 10,
                    marginBottom: 5,
                }}>
                    <Text style={styles.text}>{infoType}</Text>
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
                    {icon === 'user-o' ?
                        <FontAwesome 
                            name='user-o'
                            color={COLORS.primary}
                            size={20}
                        />
                        :
                        <Feather 
                            name={icon}
                            color={COLORS.primary}
                            size={20}
                        />
                    }
                    
                    <TextInput 
                        placeholder='Enter your email'
                        autoCapitalize='none'
                        style={{...styles.details, 
                            flex: 1, 
                            fontSize: SIZES.body3,
                            paddingLeft: SIZES.padding,
                            
                        }}
                        placeholder={info}
                        textContentType="emailAddress"
                        onChangeText={(val) => setNewInfo(val)}
                    />
                    
                </View>

                
            </View>
        )
    }

    function onSaveChanges() {
          switch (infoType) {
                case "Account Name":
                    firebase.database().ref('users/'+user.uid).update({
                        name: newInfo,
                    }).then(() =>{
                        user.updateProfile({
                            displayName: newInfo,
                        }).then(toast.show('Profile updated!', {type: 'success'}))
                    })
                    break;
                case "Email":
                    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (re.test(newInfo)) {
                        user.updateEmail(newInfo).then(() => {
                            firebase.database().ref('users/'+user.uid).update({
                                email: newInfo,
                            }).then(toast.show('Profile updated!', {type: 'success'}))
                        }).catch((e) => {
                            switch (e.code) {
                                case 'auth/email-already-in-use':
                                    toast.show('Email already in use!', {type: 'danger'});
                                    break;
                                case 'auth/requires-recent-login':
                                    toast.show('Email already in use!', {type: 'danger'});
                                    break;
                                default:
                                    toast.show(e.code, {type: 'danger'});
                            }
                        })
                    } else {
                        toast.show("Invalid Email!", {type: 'danger'});
                    }
                    break;
                case 'Phone Number':
                    if (/^\d{10}$/.test(newInfo) || /\d{3}-\d{3}-\d{4}$/.test(newInfo)) {
                        firebase.database().ref('users/'+user.uid).update({
                            phone: /^\d{10}/.test(newInfo) ? newInfo.slice(0,3)+"-"+newInfo.slice(3,6)+"-"+newInfo.slice(6) : newInfo
                        }).then(toast.show('Profile updated!', {type: 'success'}))
                    } else {
                        toast.show('Invalid phone number!', {type: 'danger'});
                    }
                    break;
            
          }
          
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
                    onPress={() => onSaveChanges()}
                >
                    <Text style={styles.reset}>Save Changes</Text>
                </TouchableOpacity>
        </View>
        )
    }

    return (
        <SafeAreaView style={{
            backgroundColor: COLORS.white,
            height: SIZES.height,
        }}>
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

export default EditInfo;