"use strict";
//Arrays
let stringArr = ['one', 'two', 'tree']; //string type
let guitars = ['Strat', 'Les Paul', 5150]; //union type
let mixedData = ['EVH', 1984, true];
stringArr[0] = 'John';
stringArr.push('Jane');
//guitars is a union type
guitars[0] = 1984;
guitars.unshift('Jim');
console.log(guitars);
let test = [];
let bands = [];
bands.push('Van Halen');
//Tuple
let myTuple = ['Hooman', 42, true];
let mixed = ['John', 1, false];
//Objects
let myObj;
myObj = [];
console.log(typeof myObj);
myObj = bands;
myObj = {};
const exampleObj = {
    prop1: 'Dave',
    prop2: true
};
exampleObj.prop1 = 'John';
exampleObj.prop2 = false;
let evh = {
    name: 'Eddie',
    active: false,
    albums: [1984, 5150, 'OU812']
};
let jp = {
    name: 'Jimmy',
    albums: ['I', 'II', 'IV']
};
evh = jp;
const greetGuitarist = (guitarist) => {
    return `Hello ${guitarist.name}!`;
};
console.log(greetGuitarist(jp));
const greetGuitaristoptional = (guitarist) => {
    return `Hello ${guitarist.active}!`;
};
console.log(greetGuitaristoptional(jp));
let evhi = {
    name: 'Eddie',
    active: false,
    albums: [1984, 5150, 'OU812']
};
let jpi = {
    name: 'Jimmy',
    albums: ['I', 'II', 'IV']
};
evhi = jpi;
const greetGuitaristi = (guitarist) => {
    return `Hello ${guitarist.name}!`;
};
console.log(greetGuitaristi(jpi));
function printPetInfo(pet) {
    console.log(`Name: ${pet.name}, Age: ${pet.age}`);
}
function printDogInfo(dog) {
    console.log(`Name: ${dog.name}, Age: ${dog.age}, Breed: ${dog.breed}`);
}
class Circle {
    constructor(radius) {
        this.radius = radius;
        this.name = "Circle";
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
}
//Enums
var Grade;
(function (Grade) {
    Grade[Grade["U"] = 0] = "U";
    Grade[Grade["D"] = 1] = "D";
    Grade[Grade["C"] = 2] = "C";
    Grade[Grade["B"] = 3] = "B";
    Grade[Grade["A"] = 4] = "A";
})(Grade || (Grade = {}));
console.log(Grade.U); //0
var Grade2;
(function (Grade2) {
    Grade2[Grade2["U"] = 1] = "U";
    Grade2[Grade2["D"] = 2] = "D";
    Grade2[Grade2["C"] = 3] = "C";
    Grade2[Grade2["B"] = 4] = "B";
    Grade2[Grade2["A"] = 5] = "A";
})(Grade2 || (Grade2 = {}));
console.log(Grade.U); //1
