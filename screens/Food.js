import { NavigationContainer } from '@react-navigation/native';
import React, {useContext, useRef} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {icons, images, COLORS, SIZES, categories, foodList } from '../constants';
import { render } from 'react-dom';
import { or } from 'react-native-reanimated';
import {CartContext} from '../context/CartContext';

var item = {};

var orderId = 0;

const Food = ({ route, navigation }) => {
    item = route.params.item;

    const [cart, setCart] = useContext(CartContext);
    
    const [food, setFood] = React.useState(item);
    
    const [orderItem, setOrderItem] = React.useState({
      id: 0,
      food: food,
      quantity: route.params.hasOwnProperty('quantity') ? route.params.quantity : 1,
      mods: route.params.hasOwnProperty('mods') ? route.params.mods : [],
      choice: route.params.hasOwnProperty('choice') ? route.params.choice :  (food.hasOwnProperty('choices') ? food.choices[0] : {}),
      total: food.price + (item.hasOwnProperty('choices') ? item.choices[0].price : 0),
    })
  

    function updateOrder(action, newMod) {
      var temp;

      if (action === '+') {
        temp = {
          id: 0,
          food: food,
          quantity: orderItem.quantity+1,
          mods: orderItem.mods,
          total: 0.00,
          choice: orderItem.choice,
        };
      } else if (action === '-') {
        temp = {
          id: 0,
          food: food,
          quantity: orderItem.quantity,
          mods: orderItem.mods,
          total: 0.00,
          choice: orderItem.choice,
        };
        if (orderItem.quantity > 1) {
          temp.quantity--;
        }
      } else if (action === 'm') {
        temp = {
          id: 0,
          food: food,
          quantity: orderItem.quantity,
          mods: orderItem.mods,
          total: 0.00,
          choice: orderItem.choice,
        };
        if (orderItem.mods.map(a => a.id).includes(newMod.id)) {
          for (var i = 0; i < temp.mods.length; i++) {
            if (orderItem.mods[i].id === newMod.id) {
              temp.mods.splice(i,1);
              break;
            }
          }
        } else {
          temp.mods.push(newMod)
        }
      } else if (action === 'c') {
        temp = {
          id: 0,
          food: food,
          quantity: orderItem.quantity,
          mods: orderItem.mods,
          total: 0.00,
          choice: newMod,
        };
      }
      var tot = 0;
      
        for (var i = 0; i < temp.mods.length; i++) {
          tot += temp.mods[i].price;
        }
      if (temp.choice.hasOwnProperty('name')) {
        tot += temp.choice.price;
      }

      temp.total = (food.price + tot) * temp.quantity;
      setOrderItem(temp);
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
              onPress={() => navigation.goBack()}
            >
                <Image 
                  source={icons.close}
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

    function renderFoodInfo(choose, custom) {

      React.useState(() => {
        setFood(item);
      })
        return (            
          <View style={{
            flexDirection: 'column',
            marginTop: (custom || choose) == 0 ? 0 : -10,
          }}>

          
            <View style={{
                backgroundColor: COLORS.secondary,
                width: SIZES.width,
                height: SIZES.height * 0.30,
                justifyContent: 'center',
                alignItems: 'center',
            }}>

                <Image 
                  source={food.hasOwnProperty('image') ? food.image : images.largTaco}
                  resizeMode='cover'
                  style={{
                      padding: 5,
                      width: SIZES.width,
                      height: "100%",
                  }}
                />
              

                <View
                  style={{
                      position: 'absolute',
                      bottom: -20,
                      width: SIZES.width,
                      height: 50,
                      justifyContent: 'center',
                      flexDirection: 'row',
                  }}
                >
                  <TouchableOpacity
                      style={{
                          width: 50,
                          backgroundColor: COLORS.primary,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderBottomLeftRadius: 25,
                          borderTopLeftRadius: 25,
                      }}
                      onPress={() => updateOrder('-')}
                    >
                        <Text style={styles.desc}>-</Text>
                  </TouchableOpacity>

                  <View
                      style={{
                          width: 50,
                          backgroundColor: COLORS.primary,
                          alignItems: 'center',
                          justifyContent: 'center'
                      }}
                  >
                      <Text style={styles.desc}> {orderItem.quantity} </Text>
                  </View>

                  <TouchableOpacity
                      style={{
                          width: 50,
                          backgroundColor: COLORS.primary,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderBottomRightRadius: 25,
                          borderTopRightRadius: 25,
                      }}
                      onPress={() => updateOrder('+')}
                    >
                        <Text style={styles.desc}>+</Text>
                  </TouchableOpacity>

                  
                  </View>

              </View>

              <View style={{
                    backgroundColor: COLORS.secondary,
                    //padding: 10,
                    width: SIZES.width,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 30,
                    marginLeft: 2,
                    width: SIZES.width*0.95,
                }}>
                  <View style={{ width: SIZES.width*3/4, }}>
                    <Text style={styles.FoodName}>
                        {food.name}
                    </Text>
                  </View>
                    <Text style={styles.desc}>
                        {'$'+food.price.toFixed(2)}
                    </Text>
                </View>

              <View style={{
                      justifyContent: 'center',
                      marginLeft: 2,
                      padding: SIZES.padding*2,
                      paddingLeft: 5,
                      width: SIZES.width*0.95
                    }}>
                    <Text style={styles.desc}>
                      {food.desc}
                    </Text>
              </View>

              </View>
        )
    }

    function onAddToCart(foodItem) {
      orderItem.id = ++orderId;
      setCart([...cart, orderItem]);
      navigation.goBack();
    }

    function renderOrder() {
      
      return (
        <Animatable.View style={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: COLORS.secondary,
            height: 250,
          }}
          animation='bounceInUp'
          duration={1500}
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
            <Text style={styles.desc}>Item{(orderItem.quantity > 1 ? 's' : '')} total</Text>
            <Text style={styles.desc}>{'$'+orderItem.total.toFixed(2)}</Text>
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
            onPress={() => onAddToCart(orderItem)}
            >

              <Text style={styles.order}> Add to cart </Text>


            </TouchableOpacity>
          </View>

        </Animatable.View>
      )
    }

    function renderModifiers() {

      const renderModifier = ({item}) => {
        var price = "$"+item.price.toFixed(2);
  
        return (
          <TouchableOpacity 
            style={{
              padding: 5,
              backgroundColor: COLORS.secondary,
              flexDirection: 'row',
              justifyContent: 'left',
              width: SIZES.width*0.95,
              marginBottom: 4,
              marginLeft: 2,
            }}
            onPress={() => updateOrder('m', item)}
          >
              <View style={{
                  width: 3*SIZES.width/4,
                }}
              >
                <Text style={(orderItem.mods.map(a => a.id).includes(item.id)) ? styles.selected : styles.desc }>
                  {(item.hasOwnProperty('desc') ? item.desc : item.name)}
                </Text>
              </View>
              <View style={{
                  alignSelf: 'center',
                  //width: SIZES.width-175,
                  justifyContent: 'right',
                }}
              >
                <Text style={styles.desc}>
                  {price}
                </Text>
              </View>
          </TouchableOpacity>
        )
      }

      if (food.hasOwnProperty('modifiers')) {
        return (
          <FlatList
          ListHeaderComponent={
            <View>
              {renderChoices(1)}
              <View style={{
                      justifyContent: 'center',
                      marginLeft: 2,
                      marginBottom: SIZES.padding,
                      width: SIZES.width*0.95,
                    }}>
                    <Text style={styles.modifyTitle}>
                      Customize
                    </Text>
              </View>
            </View>
          }
          data={food.modifiers}
          vertical
          showsVeritcalScrollIndicator={false}
          keyExtractor={(a, index) => a.id.toString()}
          renderItem={renderModifier}
          contentContainerStyle={{ paddingVertical: SIZES.padding }}
          ListFooterComponent={
            <View style={{
              height: SIZES.height*0.4,
              
            }}></View>
          }
        />  
        )
      } else {
        return (
          <View style={{
            height: SIZES.height-240,
          }}>
            {renderChoices(0)}
          </View>
        )
      }
        
    }

    function renderChoices(custom) {
     
      const renderChoice = ({item}) => {
        return (
          <TouchableOpacity 
            style={{
              padding: 5,
              backgroundColor: COLORS.secondary,
              flexDirection: 'row',
              justifyContent: 'left',
              width: SIZES.width*0.95,
              marginBottom: 4,
              marginLeft: 2,
            }}
            onPress={() => updateOrder('c',item)}
          >
              <View style={{
                  width: 3*SIZES.width/4,
                }}
              >
                <Text style={(orderItem.choice.id == item.id) ? styles.selected : styles.desc}>
                  {item.hasOwnProperty('desc') ? item.desc : item.name}
                </Text>
              </View>

              <View style={{
                  alignSelf: 'center',
                  //width: SIZES.width-175,
                  justifyContent: 'right',
                }}
              >
                <Text style={styles.desc}>
                  {item.price == 0 ? "" : "$"+item.price.toFixed(2)}
                </Text>
              </View>
          </TouchableOpacity>
        )
      }

      if (food.hasOwnProperty('choices')) {
        return (
          <FlatList
          ListHeaderComponent={
            <View>
              {renderFoodInfo(1, custom)}
              <View style={{
                      justifyContent: 'center',
                      marginLeft: 2,
                      //paddingLeft: 5,
                      marginBottom: SIZES.padding,
                      width: SIZES.width*0.95,
                      //backgroundColor: COLORS.secondary,
                    }}>
                    <Text style={styles.modifyTitle}>
                      Choose
                    </Text>
              </View>
            </View>
          }
          data={food.choices}
          vertical
          showsVeritcalScrollIndicator={false}
          keyExtractor={(a, index) => a.id.toString()}
          renderItem={renderChoice}
          contentContainerStyle={{ paddingVertical: SIZES.padding }}
          style={{
            marginBottom: SIZES.padding*2,
          }}
        />  
        )
      } else {
          return (
            <SafeAreaView style={{
            }}>
              {renderFoodInfo(0, custom)}
            </SafeAreaView>
          )
            
      }
    
    }

    return (
      <View style={{
        backgroundColor: COLORS.white,
      }}>
        <SafeAreaView>
          {renderHeader()}
        </SafeAreaView>

        <SafeAreaView style={{
          height: SIZES.height+SIZES.height*0.12,
        }}>
          {renderModifiers()}
        </SafeAreaView>

        <SafeAreaView style={{
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          marginTop: -SIZES.height*0.45,
        }}>
          {renderOrder()}
        </SafeAreaView>

      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
    },
    desc: {
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
    FoodName: {
      color: COLORS.pink, 
      fontSize: SIZES.h1,
      fontWeight: SIZES.w1,
      shadowColor: COLORS.primary,
      padding: 2,
      marginLeft: 2,
      shadowOffset: {
        width: 2,
        height: -2,
      },
      shadowOpacity: 1,
      shadowRadius: 1
    },
    modifyTitle: {
      color: COLORS.pink, 
      fontSize: SIZES.h2,
      fontWeight: SIZES.w1,
      shadowColor: COLORS.primary,
      padding: 2,
      marginLeft: 2,
      shadowOffset: {
        width: 2,
        height: -2,
      },
      shadowOpacity: 1,
      shadowRadius: 1
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
    selected: {
      color: COLORS.white, 
      fontSize: SIZES.h4,
      fontWeight: SIZES.w3,
      shadowColor: COLORS.pink,
      shadowOffset: {
        width: -2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 1
    },
})

export default Food;
