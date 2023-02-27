import * as brain from 'brain.js';
import * as candlestick from 'candlestick';



interface obj{
   readonly input:number[],
   readonly output:number[]
};



const data:obj[]=[
{input:[0,1,0,0],output:[1]},
{input:[0,1,0,1],output:[1]},
{input:[0,0,1,1],output:[1]},
{input:[0,1,1,1],output:[1]},
{input:[0,1,1,0],output:[1]},
{input:[1,1,0,0],output:[0]},
{input:[1,1,0,1],output:[0]},
{input:[1,0,1,1],output:[0]},
{input:[1,1,1,1],output:[0]},
{input:[1,1,1,0],output:[0]},
];

const net = new brain.NeuralNetwork();

net.train(data,{
    log:true
});

console.log(net.run([0,1,1,0]));
console.log(typeof(candlestick));