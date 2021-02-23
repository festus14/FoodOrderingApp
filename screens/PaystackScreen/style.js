import {Platform} from 'react-native';
import {SCREEN_HEIGHT} from '../../utility/constants';

import {LIGHT_GREY, SECONDARY_COLOR} from '../../utility/colors';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 16,
    height: SCREEN_HEIGHT * 0.4,
    marginHorizontal: 5,
    marginTop: 50,
    backgroundColor: '#fff',
    zIndex: 1,
    borderRadius: 10,
  },
  inputStyle: {},
  titleStyle: {},
  codeText: {
    color: '#555',
    fontSize: 19,
  },
  containerStyle: {
    // marginTop: 30,
  },
  btn: {
    width: '100%',
    marginTop: 25,
    justifyContent: 'center',
  },
  label: {
    marginTop: 30,
    // paddingLeft: 12,
    fontSize: 16,
  },
};
