/*
*  👋 Hello! This is an ml5.js example made and shared with ❤️.
*  Learn more about the ml5.js project: https://ml5js.org/
*  ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
*
*   This code demonstrates the HandPose model using ml5.js. You can track hand keypoints and create an interactive painting sketch using gestures.
*/

let video;
let handPose;
let hands = [];

function preload() {
  // Load the bodyPose model
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  console.log(hands);
}

// Callback function for when bodyPose outputs data
function gotHands(results) {
  // Save the output to the poses variable
  hands = results;
}

function setup() {
  createCanvas(640, 480);

  // Create the video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  // Start detecting poses in the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0);
  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {
        // Draw the skeleton connections
        for (let i = 0; i < hand.keypoints.length; i++) {
          let keypoint = hand.keypoints[i];
          if(hand.handedness == "Left")
          {
          fill(255, 0, 255);
          } else{
            fill(255,255,0);
          }
          noStroke();
          circle(keypoint.x, keypoint.y, 16);
        }
      }
    }
  }
}

