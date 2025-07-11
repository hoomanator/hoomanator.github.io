MobileNet is a pre-trained model has a 1000 image classification out 15 millin images from ImageNet database.

When send a image to MobileNet, MobileNet sends us a label and probability (Cat, 90%).

So, how can we retrain the MobileNet model. There is done using "Feature Extractor".

MobileNet runs NeuralNetwork. NeuralNetwork has layers. For example, image data goes to convolution layer and the convolution process of the layer (samething happens in Photoshop) reduces the pixel through layers many many times to eventually get to "features". The features get converted to "Labels" and "Probabilites".

Now with feature extract, we do transfer learning which means, we are overriding those labels and probabilities with our own images. Basically we map the features to our own labels.