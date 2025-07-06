function setup() {
  noCanvas();


  const values = [];
  for (let i = 0; i < 15; i++) {
    values[i] = random(0, 100);
  }

  const shape = [5, 3];
  const data1 = tf.tensor(values, shape);
  data1.print();

  // data() function of a tensor returns a "promise"
  console.log(data1.data());

  // once the promise is resolved, then...
  data1.data().then(function (stuff) {
    console.log(stuff);
  }
  );

  //Or alternatively, you can use dataSync()
  console.log(data1.dataSync());

  // Once you create a tensor, it's immutable. If you need to modify a tensor, 
  // you need to use variable function() to make a copy of a tensor, and then assign function()
  const vdata = tf.variable(data1);
  vdata.assign(tf.tensor([[4, 5, 6], [4, 5, 6], [4, 5, 6], [4, 5, 6], [4, 5, 6]]));
  console.log(vdata);

  // Addition operation
  const a = tf.tensor1d([1, 2, 3, 4]);
  const b = tf.tensor1d([10, 20, 30, 40]);

  a.add(b).print();  // or tf.add(a, b)

  // Matrix multiplication
  const a1 = tf.tensor2d([1, 2], [1, 2]);
  const b1 = tf.tensor2d([1, 2, 3, 4], [2, 2]);

  a1.matMul(b1).print();  // or tf.matMul(a1, b1)

}