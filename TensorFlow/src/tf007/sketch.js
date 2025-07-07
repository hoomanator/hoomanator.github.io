let x_vals = [];
let y_vals = [];

// y = ax^2 + bx + c or y=ax^3+bx^2+cx+d
let a, b, c, d;
//smaller learning rate moves the curve slowly
const learningRate = 0.1;
const optimizer = tf.train.adam(learningRate);

function setup() {
  createCanvas(400, 400);
  a = tf.variable(tf.scalar(random(-1,1)));
  b = tf.variable(tf.scalar(random(-1,1)));
  c = tf.variable(tf.scalar(random(-1,1)));
  d = tf.variable(tf.scalar(random(-1,1)));
}

function predict(x) {
  const xs = tf.tensor1d(x);
  // y = ax^2 + bx + c or y=ax^3+bx^2+cx+d
  //const ys = xs.square().mul(a).add(xs.mul(b)).add(c);
  const ys = xs.pow(tf.scalar(3)).mul(a)
  .add(xs.square().mul(b))
  .add(xs.mul(c))
  .add(d);
  return ys;
}

//prediction is the guess and labels are the actual y(by pressing the mouse button)
function loss(pred, labels) {
  return pred.sub(labels).square().mean();
}

function mousePressed() {
  let x = map(mouseX, 0, width, -1, 1);
  let y = map(mouseY, 0, height, 1, -1)
  x_vals.push(x);
  y_vals.push(y);
}

function draw() {

  tf.tidy(() => {
    if (x_vals.length > 0) {
      const ys = tf.tensor1d(y_vals);
      optimizer.minimize(() => loss(predict(x_vals), ys));
    }
  }
  );

  background(0);
  stroke(255);
  strokeWeight(8);
  for (let i = 0; i < x_vals.length; i++) {
    let px = map(x_vals[i], -1, 1, 0, width);
    let py = map(y_vals[i], -1, 1, height, 0);
    point(px, py);
  }

  const curveX = [];
  for (let x = -1; x <= 1; x += 0.05) {
    curveX.push(x);
  }


  const ys = tf.tidy(() => predict(curveX));
  let curveY = ys.dataSync();
  ys.dispose();

  beginShape();
  noFill();
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < curveX.length; i++) {
    let x = map(curveX[i], -1, 1, 0, width);
    let y = map(curveY[i], -1, 1, height, 0);
    vertex(x,y);
  }
  endShape();

  console.log(tf.memory().numTensors);
  //noLoop();
}
