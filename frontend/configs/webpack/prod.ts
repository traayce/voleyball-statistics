// production config
const {resolve} = require("path");

export const prod = {
  mode: "production",
  entry: "./index.tsx",
  output: {
    filename: "js/bundle.[hash].min.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/",
  },
  devtool: "source-map",
  plugins: [],
};
