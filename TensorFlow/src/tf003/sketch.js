function setup() {
  noCanvas();

  //Example: Scalar tensor representing 0-dimensional array
  const data = tf.tensor(4);
  //const data = tf.scalar(4);  -- same
  data.print()

  //Example 1: Vector tensor1d representing a 1-dimensional array
  const data1 = tf.tensor([1, 2, 3, 4]);
  data1.print(); //    [1, 2, 3, 4]
  console.log(data1);
  console.log(data1.toString()); //same as data.print()

  //Example 2: A 2x2 tensor2d representing a 2-dimensional array
  const data2 = tf.tensor([255, 0, 0, 255], [2, 2]);
  data2.print(); // [[255, 0  ],[0  , 255]]

  //Example 3: A 2x2x2 tensor3d representing a 3-dimensional array
  const data3 = tf.tensor([255, 0, 32, 255, 127, 0, 127, 127], [2, 2, 2]);
  data3.print(); //  [[[255, 0  ],[32 , 255]], [[127, 0  ],[127, 127]]]


  //Example 4: A 2x2x2X2 tensor4d representing a 4-dimensional integer array
  const data4 = tf.tensor([255.1, 0, 32.3, 255, 127, 0, 127, 12, 255, 0, 32, 255, 127, 0, 127, 1277], [2, 2, 2, 2], 'int32');
  data4.print(); // [[[[255, 0],[32,255]],[[127, 0],[127, 12]]],[[[255, 0 ],[32 , 255 ]],[[127, 0 ],[127, 1277]]]]

  //Example 5: A 5x3 tensor2d representing a 2-dimensional array
  const values5 = [];
  for (let i = 0; i < 15; i++) {
    values5[i] = random(0, 100);
  }

  const shape = [5, 3];
  const data5 = tf.tensor(values5, shape);
  data5.print();
  //[[15.3574314, 77.6350708, 28.1846237],
  //    [67.9104309, 53.8909607, 91.4151306],
  //    [96.7664871, 74.5445099, 35.9917641],
  //    [2.9171336 , 89.9953918, 85.0509186],
  //    [25.8264122, 64.3119736, 3.939127  ]]

}