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
    marginRight: 20,
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
    width: '32%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
    paddingLeft: 10,
    paddingRight: 10,
    height: 34,
  },
  iconStyle: {
    paddingRight: 5,
  },
  clear: {
    // paddingHorizontal: 10,
    // marginTop: 8,
  },
  clearBtn: {
    width: 30,
    // alignSelf: 'flex-end',
    backgroundColor: '#fff',
    // paddingHorizontal: 5,
    paddingVertical: 0,
  },
  clearStyle: {
    color: ALMOST_BLACK,
    fontSize: 14,
    paddingRight: 6,
  },
  variant: {
    backgroundColor: LIGHTER_GREY,
    flexDirection: 'row',
    marginBottom: 10,
    minHeight: '4%',
  },
  varBox: {
    flexDirection: 'row',
    borderWidth: 1,
  },
};
