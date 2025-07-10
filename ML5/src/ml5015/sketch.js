

// Model URL
let imageModelURL = './teachablemachine_model/';

// Video
let video;
// To store the classification
let classifier;

let label = "processing...";
let confidence;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 480);
  // Create the video
  video = createCapture(VIDEO, { flipped: true });
  video.size(320, 240);

  //classifier.classify(img, goResults, 5);
  //ClassifyStart to classify continously
  classifier.classifyStart(video, goResults, 5);
  video.hide();
}

function goResults(results) {
  console.log(results);
  label = "Label: " + results[0].label;
  confidence = "Confidence: " + nf(results[0].confidence, 0, 2) * 100 + "%";
}

function draw() {
  // Draw the webcam video
  background(220);
  //image(img,0,0, width, height);
  image(video,0,0, width, height);
  rectMode(CENTER);
  fill(0, 0, 0, 127);
  rect(200,380, 400, 50);
  textSize(16);
  fill(255, 255, 255);
  textAlign(CENTER,CENTER);
  noStroke();
  text(label, 200, 375)
  text(confidence, 200, 390)
}



