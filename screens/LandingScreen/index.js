import React from 'react';
import {View, ImageBackground, Image} from 'react-native';
import MyButton from '../../components/MyButton';
import {styles} from './style';

export default function LandingScreen({navigation}) {
  return (
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
            style={styles.btnStyle}
            icon="arrow-right"
            rightIcon="arrow-left"
            onPress={() => {
              navigation.navigate('AuthStackNavigator');
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
