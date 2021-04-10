import React from 'react';
import { 
  SafeAreaView,
  Text, 
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList, 
} from 'react-native';

import { COLORS, SIZES, FONTS, icons, images, specials,popular} from '../constants';
import { color } from 'react-native-reanimated';
import { render } from 'react-dom';

const Home = () => {

  function renderHeader() {
    return (
      <View style={{ 
          flexDirection: 'row', 
          height: 100,
          backgroundColor: COLORS.primary,
          marginTop: -50,
        }}
      >

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

      </View>
    )
  }
  

    return (
      <SafeAreaView>
          {renderHeader()}
        <ScrollView>
          <SafeAreaView style={{
              marginBottom: 50,
            }}
          >

          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    )  
}


  const styles = StyleSheet.create({
    conatiner: {
      flex: 1,
      backgroundColor: COLORS.pink,
    }, 
    shadow: {
      shadowColor: "#000",
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
    }
  });

export default Home;