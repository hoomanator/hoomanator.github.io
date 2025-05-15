How to configure WebPack:
Right now, the starting point of the application is index.js and webPack created dist directory by default.
1. To configure webpack, we create a file called wepack.config.js:
    const path = require("path");
    module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    }
    };
2. Update the package.json to use this configuration file:
{
  "name": "code",
  "version": "1.0.0",
  "private": true,
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack  --config webpack.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.29.6",
    "webpack-cli": "^3.2.3"
  }
}    
3. Run "npm start"