/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates training a color classifier through ml5.neuralNetwork.
 */

// Step 1: load data or create some data
let data = [
  { aces: 17, doublefaults: 3, firstserve: 76, color: "winner" },
  { aces: 18, doublefaults: 5, firstserve: 70, color: "winner" },
  { aces: 2, doublefaults: 3, firstserve: 63, color: "loser" },
  { aces: 4, doublefaults: 4, firstserve: 65, color: "loser" },
  { aces: 2, doublefaults: 1, firstserve: 58, color: "loser" },
  { aces: 2, doublefaults: 4, firstserve: 57, color: "winner" },
  { aces: 17, doublefaults: 3, firstserve: 76, color: "winner" },
  { aces: 18, doublefaults: 5, firstserve: 70, color: "winner" },
  { aces: 2, doublefaults: 3, firstserve: 63, color: "loser" },
  { aces: 4, doublefaults: 4, firstserve: 65, color: "loser" },
  { aces: 2, doublefaults: 1, firstserve: 58, color: "loser" },
  { aces: 2, doublefaults: 4, firstserve: 57, color: "winner" },
  { aces: 17, doublefaults: 3, firstserve: 76, color: "winner" },
  { aces: 18, doublefaults: 5, firstserve: 70, color: "winner" },
  { aces: 2, doublefaults: 3, firstserve: 63, color: "loser" },
  { aces: 4, doublefaults: 4, firstserve: 65, color: "loser" },
  { aces: 2, doublefaults: 1, firstserve: 58, color: "loser" },
  { aces: 2, doublefaults: 4, firstserve: 57, color: "winner" },
];

let classifer;
let aces = 0;
let doublefaults = 0;
let firstserve = 0;
let rSlider, gSlider, bSlider;
let label = "training";

function setup() {
  createCanvas(640, 800);

  // For this example to work across all browsers
  // "webgl" or "cpu" needs to be set as the backend
  ml5.setBackend("webgl");

  let h5Red = createElement('h5', 'Aces');
  // Set the element's style and position.
  h5Red.style('color', 'red');
  h5Red.position(10, 220);

  let h5Green = createElement('h5', 'Double faults');
  // Set the element's style and position.
  h5Green.style('color', 'Green');
  h5Green.position(10, 240);

  let h5Blue = createElement('h5', '1st serve');
  // Set the element's style and position.
  h5Blue.style('color', 'blue');
  h5Blue.position(10, 260);


  rSlider = createSlider(0, 10, 0).position(100, 240);
  gSlider = createSlider(0, 10, 0).position(100, 260);
  bSlider = createSlider(0, 100, 0).position(100, 280);




  // Step 2: set your neural network options
  let options = {
    task: "classification",
    debug: true,
  };

  // Step 3: initialize your neural network
  classifier = ml5.neuralNetwork(options);

  // Step 4: add data to the neural network
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let inputs = [item.aces, item.doublefaults, item.firstserve];
    let outputs = [item.color];
    classifier.addData(inputs, outputs);
  }

  // Step 5: normalize your data;
  classifier.normalizeData();

  // Step 6: train your neural network
  const trainingOptions = {
    epochs: 32,
    batchSize: 12,
  };
  classifier.train(trainingOptions, finishedTraining);
}
// Step 7: use the trained model
function finishedTraining() {
  classify();
}

// Step 8: make a classification
function classify() {
  const input = [aces, doublefaults, firstserve];
  classifier.classify(input, handleResults);
}

function draw() {
  aces = rSlider.value();
  doublefaults = gSlider.value();
  firstserve = bSlider.value();

  


  background( doublefaults * 10, aces * 10, firstserve * 2.55);
  textAlign(CENTER, CENTER);
  textSize(64);
  text(label, width / 2, height / 2);


  textSize(12);
  text(aces,240, 120);
  text(doublefaults,240, 140);
  text(firstserve,240, 160);

  //let h5Green = createElement('h5', 'Double faults');
  // Set the element's style and position.
  //h5Green.style('color', 'Green');
  //h5Green.position(10, 240);

  //let h5Blue = createElement('h5', '1st serve');
  // Set the element's style and position.
  //h5Blue.style('color', 'blue');
  //h5Blue.position(10, 260);


}

// Step 9: define a function to handle the results of your classification
function handleResults(results, error) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  // console.log(results); // {label: 'red', confidence: 0.8};
  classify();
}

