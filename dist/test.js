"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const brain = __importStar(require("brain.js"));
const candlestick = __importStar(require("candlestick"));
;
const data = [
    { input: [0, 1, 0, 0], output: [1] },
    { input: [0, 1, 0, 1], output: [1] },
    { input: [0, 0, 1, 1], output: [1] },
    { input: [0, 1, 1, 1], output: [1] },
    { input: [0, 1, 1, 0], output: [1] },
    { input: [1, 1, 0, 0], output: [0] },
    { input: [1, 1, 0, 1], output: [0] },
    { input: [1, 0, 1, 1], output: [0] },
    { input: [1, 1, 1, 1], output: [0] },
    { input: [1, 1, 1, 0], output: [0] },
];
const net = new brain.NeuralNetwork();
net.train(data, {
    log: true
});
console.log(net.run([0, 1, 1, 0]));
console.log(typeof (candlestick));
//# sourceMappingURL=test.js.map