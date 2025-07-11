/* ===
Based on this ml5 Example:
Image Classification using Feature Extraction with MobileNet 
Built with p5.js
This example uses a callback pattern to create the classifier
=== */

let featureExtractor;
let classifier;
let video;
let loss;
let facesA_Images = 0;
let facesB_Images = 0;
let facesC_Images = 0;
let numClasses = 3;

function setup() {
  createCanvas(400, 400);

  video = createCapture(VIDEO); // Create a video element
  video.parent('videoContainer'); // Append it to the videoContainer DOM element
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady); // Extract the already learned features from MobileNet
  featureExtractor.numClasses = numClasses;
  classifier = featureExtractor.classification(video, videoReady); // Create a new classifier using those features and give the video we want to use
  createButtons(); // Set up the UI buttons
}

// A function to be called when the model has been loaded
function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) loaded!');
}

// A function to be called when the video has loaded
function videoReady() {
  select('#videoStatus').html('Video ready!');
}


// Classify the current frame.
function classify() {
  classifier.classify(gotResults);
}

// A util function to create UI buttons
function createButtons() {

  buttonA = select('#faceA');
  buttonA.mousePressed(function() {
    classifier.addImage('A');
    select('#numFacesA').html(facesA_Images++);
  });

  buttonB = select('#faceB');
  buttonB.mousePressed(function() {
    classifier.addImage('B');
    select('#numFacesB').html(facesB_Images++);
  });

  buttonC = select('#faceC');
  buttonC.mousePressed(function() {
    classifier.addImage('C');
    select('#numFacesC').html(facesC_Images++);
  });


  // Train Button
  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Finished Training! Final Loss: ' + loss);
      }
    });
  });

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);

  // buttonNew = select('#buttonNew');
  // buttonNew.mousePressed(clearAll);
}


// need a way to zero out the classifier
// function clearAll() {
//   facesA_Images = 0;
//   facesB_Images = 0;
//   facesC_Images = 0;
//   select('#numFacesA').html('');
//   select('#numFacesB').html('');
//   select('#numFacesC').html('');
//   select('#loss').html('');
// }

// Show the results
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }
  select('#result').html(result);
  classify();
  console.log(result);

  if (result == 'A') {
    drawRect(255, 0, 0);
  } else if (result == 'B') {
    drawRect(0, 255, 0);
  } else if (result == 'C') {
    drawRect(0, 0, 255);
  }
}


function draw() {
 // background(0);
}


function drawRect(num1, num2, num3) {
  fill(num1, num2, num3);
  rect(0, 0, 200, 200);
}