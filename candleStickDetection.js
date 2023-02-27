'use strict';
const brain = require('brain.js');
const net = new brain.NeuralNetwork({ hiddenLayers: [29] });
const trainingData = []; // This array will contain the training data for the neural network.
const dataJson = require('./data.json'); // This json file contain list of parameters of the Candlestick
// 'open,high,low,close'.




// Create an image of Candlestick using parameters 'open,high,low and close ', and create 
// fixed size box what will contain the image of the CandleStick. All image should have the 
// same size otherwise Neural Network will not be able to understand the difference between them
// using parameter 'boxSize'. Parameter 'size' is used to change the dimension of the image in order
// to make the particularities from the Candlestick more evident: 

function createCandlestick(open, high, low, close, size = 2, boxSize = 200) {
    const stick = Math.round((high - low) / size);
    const body = Math.round((open - close) / size);
    let start = 0;
    let end = 0;
    let image = '';
    const array = [];
    const createBox = boxSize;
    if (body > 0) {
        start = Math.round((high - open) / size);
        end = Math.round((high - close) / size);
    };

    if (body < 0) {
        end = Math.round((high - open) / size);
        start = Math.round((high - close) / size);
    };

    for (let i = 0; i < createBox; i++) {
        if (i <= start) {
            array.push(' . ');
        };
        if (i >= start & i <= end) {
            array.push('...');
        };
        if (i >= end & i <= stick) {
            array.push(' . ');
        };
        if (i >= stick) {
            array.push('   ');
        };
    };

    for (let eachLine of array) {
        image += `${eachLine}\n`;
    };

    return image
};

// Convert image in an array of values '0' for 'empty' and '1' for '.' to feed it to the Neural Network:
function convertToBinary(value) {
    return value === '.' ? 1 : 0
};

// Create from the image an array of values '.' and 'empty' and call function 'convertToBinary':
function destructImage(image) {
    return image.split('').map(convertToBinary);
};

// This Neural Network was trained to detect a patern called 'invertedHammer', by setting output '1' to the right pattern
// and output '0' for the patter that are not 'invertedHammer'.From the current json data line number 20 and 22 are 'invertedHammer' and 
// I used them as an example for the Neural Network.Because data is located in an array, those patterns
// order is located as 19 and 21 because array starts from position 0 not from 1.

for (let i = 0; i < dataJson.length; i++) {
    const img = destructImage(createCandlestick(dataJson[i].img[0], dataJson[i].img[1], dataJson[i].img[2], dataJson[i].img[3]));
    let value = 0;
    if (i === 19 || i == 21) { // When the for loop reach position 19 and 21 it sets the output as '1'.
        value = 1;
    };
    trainingData.push({
        input: img,
        output: { img: value }
    });
    value = 0;
};

net.train(trainingData, { log: true });

// Display the successful message if the output value is greater than 0.5:
function result(value) {
    return net.run(value).img > 0.5 ? 'I recognize it, this is a hammer pattern. ' : 'I do not recognize it.';
};

// This code was built by an Moldovan-Romanian citizen Diaconu Sandu in 2023

// Examples:


// Data to give to the 'result()' function:
const invertedHammer20 = destructImage((createCandlestick(dataJson[19].img[0], dataJson[19].img[1], dataJson[19].img[2], dataJson[19].img[3])));
const invertedHammer22 = destructImage((createCandlestick(dataJson[21].img[0], dataJson[21].img[1], dataJson[21].img[2], dataJson[21].img[3])));
const random = destructImage((createCandlestick(dataJson[18].img[0], dataJson[11].img[1], dataJson[11].img[2], dataJson[11].img[3])));

// How those data looks for human eye:
const imgInvertedHammer20 = createCandlestick(dataJson[19].img[0], dataJson[19].img[1], dataJson[19].img[2], dataJson[19].img[3], 20, 10);
const imgInvertedHammer22 = createCandlestick(dataJson[21].img[0], dataJson[21].img[1], dataJson[21].img[2], dataJson[21].img[3], 20, 10);
const imgRandom = createCandlestick(dataJson[18].img[0], dataJson[11].img[1], dataJson[11].img[2], dataJson[11].img[3], 20, 10);