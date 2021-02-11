import React from 'react';
import {View, ImageBackground, Image, StatusBar, Platform} from 'react-native';
import MyButton from '../../components/MyButton';
import {MAIN_COLOR} from '../../utility/colors';
import {styles} from './style';

export default function LandingScreen({navigation}) {
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        animated={true}
        backgroundColor={MAIN_COLOR}
        translucent={true}
      />
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/launch-image.jpg')}
          style={styles.bImage}>
          <View style={styles.content}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require('../../assets/images/boxin-white.png')}
            />
            <MyButton
              text="Get a meal"
              textStyle={styles.text}
              style={styles.btnStyle}
              rightIcon="long-arrow-right"
              iconSize={30}
              onPress={() => {
                navigation.navigate('AuthStackNavigator');
              }}
            />
          </View>
        </ImageBackground>
      </View>
    </>
  );
}
