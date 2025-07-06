https://www.tensorflow.org/js

Tutorials
https://www.youtube.com/watch?v=Qt3ZABW5lD0&list=PLRqwX-V7Uu6YIeVA3dNxbR9PYj4wV31oQ

Tensor is a data structure that could hold scalars, vectors (one dimensional numbers), Matrix (2 dimensional numbers), and n-dimensional numbers.
Tensorflow is a google open source C++ library started in 2015 under Apache license. There is a Python and Java binding for Tensorflow project. Nikhil Thorat and Daniel Smilkov are creators of the project.


Flask server to Python is like Node.js to Javascript.

deeplearn.js project brought tensorflow to javascript. Deeplearn.js became Tensorflow.js.

Keras was a high level API on top of Tensorflow, Theano, Pytorch. Keras now is part of "layers" api of tensorflow.js. Core api of tensorflow.js is basic tensorflow operations.

ML5 is highr level javascript API on top of tensorflow.js.

https://js.tensorflow.org/api/latest/?_gl=1*147r4a9*_ga*MTg5OTgwNTcwLjE3NTA3OTYzNjU.*_ga_W0YLR4190T*czE3NTE1ODA4NTAkbzQkZzEkdDE3NTE1ODI0OTIkajUxJGwwJGgw

First Project:
1. Create an index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>TensorFlow.js</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
     <link rel="shortcut icon" href="H.ico">
    <!-- Import the webpage's stylesheet -->
    <link rel="stylesheet" href="style.css">
  </head>  
  <body>
    <h1>Tensors Creation</h1>
    
    <!-- Import p5 library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>

    <!-- Import TensorFlow.js library -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js" type="text/javascript"></script>

    <!-- Import the page's JavaScript to do some stuff -->
    <script src="sketch.js"></script>
  </body>
</html>

2. Create a sketch.js

function setup(){
  noCanvas();
  tf.tensor([1,2,3,4]).print();
}

Congrats! You created your first tensor!