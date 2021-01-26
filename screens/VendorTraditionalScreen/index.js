import React from 'react';
import {View, Text, SafeAreaView, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import {SECONDARY_COLOR} from '../../utility/colors';
import {SCREEN_HEIGHT} from '../../utility/constants';

const VendorTraditionalScreen = ({navigation}) => {
  const goBack = () => navigation.goBack();

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header
          leftIcon="ios-arrow-back"
          title="Urban Co."
          onLeftPress={goBack}
        />

        <View style={styles.infoImage}>
          <ImageBackground
            source={require('../../assets/images/launch-image.jpg')}
            resizeMode="stretch"
            style={styles.bImage}>
            <View style={styles.top}>
              <Icon
                name="ios-radio-button-on-outline"
                color={SECONDARY_COLOR}
                size={22}
              />
              <Icon
                name="ios-information-circle-sharp"
                color={SECONDARY_COLOR}
                size={22}
              />
            </View>
            <View style={styles.bottom}>
              <Text>110-130mins</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.container}>
          <View style={styles.infoHeader}>
            <Text>Urban.co, Festac</Text>
            <View style={styles.rating}>
              <Icon
                name="star-half-outline"
                color={SECONDARY_COLOR}
                size={15}
              />
              <Text> 3.5 </Text>
              <View style={{justifyContent: 'center'}}>
                <Icon name="ellipse" color="#000" size={6} />
              </View>
              <Text style={{color: SECONDARY_COLOR}}> ## </Text>
              <View style={{justifyContent: 'center'}}>
                <Icon name="ellipse" color="#000" size={6} />
              </View>
              <Text> Delivery fee N1500</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default VendorTraditionalScreen;

const styles = {
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  infoImage: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
  },
  bImage: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  bottom: {
    backgroundColor: '#fff',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoHeader: {},
  rating: {
    flexDirection: 'row',
    marginTop: 2,
  },
};
