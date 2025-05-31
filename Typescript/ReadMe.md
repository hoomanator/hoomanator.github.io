### install vs code

### install live server extenstion in vscode

### create a directory somewhere: typescript-jquery-starter

### Go to that directory in the command line

### Run vscode
c:\myname\typescript-jquery-starter\code .

### Create two directories: src, dist under typescript-jquery-starter

### Create index.ts under src directory

import $ from "jquery";
declare let global: any;
global.jQuery = $;

$('#buttonId').on('click', ()=>{
 const myHTML: string = `
              <b>
                This text is shown using
                the jQuery in TypeScript 
                by installing it using 
                npm package.
              </b>`;
    $('#dialog-container').html(myHTML);
});

### install typescript in the terminal
npm i typescript

### Compile your index.ts to index.js
Run tsc in the terminal

### Create index.html under dist
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Using jQuery in TypeScript</title>
</head>

<body>    
    <div style="text-align: center;">
        <h1 style="color: green;">
            Using jQuery in TypeScript
        </h1>
        <button id="buttonId">
              Click to show text using jQuery
          </button>
        <h3 id="dialog-container"></h3>
    </div>
    <script src="../src/index.js"></script>
</body>

</html>

### install webpack in the terminal
npm i -D webpack webpack-cli

### update package.json
{
  "name": "typescript-jquery-webpack-starter",
  "version": "1.0.0",
  "description":"",
  "main": "index.js",
  "scripts":{
    "build": "webpack --mode production"
  },
  "dependencies": {
    "jquery": "^3.7.1",
    "typescript": "^5.8.3"
  },
  "devDependencies": {
    "@types/jquery": "^3.5.32",
    "webpack": "^5.99.9",
    "webpack-cli": "^6.0.1"
  }
}

### Run the webpack script in the terminal
npm run build

### Update the index.html to point to wepack main.js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Using jQuery in TypeScript</title>
</head>

<body>    
    <div style="text-align: center;">
        <h1 style="color: green;">
            Using jQuery in TypeScript
        </h1>
        <button id="buttonId">
              Click to show text using jQuery
          </button>
        <h3 id="dialog-container"></h3>
    </div>
    <script src="./main.js"></script>
</body>

</html>

### Run index.html
Right click on index.html and Run live server