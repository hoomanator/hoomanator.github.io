/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates detecting objects in an image through ml5.imageClassifier.
 */

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;
let img2;
let myFont;

// Variables for displaying the results on the canvas
let label = "";
let confidence = "";

function preload() {
  console.log("preloading an image");
  classifier = ml5.imageClassifier("MobileNet");
  img = loadImage("images/bird.jpg");
  myFont = loadFont('fonts/PlayfairDisplay-VariableFont_wght.ttf');
}

function setup() {
  createCanvas(500, 500);
  console.log("classifying an image");
  classifier.classify(img, gotResult);
  image(img, 0, 0, 400, 400);

}

function draw() {
  if (imageChanged == true) {
    classifyNewImage();

    imageChanged = false;
  }
}

function classifyNewImage() {

  console.log("image data: ");
  console.log(uploadImage);

  createCanvas(500, 500);
  console.log("loading a new image");
  //convert the image data to p5 image
  loadImage(uploadImage, imgResult => {
    img2 = imgResult;

    console.log("New image data: ");
    console.log(img2);

    console.log("classifying a new image");
    classifier.classify(img2, gotResult);
    //image(img2, 0, 0, 300, 300);

  });
}

// Callback function for when classification has finished
function gotResult(results) {
  // The results are in an array ordered by confidence
  console.log(results);
  //background(200);
  // Display the results on the canvas
  fill(0, 255, 0);
  stroke(0, 0, 0);
  textSize(13);
  textFont(myFont);
  label = "Guess 1: " + results[0].label;
  confidence = "Confidence: " + nf(results[0].confidence, 0, 2) * 100 + "%";
  text(label, 10, 60);
  text(confidence, 10, 80);

  label = "Guess 2: " + results[1].label;
  confidence = "Confidence: " + nf(results[1].confidence, 0, 2) * 100 + "%";
  text(label, 10, 100);
  text(confidence, 10, 120);

  label = "Guess 3: " + results[2].label;
  confidence = "Confidence: " + nf(results[2].confidence, 0, 2) * 100 + "%";
  text(label, 10, 140);
  text(confidence, 10, 160);
}
