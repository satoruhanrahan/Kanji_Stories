const path = require('path');

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    }
  }
}