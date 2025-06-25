/*
*  👋 Hello! This is an ml5.js example made and shared with ❤️.
*  Learn more about the ml5.js project: https://ml5js.org/
*  ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
*
*   This code demonstrates the HandPose model using ml5.js. You can track hand keypoints and create an interactive painting sketch using gestures.
*    We are going to create another canvas for the painting using createGraphics.
*/

let video;
let handPose;
let hands = [];
let painting;
let px = 0;
let py = 0;

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

  painting = createGraphics(640, 480);
  //painting.background(255);
  painting.clear();
  // Create the video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  // Start detecting poses in the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {

  //How to draw using mouse  
  //stroke(0);
  //if(mouseIsPressed)
  //{
  // strokeWeight(8);
  //line(mouseX, mouseY, pmouseX, pmouseY);
  //}


  // Draw the webcam video
  image(video, 0, 0);
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;





    //Keyboard Shortcuts:
    //Windows: You can use the Win + . shortcut to open the emoji picker.
    //macOS: Use Control + Command + Space to open the emoji picker.
    //let's calculate the average of the distance between these 2 fingers
    //Show the circle there

    let x = (index.x + thumb.x) * 0.5;
    let y = (index.y + thumb.y) * 0.5;

    let d = dist(index.x, index.y, thumb.x, thumb.y);
    //draw only when the distance between index and thumb fingers are less than 20 pixels
    if (d < 20) {
      painting.stroke(255, 255, 0);
      painting.strokeWeight(2);
      painting.line(px, py, x, y);

      textSize(12);
      textAlign(CENTER, CENTER);
      
      text('👌', index.x, index.y);
    }
    else {
      textSize(12);
      textAlign(CENTER, CENTER);
      //if (thumb.y < index.y) {
      //  text('👍', index.x, index.y);
      //}
      //else {
      //  text('👎', index.x, index.y);
      //}
    }
    px = x;
    py = y;
  }



  //Put the new canvas layer on top of the video
  image(painting, 0, 0);
}


