const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
import { devSettings } from "./configs/webpack";
import * as webpack from "webpack";
const express = require("express");
const compiler = webpack(devSettings as any);

const devMiddleware = (app: any) => {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: "/",
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    }
  }));
  app.use(webpackHotMiddleware(compiler));
};

const frontendApp = express();

devMiddleware(frontendApp);
export { frontendApp };