"use strict";
//The following function only works with string
const stringEcho = (arg) => arg;
console.log(stringEcho('Hooman'));
//How to make a generic function
const echo = (arg) => arg;
console.log(echo('Hooman'));
console.log(echo(1234));
const isObj = (arg) => {
    return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null);
};
console.log(isObj(true));
console.log(isObj('John'));
console.log(isObj([1, 2, 3]));
console.log(isObj({ name: 'John' }));
console.log(isObj(null));
const isTrue = (arg) => {
    if (Array.isArray(arg) && !arg.length) {
        return { arg, is: false };
    }
    if (isObj(arg) && !Object.keys(arg).length) {
        return { arg, is: false };
    }
    //!! flip it around twice to make it true and false
    return { arg, is: !!arg };
};
console.log(isTrue(true));
console.log(isTrue('John'));
console.log(isTrue([1, 2, 3]));
console.log(isTrue({ name: 'John' }));
console.log(isTrue(null));
console.log(isTrue(NaN));
console.log(isTrue(0));
console.log(isTrue({}));
console.log(isTrue(0));
console.log(isTrue([]));
console.log(isTrue(undefined));
// 3:12:28
