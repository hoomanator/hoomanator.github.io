
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
const sumAll = (a: number= 10, b: number, c: number = 2):
    number => {
    return a + b + c;
}

logMsg(addAll(2,3,4))
logMsg(addAll(2,3))
logMsg(sumAll(2,3,4))
logMsg(sumAll(2,3))
logMsg(sumAll(undefined,3))  //10+3+2 = 15