import React, { useRef } from 'react';
import { 
  SafeAreaView,
  Text, 
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import * as module1 from '../modules/module1';

import { COLORS, 
  SIZES, 
  icons, 
  images, 
  specials,
  popular,
  foodList,
  categories,
} from '../constants';
import { NavigationContainer } from '@react-navigation/native';

var orderItem = {};

const Menu = ({ navigation }) => {

  const foodAction = 'add';
  const [foods, setFoods] = React.useState(foodList);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const foodFlatList = useRef();

  function renderHeader() {
    return (
      <View style={{ 
          flexDirection: 'row', 
          height: 100,
          backgroundColor: COLORS.primary,
          marginTop: -50
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding *2,
            justifyContent: 'center',
          }}
        >
            <Image 
              source={icons.location}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.darkBlue,
                marginTop: 50
              }}
            />
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: SIZES.padding}}>
              <View 
                style={{
                  marginTop: 50,
                  width: '70%',
                  height: '50%',
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: SIZES.radius,
                }}
                >
                <Text style={{ color: COLORS.darkBlue, fontWeight: '800' }}>
                  161 Floral Blvd
                </Text>
              </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            //paddingRight: SIZES.padding *2,
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate("Cart",{ orderItem: {} })}
        >
            <Image 
              source={icons.shoppingCart}
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,
                tintColor: COLORS.darkBlue,
                marginTop: 50
              }}
            />
        </TouchableOpacity>

      </View>
    )
  }




  function onSelectCategory(category) {
    // Filter resteraunt

    let filteredFoods = foodList.filter(food => food.categoryID == category.id);
    setFoods(filteredFoods);
    setSelectedCategory(category);
    
    foodFlatList.current.scrollToIndex({index: 0});
    
  };

  function renderCategories(category, categoryList) {
    const renderCategory = ({item}) => {
      return (
        <TouchableOpacity 
          style={{
            padding: 3,
            backgroundColor: (selectedCategory?.id == item.id) ? COLORS.secondary : COLORS.white,
            //borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            //...styles.shadow
          }}
          onPress={() => onSelectCategory(item)}
        >
         
            <Text style={styles.category}>
              {item.name}
            </Text>
        </TouchableOpacity>
      )
    }

    return (
      
      <FlatList
          data={categoryList}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={renderCategory}
          contentContainerStyle={{ paddingVertical: SIZES.padding }}
          style={{
            marginLeft: 2,
            marginBottom: SIZES.padding/2,
            marginTop: SIZES.padding/2,
          }}
        />

    )
  }

  function renderFoodList() {
    const renderFood = ({item}) => {
      var foodNameLen = item.name.length;
      var price;
      if (item.price === 0.00 ) {
        price = ' ';
      } else {
        price = "$"+item.price.toFixed(2);
      }

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
          onPress={() => navigation.navigate("Food", {
              item: item,
              mods: [],
              selections: {},
          })}
        >
            <View style={{
                //alignSelf: 'flex-start',
                width: 3*SIZES.width/4,
              }}
            >
              <Text style={styles.foodName}>
                {item.name}
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

    return (
      
      <FlatList
          data={foods}
          vertical
          showsVeritcalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={renderFood}
          contentContainerStyle={{ paddingVertical: SIZES.padding }}
          ref={foodFlatList}
          style={{
            height: SIZES.height-(0.3*SIZES.height),
          }}
        />

    )
  }
 
  return (
    <SafeAreaView style={{
        backgroundColor: COLORS.white,
      }}
    >
      {renderHeader()}
        <SafeAreaView>
          {renderCategories("Categories", categories)}
          {renderFoodList()}
        </SafeAreaView>
    </SafeAreaView>
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
      padding: 5,
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
    }
  });

export default Menu;