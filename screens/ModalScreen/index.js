import React, {useState} from 'react';
import {ScrollView, Text, View, SafeAreaView} from 'react-native';
import Header from '../../components/Header';
import TopBar from '../../components/TopBar';
import {SECONDARY_COLOR} from '../../utility/colors';

export default function ModalScreen({navigation, route}) {
  const {title} = route.params;
  const [position, setPosition] = useState('left');
  const [authState, setAuthState] = useState('delivery');
  const setPositionHandler = (pos) => {
    setPosition(pos);
    if (pos === 'left') {
      setAuthState('delivery');
    } else {
      setAuthState('pickUp');
    }
  };
  return (
    <>
      <Header
        leftIcon="ios-arrow-back"
        title={title}
        onLeftPress={() => navigation.goBack()}
      />

      <TopBar
        style={styles.topBar}
        tabBtn={styles.tabBtn}
        leftText="Delivery"
        rightText="Pick Up"
        position={position}
        setLeftPosition={setPositionHandler}
        setRightPosition={setPositionHandler}
      />

      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          style={styles.form}>
          <View style={styles.controls}>
            <View style={styles.controlHeader}>
              <Text style={styles.headerText}>Item(s)</Text>
              <Text style={[styles.headerText, styles.coloredText]}>
                Add Item(s)
              </Text>
            </View>
            <View style={styles.controlList}>
              <View style={styles.item}>
                <Text style={styles.name}>Spicy Rice</Text>
                <Text style={[styles.price, styles.coloredText]}>N1500</Text>
              </View>
              <View style={styles.control}>
                <View style={styles.addBtn}>
                  <Text style={styles.addText}>-</Text>
                </View>
                <View>
                  <Text>1</Text>
                </View>
                <View style={styles.addBtn}>
                  <Text style={styles.addText}>+</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = {
  topTab: {},
  tabBtn: {
    height: 36,
    width: 100,
  },
  topBar: {
    marginTop: 20,
  },
  contentContainer: {
    padding: 10,
  },
  container: {
    flex: 1,
  },
  controlHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerText: {
    fontWeight: 'bold',
  },
  coloredText: {
    color: SECONDARY_COLOR,
  },
};
