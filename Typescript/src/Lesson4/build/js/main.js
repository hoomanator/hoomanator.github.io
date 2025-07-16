"use strict";
//Literal types
let myName;
let userName;
userName = 'Amy';
//functions
const add = (a, b) => {
    return a + b;
};
const logMsg = (message) => {
    console.log(message);
};
logMsg('Hello');
logMsg(add(2, 3));
//you can also use "function" instead of =>
let subtract = function (c, d) {
    return c - d;
};
let multiply = function (c, d) {
    return c * d;
};
logMsg(multiply(2, 2));
let divide = function (c, d) {
    return c / d;
};
logMsg(divide(4, 2));
//optional parameter should at the end!!!
const addAll = (a, b, c) => {
    if (typeof c !== 'undefined') {
        return a + b + c;
    }
    return a + b;
};
//default
const sumAll = (a = 10, b, c = 2) => {
    return a + b + c;
};
logMsg(addAll(2, 3, 4));
logMsg(addAll(2, 3));
logMsg(sumAll(2, 3, 4));
logMsg(sumAll(2, 3));
logMsg(sumAll(undefined, 3)); //10+3+2 = 15
