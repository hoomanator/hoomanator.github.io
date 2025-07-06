function setup() {
  noCanvas();


  const values = [];
  for (let i = 0; i < 15; i++) {
    values[i] = random(0, 100);
  }

  const shape = [5, 3];
  const data1 = tf.tensor(values, shape);
  data1.print();

  //data() function of a tensor returns a "promise"
  console.log(data1.data());

  //once the promise is resolved, then...
  data1.data().then(function (stuff) {
    console.log(stuff);
  }
  );
}