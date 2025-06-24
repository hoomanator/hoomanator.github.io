/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates drawing image classifier using MobileNet model.
 */

let classifier;
let img;
let label = "processing...";
let confidence;

function preload() {
  classifier = ml5.imageClassifier("MobileNet");
  img = loadImage("images/bird.jpg")
}

function setup() {
  createCanvas(400, 400);
  classifier.classify(img, goResults, 5);
}

function goResults(results)
{
  console.log(results); 
    label = "Label: " + results[0].label; 
    confidence = "Confidence: " + nf(results[0].confidence, 0, 2) * 100 + "%";
}

function draw() {
  // Draw the webcam video
  background(220);
  image(img,0,0, width, height);
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

