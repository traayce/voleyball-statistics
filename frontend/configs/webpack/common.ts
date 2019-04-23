
const { resolve } = require("path");
const { CheckerPlugin } = require("awesome-typescript-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
import * as webpack from "webpack";

export const common = {
  resolve: {
    alias: {
      "@reducers": resolve(__dirname, "../../src/store/modules/"),
      "@components": resolve(__dirname, "../../src/components/"),
      "@assets": resolve(__dirname, "../../src/assets/"),
      "@types": resolve(__dirname, "../../src/types/")
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  context: resolve(__dirname, "../../src"),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader", "source-map-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "awesome-typescript-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", { loader: "css-loader", options: { importLoaders: 1 } }],
      },
      {
        test: /\.scss$/,
        loaders: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          "file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]",
          "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __PROD__: JSON.stringify(process.env.NODE_ENV === "production"),
      __DEVTOOLS__: JSON.stringify(process.env.IS_REDUX_DEVTOOLS_ENABLED === "true"),
      __CLIENT__: JSON.stringify(true),
      __IS_SENTRY_CLIENT_ENABLED__: JSON.stringify(process.env.IS_SENTRY_CLIENT_ENABLED === "true"),
      __SENTRY_CLIENT_DSN__: JSON.stringify(process.env.SENTRY_DSN_CLIENT)
    }),
    new CheckerPlugin(),
    new HtmlWebpackPlugin({ template: "index.html.ejs", }),
  ],
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  },
  performance: {
    hints: false,
  },
};