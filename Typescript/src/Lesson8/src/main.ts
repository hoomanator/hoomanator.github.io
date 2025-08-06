//Index Signatures
//In TypeScript, an index signature defines the types 
// for properties within an object where the exact property names 
// are not known ahead of time. It allows for defining a consistent type 
// for all values associated with dynamically named keys.

interface TransactionObj {
    Pizza: number,
    Books: number,
    Job: number
}

const todaysTransactions: TransactionObj = {
    Pizza: -10,
    Books: -5,
    Job: 50
}

console.log(todaysTransactions.Pizza)
console.log(todaysTransactions['Pizza'])

let prop: string = 'Pizza'
//console.log(todaysTransactions[prop])  Typescript doesn't like this
//Because we have not created index signature

interface TransactionObj2 {
    readonly [index: string] : number
}

const todaysTransactions2: TransactionObj2 = {
    Pizza: -10,
    Books: -5,
    Job: 50
}

console.log(todaysTransactions2[prop]) 

const todaysNet = (transactions: TransactionObj2):
number => {
    let total =0
    for (const transaction in transactions) {
        total += transactions[transaction] 
    }
    return total
}

console.log(todaysNet(todaysTransactions2))

//todaysTransactions2.Pizza = 40  because we made it readonly

//2:47:00
//you also can control the minimum properties that goes to an object.
interface TransactionObj3 {
    readonly [index: string] : number
    Pizza: number,
    Books: number,
    Job: number
}

//if you remove Job, it will give you an error
//but you can add a new property
const todaysTransactions3: TransactionObj3 = {
    Pizza: -10,
    Books: -5,
    Job: 50,
    Salary: 400
}

console.log(todaysNet(todaysTransactions3))

//////////////////////////////////////
interface Student{
    [key:string]: string | number | number[] | undefined
    name: string,
    GPA: number,
    classes?: number[]
}

const student: Student = {
name: "Doug",
GPA: 3.5,
classes: [100,200]
};

//console.log(student.test)  //this is acceptable as a by product of index signature!

for(const key in student){
console.log(`${key}: ${student[key]}`)
}

//if we didn't have index signature, we have to use "assertion"
for(const key in student){
console.log(`${key}: ${student[key as keyof Student]}`)
}

//if you are not sure what Interface student comes from, you can also use typeof keyword
Object.keys(student).map(key => {
    console.log(student[key as keyof typeof student])
})

//function
const logStudentKey = (student: Student, key: keyof Student): void =>
{
    console.log(`Student ${key}: ${student[key]}`)
}

//call the function
logStudentKey(student, 'GPA')

////////////////////////////////

interface Incomes {
    [key:string]: number
}

type Streams = 'salary' | 'bonus' | 'sidehustle'

//with Incomes interface, you cannot have literal type!  [key:'salary']: number
//with Incomes2, we allow literal types as well.
type Incomes2 = Record<Streams, number>

const monthlyIncomes: Incomes2 = {
    salary:500,
    bonus:100,
    sidehustle: 250
}

for (const revenue in monthlyIncomes)
{
    console.log(monthlyIncomes[revenue as keyof Incomes2])
}

//3:01:54