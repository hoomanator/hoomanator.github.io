/*
*  👋 Hello! This is an ml5.js example made and shared with ❤️.
*  Learn more about the ml5.js project: https://ml5js.org/
*  ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
*
*   This code demonstrates the FaceMesh model using ml5.js. I demonstrate how to track all 468 face landmark positions as well as texture map an image onto the triangular mesh with uv coordinates.
*/

let video;
let faceMesh;
let faces = [];

function preload() {
  // Load the bodyPose model
  faceMesh = ml5.faceMesh({ flipped: true });
}

function mousePressed() {
  console.log(faces);
}

// Callback function for when bodyPose outputs data
function gotFaces(results) {
  // Save the output to the poses variable
  faces = results;
}

function setup() {
  createCanvas(640, 480);

  // Create the video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  // Start detecting poses in the webcam video
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0);
  for (let face of faces) {
    // Draw the skeleton connections
    for (let i = 0; i < face.keypoints.length; i++) {
      let keypoint = face.keypoints[i];
      fill(255, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 4);
    }


    //You can also iterate only one component like lips/eyeborws/etc.  
    // Draw exterior lip contour
    beginShape();
    for (let i = 0; i < lipsExterior.length; i++) {
      let index = lipsExterior[i];
      let keypoint = face.keypoints[index];
      stroke(255, 255, 0);
      strokeWeight(2);
      noFill();
      vertex(keypoint.x, keypoint.y);
    }
    endShape(CLOSE);

    // Draw interior lip contour
    beginShape();
    for (let i = 0; i < lipsInterior.length; i++) {
      let index = lipsInterior[i];
      let keypoint = face.keypoints[index];
      stroke(255, 0, 255);
      strokeWeight(2);
      noFill();
      vertex(keypoint.x, keypoint.y);
    }
    endShape(CLOSE);

    // Calculate mouth opening distance
    let a = face.keypoints[13];
    let b = face.keypoints[14];
    let d = dist(a.x, a.y, b.x, b.y);

    // Draw a circle on the nose with size based on mouth opening
    let nose = face.keypoints[19];
    fill(0, 255, 0);
    circle(nose.x, nose.y, d);

    //You can also iterate only one component like lips/eyeborws/etc.  
    rightEye = face.rightEye;
    for (let i = 0; i < rightEye.keypoints.length; i++) {
      let keypoint = rightEye.keypoints[i];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 4);
    }

    //You can also iterate only one component like lips/eyeborws/etc.  
    leftEye = face.leftEye;
    for (let i = 0; i < leftEye.keypoints.length; i++) {
      let keypoint = leftEye.keypoints[i];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 4);
    }

  }
}



// Define the exterior lip landmark indices for drawing the outer lip contour
let lipsExterior = [
  267,
  269,
  270,
  409,
  291,
  375,
  321,
  405,
  314,
  17,
  84,
  181,
  91,
  146,
  61,
  185,
  40,
  39,
  37,
  0,
];

// Define the interior lip landmark indices for drawing the inner lip contour
let lipsInterior = [
  13,
  312,
  311,
  310,
  415,
  308,
  324,
  318,
  402,
  317,
  14,
  87,
  178,
  88,
  95,
  78,
  191,
  80,
  81,
  82,
];
