# Step-by-Step WebGPU Graphics Programming (5) 
## Create Point and Line primitive 

### npm install

### Update index.html under dist folder
<!DOCTYPE html>

<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <title>WebGPU Step-by-Step 5</title>
   <meta name="description" content="">
   <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
   <div>
      <h1>Create Point and Line Primitives</h1>h1><br>
      <label><b>Select a primitive type:</b></label>
      <select id="id-primitive">
         <option value="point-list">point-list</option>
         <option value="line-list"></option>
         <option value="line-strip"></option>
      </select>
      <br><br>

      <canvas id="canvas-webgpu" with="640" height="480"></canvas>
   </div>
   <script src="main.bundle.js"></script>
</body>

</html>

###Update shaders.ts

###Update main.ts

###npm run prod