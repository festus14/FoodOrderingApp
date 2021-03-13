import React from 'react';
import FastImage from 'react-native-fast-image';

const getPriority = (p) => {
  switch (p) {
    case 'high':
      return FastImage.priority.high;
    case 'low':
      return FastImage.priority.low;
    default:
      return FastImage.priority.normal;
  }
};

const getResizeMode = (r) => {
  switch (r) {
    case 'contain':
      return FastImage.resizeMode.contain;
    case 'cover':
      return FastImage.resizeMode.cover;
    case 'stretch':
      return FastImage.resizeMode.stretch;
    default:
      return FastImage.resizeMode.center;
  }
};

export default function MyImage({style = {}, priority, resizeMode, uri}) {
  return (
    <FastImage
      style={[styles.container, style]}
      source={{
        uri: uri,
        priority: getPriority(priority),
      }}
      resizeMode={getResizeMode(resizeMode)}
    />
  );
}

const styles = {
  container: {
    width: 200,
    height: 200,
  },
};
