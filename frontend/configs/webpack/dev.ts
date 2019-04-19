// development config
const webpack = require("webpack");
const {resolve} = require("path");

export const dev = {
  mode: "development",
  entry: [
    "react-hot-loader/patch", // activate HMR for React
    "webpack-hot-middleware/client",
    "./index.tsx" // the entry point of our app
  ],
  output: {
    filename: "js/bundle.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/",
  },
  devServer: {
    hot: true, // enable HMR on the server
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin()
  ],
};
