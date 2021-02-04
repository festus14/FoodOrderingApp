import {Dimensions, StatusBar, PixelRatio} from 'react-native';

export const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 28;

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

// For font size
export const SCALE = Math.round(
  PixelRatio.roundToNearestPixel(SCREEN_WIDTH / 320),
);

export const API_URL = 'https://api.boxin.ng/api/v1';
