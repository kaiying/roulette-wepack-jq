const webpack = require('webpack');
const path = require('path');
const processEnvFile = require('./src/helper/env-file-name');
const webpackHelper = require('./src/helper/webpack');

/** 因為 nuxt.config 有套件需要 dot env ，所以用此處載入，不用 buildModules */
const dotenv = require('dotenv');
processEnvFile(process.env.NODE_ENV, file => {
  dotenv.config({ path: file });
});

let config = {
  entry: ["./src/main.js"],
  output: {
    path: __dirname + "/event/js"
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ],
  },
  devServer: {
    inline: true,
    contentBase: "./event",
    port: 4123
  },
  plugins: [
    new webpack.DefinePlugin({
      ...webpackHelper.defineEnv(process.env)
    }),
    // new webpack.ProvidePlugin({
    //   // global modules
    //   _: 'lodash',
    //   // $: 'jquery',
    // }),
    // new LodashWebpackPlugin({ function: true }),
  ],
}

module.exports = config;