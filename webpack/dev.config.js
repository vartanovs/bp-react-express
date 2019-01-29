/**
 * @module webpack/dev.config.js
 * @description Webpack Development Mode Configuration
 */

const path = require('path');
const merge = require('webpack-merge');

const common = require('./common.config');

module.exports = merge(common, {
  mode: 'development',                                  // Built-in optimizations to generate 'dev' bundle
  devServer: {
    compress: true,                                     // GZIP Compression
    contentBase: path.resolve(__dirname, '../build'),   // Serve static content from ../build
    historyApiFallback: true,                           // Redirect 404s to /index.html (for React Router)
    host: '0.0.0.0',                                    // Bind host for Docker compatibility
    proxy: {
      '/api': 'http://ern-boilerplate-server:3000',     // Proxy requests to '8080/api' route
    },
    port: 8080,                                         // Specify PORT for dev server requests
  },
  devtool: 'source-map',                                // Add meta info to browser devtools for debugging
});