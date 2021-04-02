import {Platform} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utility/constants';

import {
  ALMOST_BLACK,
  GREY,
  LIGHTER_GREY,
  LIGHT_GREY,
  MAIN_COLOR,
  SECONDARY_COLOR,
} from '../../utility/colors';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 16,
    marginHorizontal: 20,
    marginTop: 10,
    zIndex: 1,
  },
  inputStyle: {
    paddingBottom: 2,
  },
  codeText: {
    color: '#555',
    fontSize: 19,
  },
  btnStyle: {
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    paddingLeft: 10,
  },
  varStyle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'normal',
  },
  imageView: {
    // paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBtn: {
    backgroundColor: LIGHTER_GREY,
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_HEIGHT * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 20,
  },
  dishText: {
    fontSize: 17,
  },
  containerStyle: {
    marginBottom: 30,
    with: '40%',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  variantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  varText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: ALMOST_BLACK,
    textAlignVertical: 'bottom',
  },
  priceStyle: {
    width: SCREEN_WIDTH * 0.38,
    borderWidth: 1,
    borderColor: LIGHTER_GREY,
    borderRadius: 10,
    paddingVertical: 0,
    marginVertical: 0,
    alignItems: 'baseline',
    marginTop: 10,
  },
  varPriceStyle: {
    width: '40%',
    borderWidth: 1,
    borderBottomColor: GREY,
    borderColor: GREY,
    borderRadius: 12,
    paddingVertical: 0,
    marginVertical: 0,
    alignItems: 'baseline',
    marginTop: 10,
    backgroundColor: LIGHTER_GREY,
    // alignItems: 'center',
  },
  titleStyle: {
    backgroundColor: MAIN_COLOR,
    color: '#fff',
    margin: 0,
    height: '100%',
    width: '25%',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  varTitleStyle: {
    backgroundColor: GREY,
    color: '#fff',
    margin: 0,
    height: '100%',
    width: '25%',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  pickerStyle: {
    paddingTop: 0,
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: LIGHTER_GREY,
    width: SCREEN_WIDTH * 0.38,
    borderRadius: 10,
    paddingVertical: 0,
    marginVertical: 0,
    alignItems: 'baseline',
    marginTop: 10,
  },
  picker: {
    height: 40,
    width: '100%',
    borderWidth: 2,
    borderColor: 'black',
  },
  chatBtn: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
    paddingLeft: 10,
    paddingRight: 10,
    height: 34,
  },
  catBtn: {
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
    padding: 0,
    height: 20,
  },
  iconStyle: {
    paddingRight: 5,
  },
  clearBtn: {
    width: 20,
    backgroundColor: LIGHTER_GREY,
    paddingHorizontal: 0,
    paddingVertical: 0,
    elevation: 0,
  },
  clearStyle: {
    color: ALMOST_BLACK,
    fontSize: 14,
    // paddingRight: 6,
  },
  variant: {
    backgroundColor: LIGHTER_GREY,
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 11,
  },
  varBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: GREY,
    borderRadius: 7,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: '91%',
  },
  nameStyle: {
    flexDirection: 'row',
    backgroundColor: LIGHTER_GREY,
    alignItems: 'center',
    borderBottomColor: GREY,
    borderBottomWidth: 1,
    marginBottom: SCREEN_HEIGHT * 0.01,
    width: '55%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  // textStyle: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  timeStyle: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_HEIGHT * 0.038,
    borderWidth: 1,
    borderColor: LIGHTER_GREY,
    borderRadius: 10,
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  timeText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
  },
  label: {
    fontSize: 12,
  },
  image: {width: SCREEN_WIDTH * 0.3, height: SCREEN_HEIGHT * 0.1},
  imageOption: {
    marginVertical: 10,
  },
  imageText: {
    fontSize: 18,
  },
};
