
type stringOrNumber = string | number;

//you cannot do this with interfaces!
type UserId = stringOrNumber

type stringOrNumberArray = (string | number)[]

//Type Aliases
type Guitarist = {
    name?: string,
    active: boolean,
    albums: stringOrNumberArray
}

//Literal types
let myName: 'Hooman'
let userName: 'Dave' | 'John' | 'Amy'
userName = 'Amy'

//functions
const add = (a: number, b: number) => {
    return a + b;
}

const logMsg = (message: any): void => {
    console.log(message)
}

logMsg('Hello')
logMsg(add(2, 3))

//you can also use "function" instead of =>
let subtract = function (c: number, d: number): number {
    return c - d
}

type mathFunction = (a: number, b: number) => number


let multiply: mathFunction = function (c, d) {
    return c * d
}

logMsg(multiply(2, 2))

//You can also do the same thing with interfaces

interface ImathFunction {
    (a: number, b: number): number
}

let divide: ImathFunction = function (c, d) {
    return c / d
}

logMsg(divide(4, 2))

//optional parameter should at the end!!!
const addAll = (a: number, b: number, c?: number):
    number => {
    if (typeof c !== 'undefined') {
        return a + b + c
    }
    return a + b;
}

//default
const sumAll = (a: number = 10, b: number, c: number = 2):
    number => {
    return a + b + c;
}

logMsg(addAll(2, 3, 4))
logMsg(addAll(2, 3))
logMsg(sumAll(2, 3, 4))
logMsg(sumAll(2, 3))
logMsg(sumAll(undefined, 3))  //10+3+2 = 15

//The rest operator in TypeScript, denoted by three dots (...), is a powerful feature used to gather multiple elements into a single array. It is primarily used in two contexts: Rest Parameters in Functions.
//When used in a function's parameter list, the rest operator allows a function to accept an indefinite number of arguments as an array. This array will contain all arguments passed to the function that are not explicitly defined as named parameters.
function sum(...numbers: number[]): number {
    let total = 0;
    for (let num of numbers) {
        total += num;
    }
    return total;
}

console.log(sum(1, 2, 3)); // Output: 6
console.log(sum(10, 20, 30, 40, 50)); // Output: 150

const total = (a: number, ...nums: number[]): number => {
    //reduce refers to the Array.prototype.reduce() method, which is a powerful higher-order 
    // function used to process an array and "reduce" it to a single value. 
    // This single value can be a number, a string, an object, or even another array. 
    return a + nums.reduce((prev, curr) => prev + curr)
}

logMsg(total(1, 2, 3, 4)) // Output: 10

//The never type in TypeScript represents the type of values that will never occur. 
// It signifies a state in the type system where a value is impossible or unreachable. 
const createError = (errMsg: string): never => {
    throw new Error(errMsg)
}

const infinite = () => {
    let i: number = 1
    while (true) {
        i++
        if (i > 100) break
    }
}

//use of the never type
const numberOrString2 = (value: number | string):
string => {
    if(typeof value === 'string') return 'string'
    if(typeof value === 'number') return 'number'
    if(isNumber(value)) return 'number' //same as above
    return createError('this should never happen')
}

//custom type guard
const isNumber = (value:any): boolean => {
    return typeof value === 'number' ? true : false
}