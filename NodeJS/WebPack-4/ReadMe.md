1. Add Import/Export to the functions to establish the interdependencies between js files.
2. Install Webpack and webpack-cli:
    npm init -y
    npm install --save-dev webpack webpack-cli
3. Now we can remove these from index.html
    <script src="./src/app/alert.service.js"></script>
    <script src="./src/app/component.service.js"></script>
    <script src="./src/app/utils/inputs-are-valid.js"></script>
    <script src="./src/app/utils/parse-inputs.js"></script>
    <script src="./src/app/app.js"></script>    