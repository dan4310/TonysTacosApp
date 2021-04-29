import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import React, {useRef, useState, useContext} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Alert,
} from 'react-native';
import {icons, images, COLORS, SIZES, categories, foodList, storeList } from '../constants';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import firebase from '../firebase';


const Cart = ({ navigation }) => {
    const [bounceIn, setBounceIn] = useState(0);
    const [cart, setCart] = useContext(CartContext);
    const subTotal = cart.reduce((acc, curr) => acc + curr.total, 0);
    const numItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    const salesTax = subTotal * 0.08625;
    const total = subTotal + salesTax;

    const {user, setUser} = useContext(AuthContext);

    const onAuthStateChanged = (user) => {
      setUser(user);
    }

    React.useEffect(() => {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    }, [])

    const [finishOrder, setFinishOrder] = useState(0);
    
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
            
    
            <View
              style={{
                width: 50,
                paddingRight: SIZES.padding *2,
                justifyContent: 'center',
                alignItems: 'right',
              }}
            >
                
            </View>
    
        </View>
        )
    }

    function editOrder(ord) {
        var temp = [...cart];
        var index = temp.map(item => item.id).indexOf(ord.id);
        temp.splice(index, 1);
        setCart(temp);
        navigation.navigate('Food', {item: ord.food, mods: ord.mods, choice: ord.choice, quantity: ord.quantity} )
    }


    function renderFoodList() {
          const renderFood = ({item}) => {
          var price = "$"+item.total.toFixed(2);
    
          return (
            <TouchableOpacity style={{
                backgroundColor: COLORS.secondary,
                width: SIZES.width*0.95,
                marginBottom: 4,
                flex: 1,
              }}
              onPress={() => editOrder(item) }
            >

                <View 
                style={{
                    padding: 5,
                    flexDirection: 'row',
                    justifyContent: 'left',
                    //marginBottom: 4,
                    marginLeft: 2,
                }}
                >
                    <View style={{
                        width: 3*SIZES.width/4,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                    >
                        <View style={{
                            justifyContent: 'left',
                            width: 3*SIZES.width/4,
                        }}>
                            <Text style={styles.foodName}>
                                {item.food.name+' x'+item.quantity}
                            </Text>
                        </View> 
                        <View style={{
                            justifyContent: 'center',
                        }}>
                            <Text style={styles.desc}>
                                {price}
                            </Text>
                        </View>

                    </View>
                </View>

                {renderMods(item)}

            </TouchableOpacity>
          )
        }

        function choiceAsMod(item) {
          if (item.choice.hasOwnProperty('name')) {
            return (
             item.choice?.name+(item.mods.length >= 1 ? ', ': "")
            ) 
          }
          return (
            ''
          )
        }

        function renderMods(item) {

          
            var s = ''
            s += choiceAsMod(item);
            for (var i = 0; i < item.mods.length; i++) {
              s += item.mods[i].name+(i < item.mods.length-1 ? ', ': "")
            }
          if (s.length > 1) {
            return(
              <View style={{
                  padding: 5,
                  paddingTop: 0,
                  marginLeft: 2,
                  justifyContent: 'left',
                  flexDirection: 'row',
              }}
              >
                <Text style={styles.mods}>{s}</Text>
              </View>
            )
          }
          
      
        }

    
        return (

          <>
          <View style={{
            marginLeft: 2,
          }}>
            <Text style={styles.yourOrder}>Your Order</Text>
          </View>        

          <FlatList
              data={cart}
              extraData={cart}
              vertical
              showsVeritcalScrollIndicator={false}
              renderItem={renderFood}
              keyExtractor={(item, index) => item.id.toString()}
              contentContainerStyle={{ paddingVertical: SIZES.padding }}
              style={{
                height: SIZES.height-(0.3*SIZES.height),
              }}
              ListFooterComponent={
                <View style={{
                  backgroundColor: COLORS.white,
                  width: SIZES.width*0.95,
                  height: SIZES.height*0.1,
                  marginBottom: 4,
                  flex: 1,
                }}></View>
              }
            />

            </>
          
        )
      }


      function renderOrder() {
        if ( cart.length > 0) {
          return (
              <Animatable.View style={{
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                  backgroundColor: COLORS.secondary,
                  height: SIZES.height*0.30,
                }}
                animation= {bounceIn == 0 ? 'bounceInUp' : 'bounceOutDown'}
                duration={bounceIn == 0 ? 1500 : 375}
              >
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: SIZES.padding * 2,
                  paddingHorizontal: SIZES.padding * 3,
                  borderBottomColor: COLORS.white,
                  borderBottomWidth: 1,
                  backgroundColor: COLORS.primary,
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                }}>
                  <Text style={styles.orderDesc}>{numItems+' '}Item{(numItems > 1 ? 's' : '')} Subtotal</Text>
                  <Text style={styles.orderDesc}>{'$'+subTotal.toFixed(2)}</Text>
                </View>
      
                <View style={{
                  padding: SIZES.padding * 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <TouchableOpacity style={{
                    width: SIZES.width * 0.9,
                    padding: SIZES.padding,
                    backgroundColor: COLORS.primary,
                    alignItems: 'center',
                    borderRadius: SIZES.radius,
                  }}
                  onPress={() => {
                    setBounceIn(1);
                    setFinishOrder(1);
                  }}
                  >
      
                    <Text style={styles.order}> Order </Text>
      
      
                  </TouchableOpacity>
                </View>
      
              </Animatable.View>
            
            )
          } else {
            return (
              <View style={{
                height: SIZES.height*0.30,
                backgroundColor: 'rgba(0.5,0.4,0.3,0.0)'
              }}>
  
              </View>
            )
          }
            
          
        }
        
      

      function renderStoreLocation() {
        return (
          <TouchableOpacity style={{
            paddingBottom: SIZES.padding,
            paddingTop: SIZES.padding,
            justifyContent: 'left',
            //alignItems: 'center',
            flexDirection: 'row',
            width: SIZES.width,
          }}>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: SIZES.padding,
              color: COLORS.darkBlue,
            }}>
              <Image
                source={icons.location}
                style={{
                  width: 35,
                  height: 35,
                  resizeMode: 'contain',
                  tintColor: COLORS.darkBlue,
                }}
              />
            </View>
            

            
            <View style={{
              flexDirection: 'column',
            }}>
              <Text style={styles.category}>Pickup</Text>
              <Text style={styles.location}>{storeList[0].street}</Text>
              <Text style={styles.location}>{storeList[0].town+' '+storeList[0].zip}</Text>
            </View>
            
          </TouchableOpacity>
        )
      }

    function onFinishOrder() {
      if (user) {
        var phone = '';
        firebase.database().ref('users/'+user.displayName+':'+user.uid+'/phone').on('value', function(snap) {
          phone = snap.val();
          Alert.alert(
            "Confirm Order",
            "Place order for:\n"+user.displayName+"\n"+phone,
            [
              {
                text: "Cancel",
                onPress: () => setBounceIn(0),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                setBounceIn(0);
                setCart([]);
              } }
            ]
          );
        })
        
      } else {
        console.log("not logged in");
        navigation.navigate('Login')
      }
    }
    
    function renderFinishOrder() {

      return (
        <Animatable.View style={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            //backgroundColor: COLORS.secondary,
            height: SIZES.height*0.8,
            //marginTop: -SIZES.width*0.89,
          }}
          animation= {bounceIn == 1 ? 'bounceInUp' : 'bounceOutDown'}
        >
        
        <TouchableOpacity style={{
          backgroundColor: 'rgba(0.5,0.4,0.3, 0.0)',
          height: SIZES.height*0.2,
          marginTop: -SIZES.height*0.94,
          width: SIZES.width,
        }}
          onPress={ () => {
            setBounceIn(0);
          }}
        >

        </TouchableOpacity>
        <View style={{ 
            backgroundColor: COLORS.secondary, 
            height: SIZES.height,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        >
          <View style={{
            flexDirection: 'column',
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 3,
            borderBottomColor: COLORS.white,
            borderBottomWidth: 1,
            backgroundColor: COLORS.primary,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}>
            <View style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
              <Text style={styles.orderDesc}>{numItems+' '}Item{(numItems > 1 ? 's' : '')} Subtotal</Text>
              <Text style={styles.orderDesc}>{'$'+subTotal.toFixed(2)}</Text>
            </View>
            <View style={{
              paddingTop: 3,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
              <Text style={styles.orderDesc}>Sales Tax (8.625 {'%'})</Text>
              <Text style={styles.orderDesc}>{'$'+salesTax.toFixed(2)}</Text>
            </View>
            <View style={{
              paddingTop: 6,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
              <Text style={{
                ...styles.order,
                padding: 0,
              }}>Total</Text>
              <Text style={{
                ...styles.order,
                padding: 0,
              }}>{'$'+total.toFixed(2)}</Text>
            </View>
            </View>

          <View style={{
            padding: SIZES.padding * 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <TouchableOpacity style={{
              width: SIZES.width * 0.9,
              padding: SIZES.padding,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              borderRadius: SIZES.radius,
            }}
              onPress={() => onFinishOrder()}
            >

              <Text style={styles.order}> Finish {'&'} Pay </Text>


            </TouchableOpacity>
          </View>
          </View>

        </Animatable.View>
      )
    }

    function renderBoth() {
      return (<>
        {renderOrder()}
        {renderFinishOrder()}
        </>
      )
      
    }


    return (
        <View style={{
          backgroundColor: COLORS.white,
          height: SIZES.height,
        }}>
              <SafeAreaView>
              {renderHeader()}
              </SafeAreaView>
              <SafeAreaView style={{
                 height: SIZES.height*0.78,
              }}>
                {renderStoreLocation()}
                {renderFoodList()}
              </SafeAreaView>
              <SafeAreaView style={{
                marginTop: -SIZES.height*0.1,
              }}>
                {finishOrder == 0 ? renderOrder() : renderBoth()}
                
              </SafeAreaView>
        </View>
    )

}

const styles = StyleSheet.create({
    conatiner: {
      flex: 1,
      backgroundColor: COLORS.pink,
    }, 
    shadow: {
      shadowColor: COLORS.darkBlue,
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 3,
      elevation: 1,
    },
    imageContainer: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    foodName: {
      color: COLORS.white, 
      fontSize: SIZES.h4,
      fontWeight: SIZES.w3,
      shadowColor: COLORS.pink,
      padding: 5,
      paddingLeft: 0,
      shadowOffset: {
        width: -2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 1
    },
    category: {
      color: COLORS.pink, 
      fontSize: SIZES.h4,
      fontWeight: SIZES.w2,
      padding: 5,
      paddingTop: 0,
      shadowColor: COLORS.primary,
      shadowOffset: {
        width: 2,
        height: -2,
      },
      shadowOpacity: 1,
      shadowRadius: 1
    },
    yourOrder: {
      color: COLORS.pink, 
      fontSize: SIZES.h1,
      fontWeight: SIZES.w1,
      padding: 5,
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
      fontSize: SIZES.body4,
      fontWeight: SIZES.w5,
      shadowColor: COLORS.white,
      shadowOffset: {
        width: -2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 1,
    },
    location: {
      color: COLORS.darkBlue,
      fontSize: SIZES.body6,
      fontWeight: SIZES.w5,
      paddingLeft: 5,
      shadowColor: COLORS.white,
      shadowOffset: {
        width: -2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 1,
    },
    mods: {
      color: COLORS.darkBlue,
      fontSize: SIZES.body6,
      fontWeight: SIZES.w4,
      shadowColor: COLORS.white,
      marginTop: -5,
      shadowOffset: {
        width: -2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 1,
    },
    order: {
      color: COLORS.white, 
      fontSize: SIZES.h2,
      fontWeight: SIZES.w3,
      padding: 5,
      shadowColor: COLORS.pink,
      shadowOffset: {
        width: -2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 1
    },
    orderDesc: {
      color: COLORS.darkBlue,
      fontSize: SIZES.h4,
      fontWeight: SIZES.w3,
      shadowColor: COLORS.white,
      shadowOffset: {
        width: -2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 1,
    },
  });

export default Cart;