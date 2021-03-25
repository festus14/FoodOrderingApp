import React from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {MAIN_COLOR} from '../utility/colors';
import {SCREEN_WIDTH} from '../utility/constants';

export default function MyModal({
  visible,
  onRequestClose = () => {},
  modalStyle = {},
  contentStyle = {},
  children,
  btnTxt,
  btnTxtStyle = {},
  btnStyle = {},
  onPress = () => {},
  btnTwo,
  onPressTwo,
  errText,
  errStyle,
  headerTxt,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={[styles.centeredView, modalStyle]}>
        <View style={[styles.modalView, contentStyle]}>
          {headerTxt && (
            <View style={styles.header}>
              <Text style={styles.headerTxt}>{headerTxt}</Text>
            </View>
          )}
          <View style={styles.children}>{children}</View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={onPress} style={styles.footerBtn}>
              <Text style={[styles.textStyle, btnTxtStyle]}>{btnTxt}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: SCREEN_WIDTH * 0.9,
    padding: 20,
    paddingVertical: 30,
  },
  openButton: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 15,
    width: 20,
  },
  textStyle: {
    color: '#005',
    fontWeight: 'bold',
    fontSize: 16,
  },
  horizontalLine: {
    borderWidth: 2,
    borderColor: MAIN_COLOR,
    width: 280,
    marginTop: 20,
  },
  children: {marginVertical: 25},
  footer: {
    alignItems: 'flex-end',
  },
  header: {},
  headerTxt: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  footerBtn: {
    width: SCREEN_WIDTH * 0.2,
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
  },
});
