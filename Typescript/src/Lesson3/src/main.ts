//Arrays
let stringArr = ['one', 'two', 'tree']      //string type
let guitars = ['Strat', 'Les Paul', 5150]  //union type
let mixedData = ['EVH', 1984, true]

stringArr[0] = 'John'
stringArr.push('Jane')

//guitars is a union type
guitars[0] = 1984
guitars.unshift('Jim')
console.log(guitars)

let test = []
let bands: string[] = []
bands.push('Van Halen')

//Tuple
let myTuple: [string, number, boolean] = ['Hooman', 42, true]
let mixed = ['John', 1, false]

//Objects
let myObj: object
myObj = []
console.log(typeof myObj)

myObj = bands
myObj = {}

const exampleObj = {
    prop1: 'Dave',
    prop2: true
}

exampleObj.prop1 = 'John'
exampleObj.prop2 = false

type Guitarist = {
    name: string,
    active?: boolean,
    albums: (string | number)[]
}

let evh: Guitarist = { 
    name: 'Eddie',
    active: false,
    albums: [1984, 5150, 'OU812']
}

let jp: Guitarist = {
    name: 'Jimmy',
    albums: ['I', 'II', 'IV']
}

evh = jp

const greetGuitarist = (guitarist:Guitarist) => {
    return `Hello ${guitarist.name}!`;
}

console.log(greetGuitarist(jp))

const greetGuitaristoptional = (guitarist:Guitarist) => {
    return `Hello ${guitarist.active}!`;
}

console.log(greetGuitaristoptional(jp))

//You can also use interface instead of type
interface IGuitarist  {
    name: string,
    active?: boolean,
    albums: (string | number)[]
}

let evhi: Guitarist = { 
    name: 'Eddie',
    active: false,
    albums: [1984, 5150, 'OU812']
}

let jpi: Guitarist = {
    name: 'Jimmy',
    albums: ['I', 'II', 'IV']
}

evhi = jpi

const greetGuitaristi = (guitarist:IGuitarist) => {
    return `Hello ${guitarist.name}!`;
}

console.log(greetGuitaristi(jpi))

// Type: Defining Unions, Intersections, and Aliases
// With Type, we have the flexibility to create aliases for existing types, define unions or intersections of types, and even create complex data structures. It is particularly useful when dealing with scenarios that require combining multiple types or reusing them in various parts of the codebase.
// Let's take an example to illustrate the power of Type:

type Pet = {
    name: string;
    age: number;
};

type Dog = Pet & {
    breed: string;
};

type Cat = Pet & {
    color: string;
};

function printPetInfo(pet: Pet) {
    console.log(`Name: ${pet.name}, Age: ${pet.age}`);
}

function printDogInfo(dog: Dog) {
    console.log(`Name: ${dog.name}, Age: ${dog.age}, Breed: ${dog.breed}`);
}
//In the above example, we define a Pet type and then create two additional types, Dog and Cat, by combining it with additional properties specific to each. This makes our code more organized, maintainable, and less prone to errors.

//Interface: Extending Objects and Classes
//On the other hand, Interface in TypeScript is primarily used for extending object shapes and classes. It allows us to specify the structure that an object must adhere to, providing a clear contract for the code.

//Let's demonstrate the use of Interface with an example:

interface Shape {
    name: string;
    area(): number;
}

class Circle implements Shape {
    constructor(public radius: number) {}

    name = "Circle";

    area() {
        return Math.PI * this.radius * this.radius;
    }
}

//Enums
enum Grade {
    U,
    D,
    C,
    B,
    A
}

console.log(Grade.U)  //0

enum Grade2 {
    U = 1,
    D,
    C,
    B,
    A
}

console.log(Grade.U)  //1