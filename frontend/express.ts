const express = require("express");
import { frontendApp } from "./devMilddleware";
const app = express();
const portNumber = 3000;
const sourceDir = "dist";

app.use(express.static(sourceDir));
app.use("/", frontendApp);
const API_PATH = "http://localhost:5000";
let proxy = require("http-proxy-middleware");
let options = {
  target: API_PATH,
  changeOrigin: true,
  logLevel: "debug",
  onError: function onError(err: string, req: any, res: any) {
    console.log("Something went wrong with the proxy middleware.", err);
    res.end();
  }
};
let prox = proxy(options);
app.use("/api", prox);


app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});

