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
let triangles = [];

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
  triangles = faceMesh.getTriangles();
  console.log(triangles);
}

function draw() {
    background(0);
  // Draw the webcam video
  //image(video, 0, 0);
  for (let face of faces) {
    // Draw the skeleton connections
    // for (let i = 0; i < face.keypoints.length; i++) {
    //   let keypoint = face.keypoints[i];
    //   fill(255, 255, 0);
    //   noStroke();
    //   circle(keypoint.x, keypoint.y, 4);
    // }

  
    beginShape(TRIANGLES)
    for (let i = 0; i < triangles.length; i++) {
      let tri = triangles[i];
      let [a, b, c] = tri;
      let pointA = face.keypoints[a];
      let pointB = face.keypoints[b];
      let pointC = face.keypoints[c];
      stroke(255, 255, 0);
      //noFill();
      fill(random(255),0,random(255));
      vertex(pointA.x, pointA.y);
      vertex(pointB.x, pointB.y);
      vertex(pointC.x, pointC.y);
    }
    endShape();
  }
}

