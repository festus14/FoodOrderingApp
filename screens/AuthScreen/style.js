import {Platform} from 'react-native';
import {SCREEN_HEIGHT} from '../../utility/constants';

import {LIGHT_GREY, SECONDARY_COLOR} from '../../utility/colors';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#fff',
        shadowOpacity: 0,
        shadowOffset: {
          width: 0,
          height: 0,
        },
      },
      android: {
        elevation: 0,
      },
    }),
  },
  topTab: {},
  tabBtn: {
    height: 36,
    width: 100,
  },
  form: {
    padding: 16,
    height: SCREEN_HEIGHT * 0.45,
    marginHorizontal: 5,
    marginTop: 30,
    backgroundColor: '#fff',
    zIndex: 1,
    borderRadius: 10,
  },
  inputStyle: {},
  titleStyle: {},
  containerStyle: {
    marginBottom: 10,
  },
  btn: {
    width: '100%',
    marginTop: 20,
  },
  forgot: {
    marginTop: 5,
  },
  forgotText: {
    color: LIGHT_GREY,
  },
  oauthContainer: {
    width: '100%',
    marginTop: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  oauthBtn: {
    marginBottom: 18,
    justifyContent: 'center',
  },
  iconStyle: {
    marginRight: 10,
  },
  signupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: 'rgba(102, 102, 102, 0.8)',
  },
  styledText: {
    textDecorationLine: 'underline',
    color: SECONDARY_COLOR,
  },
};
