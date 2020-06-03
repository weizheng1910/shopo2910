const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const dotenv = require('dotenv');
const env = dotenv.config().parsed;
  
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: {
    bundle: "./src/index.js",
    auth: "./src/login/index.js",
    admin: "./src/admin/index.js",
    register: "./src/register/index.js",
  },
  plugins: [
    //For Development, create the html file automatically with the bundle.
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin(envKeys)
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["@babel/preset-env"],
        },
      },
      {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
},
    ],
  },
 
};
