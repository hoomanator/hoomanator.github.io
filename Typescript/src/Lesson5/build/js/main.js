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
//The rest operator in TypeScript, denoted by three dots (...), is a powerful feature used to gather multiple elements into a single array. It is primarily used in two contexts: Rest Parameters in Functions.
//When used in a function's parameter list, the rest operator allows a function to accept an indefinite number of arguments as an array. This array will contain all arguments passed to the function that are not explicitly defined as named parameters.
function sum(...numbers) {
    let total = 0;
    for (let num of numbers) {
        total += num;
    }
    return total;
}
console.log(sum(1, 2, 3)); // Output: 6
console.log(sum(10, 20, 30, 40, 50)); // Output: 150
const total = (a, ...nums) => {
    //reduce refers to the Array.prototype.reduce() method, which is a powerful higher-order 
    // function used to process an array and "reduce" it to a single value. 
    // This single value can be a number, a string, an object, or even another array. 
    return a + nums.reduce((prev, curr) => prev + curr);
};
logMsg(total(1, 2, 3, 4)); // Output: 10
//The never type in TypeScript represents the type of values that will never occur. 
// It signifies a state in the type system where a value is impossible or unreachable. 
const createError = (errMsg) => {
    throw new Error(errMsg);
};
const infinite = () => {
    let i = 1;
    while (true) {
        i++;
        if (i > 100)
            break;
    }
};
//use of the never type
const numberOrString2 = (value) => {
    if (typeof value === 'string')
        return 'string';
    if (typeof value === 'number')
        return 'number';
    if (isNumber(value))
        return 'number'; //same as above
    return createError('this should never happen');
};
//custom type guard
const isNumber = (value) => {
    return typeof value === 'number' ? true : false;
};
