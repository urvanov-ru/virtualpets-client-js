const path = require('path');

module.exports = {
  entry: ['./src/index.js', './src/myfile.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
