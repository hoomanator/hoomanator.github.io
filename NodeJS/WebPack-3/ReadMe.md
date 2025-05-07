1. Install Webpack and webpack-cli:
    npm init -y
    npm install --save-dev webpack webpack-cli
1a. Update the package.json by adding "start" to the "script" portion.    
     {
  "name": "code",
  "version": "1.0.0",
  "private": true,
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.47.0",
    "webpack-cli": "^3.3.12"
  }
}

2. Run "npm start" and see the error
3. Create an index.js inside the ./src directory
    alert("HELLO FROM WEBPACK!");
4. Move app.js inside ./src/app directory
5. Update index.html
 <script src="./src/app/alert.service.js"></script>
  <script src="./src/app/component.service.js"></script>
  <script src="./src/app/utils/inputs-are-valid.js"></script>
  <script src="./src/app/utils/parse-inputs.js"></script>
  <script src="./src/app/app.js"></script>
6. Run "npm start" and see that it made our code in main.js inside "dist" directory
7. Update index.html
    <script src="./src/app/alert.service.js"></script>
    <script src="./src/app/component.service.js"></script>
    <script src="./src/app/utils/inputs-are-valid.js"></script>
    <script src="./src/app/utils/parse-inputs.js"></script>
    <script src="./src/app/app.js"></script>
    <script src="./dist/main.js"></script>
8. Add dist directory and npm_modules in your .gitignore
    node_modules
    dist
  
