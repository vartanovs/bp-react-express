/**
 * @module webpack/common.config.js
 * @description Webpack Common Config for Dev and Prod
 */

const path = require('path');
const HTMLWebpack = require('html-webpack-plugin');

// Configure Plugin to add bundle file to SPA HTML file
const HTMLWebPackPlugin = new HTMLWebpack({
  template: path.resolve(__dirname, '../src/index.html'), // Specify path to SPA HTML file
  filename: './index.html',                               // Specify name of output file
});

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),     // Specify client bundle entry point
  output: {
    path: path.resolve(__dirname, '../build'),            // Specify bundle output target directory
    filename: 'bundle.js',                                // Specify bundle file name
    publicPath: '/',                                      // Specify path for assets relative to HTML page
  },
  module: {                                               // Specify configuration regarding modules
    rules: [
      {
        test: /\.css$/,                                   // Use css-loader to compile CSS files
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ts|tsx)?$/,                             // Use ts-loader to compile TypeScript files
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  plugins: [HTMLWebPackPlugin],                           // Specify Webpack plugins 
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],           // Resolve modules with these extensions
  },
};
