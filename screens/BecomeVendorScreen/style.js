import {LIGHTER_GREY, MAIN_COLOR} from '../../utility/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utility/constants';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: LIGHTER_GREY,
  },
  form: {
    padding: 16,
    height: SCREEN_HEIGHT * 0.45,
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
  label: {
    fontSize: 12,
  },
  containerStyle: {
    marginBottom: 30,
  },
  btn: {
    width: '80%',
    marginTop: 25,
    justifyContent: 'center',
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 15,
    marginVertical: 10,
    paddingLeft: 18,
    color: MAIN_COLOR,
  },
  cardBody: {
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    paddingVertical: 15,
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
  },
  timeText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
  },
  hours: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
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
  modalBtn: {
    marginTop: 15,
    width: '30%',
    alignItems: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
};
