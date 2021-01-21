const path = require('path');

const NODE_MODULES_PATH = path.join(__dirname, '/node_modules');

module.exports = {
  assets: ['./assets/fonts'], // stays the same
  dependencies: {
    'react-native-secure-key-store': {
      root: NODE_MODULES_PATH + '/react-native-secure-key-store',
    },
    'react-native-splash-screen': {
      root: NODE_MODULES_PATH + '/react-native-splash-screen',
    },
  },
};
