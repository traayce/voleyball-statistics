const express = require('express');
const app = express();
const portNumber = 3000;
const sourceDir = 'dist';

app.use(express.static(sourceDir));

const API_PATH = "http://localhost:5000";
var proxy = require('http-proxy-middleware')
let options = {
  target: API_PATH, 
  changeOrigin: true,
  logLevel: "debug",
  onError: function onError(err, req, res) {
    console.log("Something went wrong with the proxy middleware.", err)
    res.end();
  }
};
var prox = proxy(options);
app.use('/api', prox)

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
