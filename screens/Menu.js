import React, { useRef, useContext } from 'react';
import { 
  SafeAreaView,
  Text, 
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';


import { COLORS, 
  SIZES, 
  icons, 
  images,
  categories,
} from '../constants';
import { CartContext } from '../context/CartContext';
import * as Animatable from 'react-native-animatable';
import { useEffect } from 'react';
import firebase from '../firebase';
import 'firebase/storage'

const Menu = ({ navigation }) => {

  const [foodList, setFoodList] = React.useState([]);

  const [cart, setCart] = useContext(CartContext);
  const [foods, setFoods] = React.useState(null);
  
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  function getData() {
      firebase.database().ref('modifiers').get()
      .then((response) => {
          return response
        })
        .then(mods => {
          firebase.database().ref('foodList/foods').get()
            .then(response => {
              return response
            })
            .then((foodList) => {
              firebase.database().ref('specials/specials').get()
              .then(response => {
                return response
              })
              .then(specialsList => {
                storeInitialFoods(foodList.val(), {
                  redOrGreen: mods.val().redOrGreen,
                  tacoModifiers: mods.val().tacoModifiers,
                  riceOrLettuce: mods.val().riceOrLettuce,
                  bowlModifiers: mods.val().bowlModifiers,
                  nachosModifiers: mods.val().nachosModifiers,
                  pizzadillaModifiers: mods.val().pizzadillaModifiers,
                  guacSize: mods.val().guacSize,
                  shots: mods.val().shots,
                  smallOrLarge: mods.val().smallOrLarge,
                  sodas: mods.val().sodas,
                }, specialsList.val())
              })
              .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error))
        
        })
        .catch((error) => console.error(error))
  }

  useEffect(() => {
   getData();
  }, [])


  function storeInitialFoods(foodData, modData, specialsData) {

    var modsCategories = {};
      for (var key in modData) {
        var modList = [];
        for (var i = 0; i < modData[key].length; i++) {
          var tempMod = {
            id: parseInt(modData[key][i].id),
            name: modData[key][i].name,
            price: parseFloat(modData[key][i].price)
          }
          if (modData[key][i].hasOwnProperty("desc")) {
            tempMod = {
              ...tempMod,
              desc: modData[key][i].desc,
            }
          }
          modList.push(tempMod)
        }
        modsCategories[key] = modList;
      }
      
      var modifiers = modsCategories;
      
      
      var foodList = []
      for (var i = 0; i < foodData.length; i++) {
        var foodTemp = {
          id: parseInt(foodData[i].id),
          name: foodData[i].name,
          categoryID: parseInt(foodData[i].categoryID),
          desc: foodData[i].desc,
          price: parseFloat(foodData[i].price)
        }
        if (foodData[i].hasOwnProperty("modifiers")) {
          var mods = [];
          switch (foodData[i].modifiers) {
            case "tacoModifiers":
              mods = modifiers.tacoModifiers;
              break;
            case "pizzadillaModifiers":
              mods = modifiers.pizzadillaModifiers;
              break;
            case "bowlModifiers":
              mods = modifiers.bowlModifiers;
              break;
            case "nachosModifiers":
              mods = modifiers.nachosModifiers;
              break;
            case "shots":
              mods = modifiers.shots;
              break;
          }
          foodTemp = {
            ...foodTemp,
            modifiers: mods,
          }
        }
        if (foodData[i].hasOwnProperty("choices")) {
          var choices = [];
          switch (foodData[i].choices) {
            case "redOrGreen":
              choices = modifiers.redOrGreen;
              break;
            case "riceOrLettuce":
              choices = modifiers.riceOrLettuce;
              break;
            case "guacSize":
              choices = modifiers.guacSize;
              break;
            case "smallOrLarge":
              choices = modifiers.smallOrLarge;
              break;
            case "sodas":
              choices = modifiers.sodas;
              break;
          }
          foodTemp = {
            ...foodTemp,
            choices: choices,
          }
        }
        if (foodData[i].hasOwnProperty("image")) {
          foodTemp = {
            ...foodTemp,
            image: foodData[i].image
          }; 
            
        }
        
        foodList.push(foodTemp);
      }

      for (var i = 0; i < specialsData.length; i++) {
        foodList.push({
          ...specialsData[i],
          id: foodData.length + specialsData[i].id
        });
      }
      setFoods(foodList);
      setFoodList(foodList);
  }
    
  const numItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const foodFlatList = useRef();

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
            //justifyContent: 'center',
            paddingRight: SIZES.padding *2,
            marginTop: 30,
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.navigate("Cart",{ orderItem: {} });
          }}
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
            //marginRight: 10,
          }}
        />
      )

    }
  }


  function onSelectCategory(category) {
    setSelectedCategory(category);
    let filteredFoods = foodList.filter(food => parseInt(food.categoryID) == category.id);
    setFoods(filteredFoods);
    
    if (foodFlatList.current.length > 0) {
      foodFlatList.current.scrollToIndex({index: 0});
    }
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
      if (parseFloat(item.price) === 0.00 ) {
        price = ' ';
      } else {
        price = "$"+parseFloat(item.price).toFixed(2);
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
                width: 3*SIZES.width/4,
              }}
            >
              <Text style={styles.foodName}>
                {item.name}
              </Text>
            </View>
            <View style={{
                alignSelf: 'center',
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
        height: SIZES.height
      }}
    >
      {renderHeader()}
        <SafeAreaView>
          {renderCategories("Categories", categories)}
          {foods && renderFoodList()}
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