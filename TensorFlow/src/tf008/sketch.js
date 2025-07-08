const model = tf.sequential();

const configHidden = {
  units: 4,
  inputShape: [2],
  activation: 'sigmoid'
}
const hidden = tf.layers.dense(configHidden);

const configOutput = {
  units: 3,
  activation: 'sigmoid'
}
const output = tf.layers.dense(configOutput);

model.add(hidden);
model.add(output);

//we are using sgd optimizer with 0.1 learning rate
const sgdOptimizer = tf.train.sgd(0.1);
const config = {
  optimizer: sgdOptimizer,
  loss: "meanSquaredError"
}
model.compile(config);

const xs = tf.tensor2d([
  [0, 0],
  [0.5, 0.5],
  [1, 1],
]);

const ys = tf.tensor2d([
  [1 , 1, 1],
  [0.5, 0.5, 0.5],
  [0, 0, 0],
]);


//history is an object that says how the training is going
//model.fit(xs, ys, configFit).then((response) => {
//  console.log(response.history.loss[0]);
//});

train().then(() => {
  console.log('training is complete');
  //Now predict with new input
  const inputs = tf.tensor2d([
    [0.25, 0.95],
    [0.12, 0.22],
    [0.4, 0.74],
    [0.1, 0.22],
  ]);
  let outputs = model.predict(inputs);
  outputs.print();
}
);

async function train() {
  for (let i = 0; i < 100; i++) {
    const configFit = {
      shuffle: true,
      epochs: 100
    }
    const response = await model.fit(xs, ys, configFit);
    //You see the loss is going down over time
    console.log(response.history.loss[0]);
  }
}

