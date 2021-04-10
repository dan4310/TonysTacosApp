import { NavigationContainer } from '@react-navigation/native';
import React, {useRef} from 'react';
import { render } from 'react-dom';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import {icons, images, COLORS, SIZES, categories, foodList } from '../constants';

var orders = [];
var orderID = 0;

const Cart = ({ route, navigation }) => {
    
    //let {orderItem}  = route.params;
    var orderItem = route.params.orderItem;
    if (orderItem.hasOwnProperty('id')) {
      if (orderItem.id === 0) {
        orderItem.id = ++orderID;
        orders.push(orderItem);
      }
      
    }
    
    const [cart, setCart] = React.useState(orders);
    const [toEdit, setEdit] = React.useState({});
    
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
              onPress={() => navigation.navigate('Menu')}
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
          var ids = orders.map(order => order.id );
          orders.splice(ids.indexOf(ord.id), 1);
          var temp = orders;

          setCart([...temp]);
          
          navigation.navigate('Food', {item: ord.food});
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
                            justifyContent: 'right',
                        }}>
                            <Text style={styles.desc}>
                                {price}
                            </Text>
                        </View>

                    </View>
                </View>

                

                <View style={{
                        padding: 5,
                        paddingTop: 0,
                        marginLeft: 2,
                        justifyContent: 'left',
                        flexDirection: 'row',
                    }}
                    >
                      <Text style={styles.mods}>
                        {renderMods(item)}
                      </Text>
                </View>

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
          return (
            s
          )
        }
    
        return (
          
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
            />
    
        )
      }


    return (
        <View>
            <SafeAreaView>
                {renderHeader()}
                {renderFoodList()}
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
      shadowOffset: {
        width: -2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 1
    },
    category: {
      color: COLORS.pink, 
      fontSize: SIZES.h3,
      fontWeight: SIZES.w2,
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
    mods: {
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
    }
  });

export default Cart;