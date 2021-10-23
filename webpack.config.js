const path = require('path');

// https://webpack.js.org/guides/author-libraries/
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'p5utils.js',
    library: {
      name: 'p5utils',
      type: 'umd',
    },
  },
};
