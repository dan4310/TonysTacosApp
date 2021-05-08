import React, { useContext } from 'react';
import { 
  SafeAreaView,
  Text, 
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import { COLORS, SIZES, FONTS, icons, images, specials, modifiers} from '../constants';
import { CartContext } from '../context/CartContext';
import * as Animatable from 'react-native-animatable';
import firebase from '../firebase';
import 'firebase/storage';
import { AuthContext } from '../context/AuthContext';
import { useIsFocused } from '@react-navigation/core';

const Home = ({ navigation }) => {
  const {setUser} = React.useContext(AuthContext)
  const isFocused = useIsFocused();
  
  const scrollX = new Animated.Value(0);
  const [highlights, setHighlights] = React.useState([]);
  const [specialsOfWeek, setSpecialsOfWeek] = React.useState([])
  const [cart, setCart] = useContext(CartContext);
  const numItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  React.useEffect(() => {
    firebase.database().ref('specials/specials').get()
    .then(data => {
      setSpecialsOfWeek(data.val());

    })
    setHighlights(images.info);
  }, [isFocused]);

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
            //marginRight: 10,
          }}
        />
      )

    }
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={{
        height: 30,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: SIZES.padding,
        }}>

          {highlights.map((item, index) => {

            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp'
            })

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp'
            })

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.secondary, COLORS.primary, COLORS.secondary],
              extrapolate: 'clamp'
            })

            return (
              <Animated.View 
                key={index}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                  marginTop: -30,
                }}
              />
            )
          })}

        </View>

      </View>
    )
  }

  function renderPictures() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {x: scrollX}}}
        ], { useNativeDriver: false })}
      >
        {
          highlights.map((item) => (
            <View
              key={item.id}  
              style={{ alignItems: 'center' }}
            >
              <View style={{ height: SIZES.height * 0.25 }}>
                <Image 
                  source={item.image}
                  resizeMode='contain'
                  style={{
                    width: SIZES.width,
                    height: '100%'
                  }}
                />
              </View>

            </View>
          ))
          
        }
      </Animated.ScrollView>
    )
  }



    function renderReel(category, imageList) {
      var categoryLength = category.length;
      
      const renderItem = ({item}) => {
        return (
          <View 
            style={{
              padding: SIZES.padding-2,
              backgroundColor: (item.id % 2 == 0) ? COLORS.secondary : COLORS.primary,
              //borderRadius: SIZES.radius-20,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: SIZES.padding,
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.white,
                padding: 5,
              }}
            >
              <Image 
                source={/*{uri: item.image}*/item.image}
                resizeMode='contain'
              />
            </View>
            
            <View style={{
                width: SIZES.specialW,
                justifyContent: 'left',
                paddingTop: 2,
              }}
            >
              <Text style={styles.foodName}>
                {item.name}
              </Text>
              <Text style={{ fontSize: SIZES.body5, color: COLORS.darkBlue,padding: 2 }}>
                {item.desc}
              </Text>
            </View>

          </View>
        )
      }

      return (
        <View style={{
          padding: SIZES.padding*2,
        }}>

          <View style={{
           // backgroundColor: COLORS.secondary,
            alignSelf: 'flex-start',
            marginRight: SIZES.padding,
            width: SIZES.width,
          }}>
            <Text style={styles.section}>{category}</Text>
          </View>

          <FlatList
            data={imageList}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: SIZES.padding }}
          />
        
        </View>
      )
    }
  
    function renderLocation() {
      return (
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
                fontSize: SIZES.h2,
                fontWeight: SIZES.w2,
                color: COLORS.pink,
                paddingBottom: 2,
                shadowColor: COLORS.primary,
                shadowOffset: {
                  width: 2,
                  height: -2,
                },
                shadowOpacity: 1,
                shadowRadius: 1
              }}
            >
              LOCATION 
            </Text>

            <View style={{ 
                backgroundColor: COLORS.secondary,
                width: 140,
                height: 100, 
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.location}>262 Jericho Turnpike,</Text>
              <Text style={styles.location}>Floral Park, NY 11004</Text>
              <Text style={styles.location}>516-519-8998</Text>
            </View>

          </View>

          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: SIZES.padding*3,
          }}>
            <Text style={{
                fontSize: SIZES.h2,
                fontWeight: SIZES.w2,
                color: COLORS.pink,
                paddingBottom: 2,
                shadowColor: COLORS.primary,
                shadowOffset: {
                  width: 2,
                  height: -2,
                },
                shadowOpacity: 1,
                shadowRadius: 1
              }}
            >
              HOURS
            </Text>

            <View style={{ 
                //backgroundColor: COLORS.secondary,
                width: 140,
                height: 100, 
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.location}>Mon, 11:00 am - 10:00 pm</Text>
              <Text style={styles.location}>Tues, 11:00 am - 10:00 pm</Text>
              <Text style={styles.location}>Wed, 11:00 am - 10:00 pm</Text>
              <Text style={styles.location}>Thurs, 11:00 am - 10:00 pm</Text>
              <Text style={styles.location}>Fri, 11:00 am - 10:00 pm</Text>
              <Text style={styles.location}>Sat, 11:00 am - 10:00 pm</Text>
              <Text style={styles.location}>Sun, 11:00 am - 10:00 pm</Text>
            </View>

          </View>
        </View>
      )
    }


    return (
      <SafeAreaView style={{backgroundColor: COLORS.white}}>
          {renderHeader()}
        <Animated.ScrollView>
          <SafeAreaView style={{
              marginBottom: 50,
            }}
          >
            {renderPictures()}
            {renderDots()}
            {renderLocation()}
            {renderReel("Limited Time", specials)}
            {renderReel("What's Popular", specials)}
          </SafeAreaView>
        </Animated.ScrollView>
      </SafeAreaView>
    )  
}


  const styles = StyleSheet.create({
    conatiner: {
      flex: 1,
      backgroundColor: COLORS.pink,
    }, 
    shadow: {
      shadowColor: COLORS.pink,
      shadowOffset: {
        width: 0,
        height: 3,
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
    image: {
      flex: 1,
      alignItems: 'center',
    },
    location: {
      color: COLORS.darkBlue,
      fontSize: SIZES.body6,
    },
    section: {
      color: COLORS.pink, 
      fontSize: SIZES.h1,
      fontWeight: SIZES.w1,
      padding: 3,
      paddingLeft: 10,
      paddingRight: 70,
      shadowColor: COLORS.primary,
      shadowOffset: {
        width: 2,
        height: -2,
      },
      shadowOpacity: 1,
      shadowRadius: 1
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
    }
  });

export default Home;