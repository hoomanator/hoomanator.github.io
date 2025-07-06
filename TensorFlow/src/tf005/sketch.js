function setup() {
  noCanvas();
  //every one second, call the draw function
  frameRate(1);
}

function draw() {
  const values = [];
  for (let i = 0; i < 15; i++) {
    values[i] = random(0, 100);
  }

  const shape = [5, 3];
  const data1 = tf.tensor(values, shape);
  //data1.print();
  
  //How many tensors are held in the memory
  console.log(tf.memory().numTensors);

  data1.dispose();

  //or you can use tf.tidy

  tf.tidy(myStuff);

  function myStuff()
  {
    const data1 = tf.tensor(values, shape);
    //console.log('hello');
  }

  //or use lambda fat arrow
  tf.tidy(() => {
    const data1 = tf.tensor(values, shape);
  }
  );

}