const path = require('path');

const config = {
  entry: {
      app: './public/assets/js/app.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public/assets/js')
  }
};

module.exports = config;